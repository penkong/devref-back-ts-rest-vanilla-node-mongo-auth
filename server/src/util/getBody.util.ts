import { IncomingMessage } from 'http'

export const getBody = (req: IncomingMessage) =>
  new Promise((resolve, reject) => {
    try {
      let body = ''

      req.on('data', chunk => {
        body += chunk
      })

      req.on('end', () => {
        resolve(JSON.parse(body.toString()))
      })
    } catch (err) {
      reject(err)
    }
  })
