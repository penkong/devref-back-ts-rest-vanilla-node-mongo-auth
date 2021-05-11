import { IncomingMessage, ServerResponse } from 'http'

import { validRoutes } from '../util'
import { alreadyIn } from '../middleware'
import { register, login, currentUser, logout } from '../controller'

export class Router {
  static async dispatch(url: URL, req: IncomingMessage, res: ServerResponse) {
    const r = req.method + url.pathname

    if (r == validRoutes[0]) {
      alreadyIn(req, res)
      return await register(url, req, res)
    }
    if (r == validRoutes[1]) {
      alreadyIn(req, res)
      return await login(url, req, res)
    }

    if (r == validRoutes[2]) return await currentUser(url, req, res)

    if (r == validRoutes[3]) return await logout(url, req, res)
  }
}
