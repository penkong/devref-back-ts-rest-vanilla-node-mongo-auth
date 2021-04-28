import { IncomingMessage, ServerResponse } from 'http'

import { getUser } from '../../middleware'
import { ICurrentUser } from '../../@types'

// ---

export async function currentUser(
  _url: URL,
  req: IncomingMessage,
  res: ServerResponse
) {
  if (!req.headers.cookie) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify([{ message: 'not here!' }]))
    res.end()
    return
  }

  const cookie = req.headers.cookie.split('=')

  if (cookie.includes('vanillajwt')) {
    const info: ICurrentUser = getUser(cookie[1])
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify([{ currentUser: info }]))
    res.end()
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify([{ currentUser: {} }]))
  res.end()
  return
}
// MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 exit listeners added to [Bus]. Use emitter.setMaxListeners() to increase limit
