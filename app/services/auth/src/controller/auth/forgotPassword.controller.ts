import { IncomingMessage, ServerResponse } from 'http'

import { getBody } from '../../util'
import { config } from '../../config'
import { BadReqErr } from '../../error/'
import { IRegisterInfo } from '../../@types'
import { UserRepository } from '../../data/'
import { PasswordService, RedisService, MailerService } from '../../service'

// ---

export const forgotPassword = async (
  url: URL,
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const { email } = (await getBody(req)) as Partial<IRegisterInfo>

    if (!email) throw new BadReqErr('Wrong Inputs!')

    const user = await UserRepository.getByEmail(email)

    if (!user) throw new BadReqErr('Go Register!')

    const resetToken = await PasswordService.resetToken()

    RedisService.set(
      `${user.email}-resetToken`,
      resetToken,
      'ex',
      config.RESET_TOKEN_EXP
    )

    const resetURL = `${url.protocol}://${url.host}/v1/api/auth/passwordresest/${resetToken}`

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetURL} clicktracking=off>GO RESET</a>
    `

    await new MailerService(
      { email: user.email, name: user.email },
      resetURL
    ).send(message, 'reset password')

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.write(
      JSON.stringify({
        status: 'success',
        message: 'Token sent to email!'
      })
    )
    res.end()

    return
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify([{ message: error.message }]))
    res.end()

    return
  }
}
