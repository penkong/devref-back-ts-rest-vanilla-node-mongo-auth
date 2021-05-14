print('Start #################################################################')
// Successfully added user: {
//       "user" : "root",
//       "roles" : [
//               {
//                       "role" : "root",
//                       "db" : "admin"
//               }
//       ]
// }

db.createUser({
  user: 'root',
  pwd: 'secret',
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }]
})

db.createCollection('test', { capped: false })

db.test.insert([
  { item: 1 },
  { item: 2 },
  { item: 3 },
  { item: 4 },
  { item: 5 }
])

print('END #################################################################')
