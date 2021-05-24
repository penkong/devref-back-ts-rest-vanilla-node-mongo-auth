import { IncomingMessage } from 'http'

import { config } from '../config'
import { validMethods, validRoutes } from '../util'

// ---

export class UrlRefiner {
  //

  static maker(
    url: string,
    baseUrl: string = `http://localhost:${config.PORT}`
  ): URL {
    return new URL(url, baseUrl)
  }

  static checker(url: URL, req: IncomingMessage): boolean {
    let isOk = true

    if (!validMethods.includes(req.method!)) isOk = false
    if (url.pathname === '/favicon.ico') isOk = false

    const r = req.method + url.pathname
    console.log(r)

    if (!validRoutes.includes(r)) isOk = false
    if (r.includes(validRoutes[5])) isOk = true

    return isOk
  }
}
