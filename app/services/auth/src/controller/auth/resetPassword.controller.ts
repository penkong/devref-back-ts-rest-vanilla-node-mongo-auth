import { IncomingMessage, ServerResponse } from 'http'

import { getBody } from '../../util'
import { BadReqErr } from '../../error'
import { UserRepository } from '../../data/'
import { IRegisterInfo } from '../../@types/'
import { RedisService, PasswordService } from '../../service'

// ---

export const resetPassword = async (
  url: URL,
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const { password } = (await getBody(req)) as Partial<IRegisterInfo>

    if (!password) throw new BadReqErr('Need Info To Proceed!')

    const urlArr = url.pathname.split('/')
    const t = urlArr[urlArr.length - 1]
    const email = urlArr[urlArr.length - 2]

    const rT = await RedisService.get(`${email}-resetToken`)

    if (!rT || rT !== t) throw new BadReqErr('Go Try Process Again!')

    const hashedPass = await PasswordService.toHash(password)

    await UserRepository.updatePassword(email, hashedPass)

    await RedisService.del(`${email}-resetToken`)

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ message: 'Success Go Login!' }))
    res.end()

    return
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify([{ message: error.message }]))
    res.end()

    return
  }
}
