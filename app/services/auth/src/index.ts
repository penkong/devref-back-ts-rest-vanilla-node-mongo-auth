import { MongoClient } from 'mongodb'

import { app } from './app'
import { config } from './config'
import { UserRepository } from './data'
import { createUserSchema } from './data/schema/User.schema'
import { RedisService } from './service/Redis.service'

const { DBURL, MONGOUSER, MONGOPASS, DBNAME, PORT } = config

const url = DBURL!
  .replace('<MONGOUSER>', MONGOUSER!)
  .replace('<MONGOPASS>', MONGOPASS!)

let client: MongoClient

async function main() {
  try {
    if (!PORT || !DBNAME) throw new Error('Config Does Not Exist!')

    RedisService.on('ready', () => {
      console.log('RedisService connected and ready to use ...')
    })

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

      app.listen(parseInt(PORT), () =>
        console.log(`Server running on port ${PORT}`)
      )
    }
  } catch (error) {
    console.log(error.stack)
    await client.close()
    await RedisService.quit()
    process.exit(1)
  }
}

main()

// --- handle things on bad things .

process.on('warning', e => console.warn(e.stack))
process.on('SIGINT', () => {
  shutdown()
})
process.on('SIGTERM', () => {
  shutdown()
})

// shut down server
function shutdown() {
  client.close()
  RedisService.quit()
  process.exitCode = 1
  process.exit()
}
