import { MongoClient } from 'mongodb'

import { config } from './config'

const { PORT, DBURL, DBNAME, MONGOUSER, MONGOPASS } = config

console.log(config)
console.log('hello')
console.log(PORT)

// // Connection URL

if (!DBURL) throw new Error('dburl is wrong')
if (!MONGOUSER) throw new Error('cred is wrong')
if (!MONGOPASS) throw new Error('cred is wrong')

const url = DBURL!
  .replace('<MONGOUSER>', MONGOUSER!)
  .replace('<MONGOPASS>', MONGOPASS!)

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Database Name

async function main() {
  // Use connect method to connect to the server
  try {
    await client.connect()
    console.log('Connected successfully to server')
  } catch (error) {
    console.log(error)
  }
}

main()
  .then(() => console.log('434'))
  .catch(console.error)
  .finally(() => client.close())
