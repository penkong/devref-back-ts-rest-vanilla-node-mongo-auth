import http, { IncomingMessage, ServerResponse } from 'http'

import { Router } from './routes'
import { UrlRefiner } from './service/'
import { CookieSessionRequest } from './@types'

// ---
declare global {
  namespace http {
    interface IncomingMessage {
      session?: CookieSessionRequest | {}
      currentUser?: { [key: string]: any }
    }
  }
}

export const app = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    //

    if (req.url == undefined) return res.end()

    const url = UrlRefiner.maker(req.url)

    const isOk = UrlRefiner.checker(url, req)

    if (!isOk) return res.end()

    Router.dispatch(url, req, res)
  }
)
