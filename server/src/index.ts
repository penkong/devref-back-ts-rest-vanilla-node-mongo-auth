import { MongoClient } from 'mongodb'

import { config } from './config'

const { PORT, DBURL, DBNAME, MONGOUSER, MONGOPASS } = config

// // Connection URL

const url = DBURL!
  .replace('<MONGOUSER>', MONGOUSER!)
  .replace('<MONGOPASS>', MONGOPASS!)

console.log(url)
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
    console.log(3)
  } catch (error) {
    console.log(error)
  }
}

main()
  .then(() => console.log('434'))
  .catch(console.error)
  .finally(() => client.close())
