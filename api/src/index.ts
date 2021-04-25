import { MongoClient } from 'mongodb'

import { config } from './config'

const { PORT, DBURL, DBNAME, MONGOUSER, MONGOPASS } = config

console.log(config)
console.log('hello')
console.log(PORT)

// Connection URL
const url = DBURL.replace('<MONGOUSER>', MONGOUSER).replace(
  '<MONGOPASS>',
  MONGOPASS
)

const client = new MongoClient(url, { useNewUrlParser: true })

// Database Name

async function main() {
  // Use connect method to connect to the server
  try {
    await client.connect()
    console.log('Connected successfully to server')
    client.db(DBNAME)
    console.log(client)
  } catch (error) {
    console.log(error)
  }
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())
