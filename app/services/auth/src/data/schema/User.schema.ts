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

          required: ['name', 'email', 'password'],
          properties: {
            _id: {
              bsonType: 'objectId'
            },
            name: {
              bsonType: 'string'
            },
            email: {
              bsonType: 'string',
              // pattern: '',
              description: 'must be a email and is required'
            },
            password: {
              bsonType: 'string',
              description: 'must be a string and is required'
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
