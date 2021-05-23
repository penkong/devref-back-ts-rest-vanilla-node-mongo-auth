print('Start #################################################################')
// https://holycoders.com/mongodb-schema-validation/
// Successfully added user: {
//       "user" : "root",
//       "roles" : [
//               {
//                       "role" : "root",
//                       "db" : "admin"
//               }
//       ]
// }
// db = db.getSiblingDB('api_prod_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_prod_db' }],
//   },
// );
// db.createCollection('users');

// db = db.getSiblingDB('api_dev_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_dev_db' }],
//   },
// );
// db.createCollection('users');

// db = db.getSiblingDB('api_test_db');
// db.createUser(
//   {
//     user: 'api_user',
//     pwd: 'api1234',
//     roles: [{ role: 'readWrite', db: 'api_test_db' }],
//   },
// );
// db.createCollection('users');

db.createUser({
  user: 'root',
  pwd: 'secret',
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }]
})

db.createCollection('test', { capped: false })
db.test.insert([{ item: 1 }])

// https://docs.mongodb.com/manual/reference/bson-types/
// db.createCollection('users', {
//   storageEngine: {
//     wiredTiger: {}
//   },
//   capped: false,
//   validationLevel: 'strict',
//   validationAction: 'error',
//   validator: {
//     $jsonSchema: {
//       title: 'users',
//       bsonType: 'object',
//       additionalProperties: false,
//       required: ['name', 'email', 'password'],
//       properties: {
//         _id: {
//           bsonType: 'objectId'
//         },
//         name: {
//           bsonType: 'string'
//         },
//         email: {
//           bsonType: 'string',
//           // pattern: '',
//           description: 'must be a email and is required'
//         },
//         password: {
//           bsonType: 'string',
//           description: 'must be a string and is required'
//         }
//       }
//     }
//   }
// })
// // make each column uique .
// db.users.createIndex({ email: 1 }, { unique: true })

print('END #################################################################')
