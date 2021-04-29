import { IncomingMessage, ServerResponse } from 'http'

export const alreadyIn = (req: IncomingMessage, res: ServerResponse) => {
  //

  const cookie = req.headers.cookie?.split('=')

  if (cookie && cookie.includes('vanillajwt')) {
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify([{ message: 'Already Signed In!' }]))
    res.end()
    return
  }
}
