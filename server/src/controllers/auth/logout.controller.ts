import { IncomingMessage, ServerResponse } from 'http'

export async function logout(
  _url: URL,
  req: IncomingMessage,
  res: ServerResponse
) {
  const cookie = req.headers.cookie?.split('=')

  if (cookie && cookie[0] == 'vanillajwt' && cookie[1].length > 0)
    res.setHeader(
      'Set-cookie',
      'vanillajwt=delete;path=/;expires=Thu,01 Jan 1970 00:00:00 GMT'
    )

  res.writeHead(201, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify([]))
  res.end()
  return
}
