import { app } from './app'
import { MongoClient } from 'mongodb'

import { config } from './config'

const { DBURL, MONGOUSER, MONGOPASS } = config

async function main() {
  try {
    const url = DBURL!
      .replace('<MONGOUSER>', MONGOUSER!)
      .replace('<MONGOPASS>', MONGOPASS!)

    const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await client.connect()

    console.log('connected to db!')

    if (config.PORT)
      app.listen(parseInt(config.PORT), () =>
        console.log(`Server running on port ${config.PORT}`)
      )
  } catch (error) {
    console.log(error)
  }
}

main()
process.on('warning', e => console.warn(e.stack))
