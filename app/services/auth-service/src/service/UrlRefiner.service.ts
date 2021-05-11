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
    if (!validMethods.includes(req.method!)) return false

    if (url.pathname === '/favicon.ico') return false

    const r = req.method + url.pathname

    if (!validRoutes.includes(r)) return false

    return true
  }
}
