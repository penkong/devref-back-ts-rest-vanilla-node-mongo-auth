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
    client = new MongoClient('mongodb://root:secret@localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const con = await client.connect()

    if (con.isConnected()) {
      console.log('connected to db!')

      const db = con.db(DBNAME)
      await UserRepository.injectDB(db)

      // if (config.PORT)
      // app.listen(parseInt(config.PORT), () =>
      app.listen(5002, () =>
        console.log(`Server running on port ${config.PORT || 5002}`)
      )
    }
  } catch (error) {
    console.log(error)
    await client.close()
  }
}

main()
process.on('warning', e => console.warn(e.stack))
process.on('SIGINT', () => client.close())
process.on('SIGTERM', () => client.close())
