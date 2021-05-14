import { Db } from 'mongodb'

export const createUserSchema = async (db: Db) => {
  try {
    const exist = (await db.listCollections().toArray()).findIndex(
      el => el.name === 'users'
    )
    if (exist === 1) return

    await db.createCollection('users', {
      capped: false,
      storageEngine: {
        wiredTiger: {}
      },
      validationLevel: 'strict',
      validationAction: 'error',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'users',
          additionalProperties: false,
          required: ['name', 'email', 'password', 'role', 'photo', 'active'],
          properties: {
            _id: {
              bsonType: 'objectId'
            },
            created_at: {
              bsonType: 'timestamp'
            },
            updated_at: {
              bsonType: 'timestamp'
            },
            name: {
              bsonType: 'string',
              minLength: 3,
              maxLength: 30,
              description: 'must be between 3 and 30 and is required'
            },
            email: {
              bsonType: 'string',
              // pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              format: 'email',
              description: 'must be a email and is required'
            },
            password: {
              bsonType: 'string',
              maxLength: 24,
              minLength: 6,
              description: 'must be a string and is required'
            },
            photo: {
              bsonType: 'array',
              minItems: 1,
              maxItems: 5,
              uniqueItems: true,
              items: {
                bsonType: 'string'
              },
              pattern: /.+\.(gif|png|jpe?g)$/i,
              description: 'must be an array of strings and is required'
            },
            role: {
              bsonType: 'string',
              enum: [
                'trial-user',
                'temp-user',
                'bronze-user',
                'silver-usr',
                'gold-user',
                'admin',
                'supr-admin'
              ]
            },
            passwordChangedAt: {
              bsonType: 'date'
            },
            active: {
              bsonType: 'bool'
            },
            country: {
              bsonType: 'string'
            },
            address: {
              bsonType: 'object',
              additionalProperties: false,
              properties: {
                street: {
                  bsonType: 'string',
                  description: 'must be a string if the field exists'
                },
                city: {
                  bsonType: 'string',
                  description: 'must be a string and is required'
                }
              }
            }
          }
        }
      }
    })
    console.log('users Schema Created')

    await db.collection('users').createIndex({ email: 1 }, { unique: true })

    console.log('Name index created for unique constraint')
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
