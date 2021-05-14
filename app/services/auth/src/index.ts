import { MongoClient } from 'mongodb'

import { app } from './app'
import { config } from './config'
import { UserRepository } from './data'
import { createUserSchema } from './data/schema/User.schema'

const { DBURL, MONGOUSER, MONGOPASS, DBNAME } = config

const url = DBURL!
  .replace('<MONGOUSER>', MONGOUSER!)
  .replace('<MONGOPASS>', MONGOPASS!)

let client: MongoClient

async function main() {
  try {
    // ;`mongodb://root:secret@localhost:27017/${DBNAME}`
    client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const con = await client.connect()

    if (con.isConnected()) {
      console.log('connected to db!')

      const db = con.db(DBNAME)

      await createUserSchema(db)
      await UserRepository.injectDB(db)

      if (config.PORT)
        app.listen(parseInt(config.PORT), () =>
          // app.listen(5002, () =>
          console.log(`Server running on port ${config.PORT}`)
        )
    }
  } catch (error) {
    console.log(error.stack)
    await client.close()
    process.exit(1)
  }
}

main()
process.on('warning', e => console.warn(e.stack))
process.on('SIGINT', () => client.close())
process.on('SIGTERM', () => client.close())
