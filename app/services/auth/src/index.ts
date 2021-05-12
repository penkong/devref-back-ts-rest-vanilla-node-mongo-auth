import { app } from './app'
import { MongoClient } from 'mongodb'

import { config } from './config'
import { UserRepository } from './data'

const { DBURL, MONGOUSER, MONGOPASS, DBNAME } = config

const url = DBURL!
  .replace('<MONGOUSER>', MONGOUSER!)
  .replace('<MONGOPASS>', MONGOPASS!)

let client: MongoClient

async function main() {
  try {
    client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const con = await client.connect()
    const db = con.db(DBNAME)

    await UserRepository.injectDB(db)

    console.log('connected to db!')

    if (config.PORT)
      app.listen(parseInt(config.PORT), () =>
        console.log(`Server running on port ${config.PORT}`)
      )
  } catch (error) {
    console.log(error)
    await client.close()
  }
}

main()
process.on('warning', e => console.warn(e.stack))
process.on('SIGINT', () => client.close())
process.on('SIGTERM', () => client.close())
