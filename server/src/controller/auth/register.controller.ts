/*
 ** Description :
 */

import jwt from 'jsonwebtoken'

import { IncomingMessage, ServerResponse } from 'http'

import { config } from '../../config'
import { BadReqErr } from '../../error'
import { IRegisterInfo, IUser } from '../../@types'
import { PasswordService } from '../../service'
import { getBody, userRefine } from '../../util'

// ---

const { JWT_KEY } = config

// ---

export const register = async (
  _url: URL,
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    // get body from buffer to string
    const { email, password } = (await getBody(req)) as IRegisterInfo

    // const existingUser: IUser = await UserRepository.getByEmail(email)

    // if (existingUser) throw new BadReqErr('Email in use!')

    const user = { hashed_pass: 'fsd', user_id: '3', email: 'fdsfds' }

    const hashed = await PasswordService.toHash(password)

    // const user: IUser = await UserRepository.create({ email, password: hashed })

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.user_id,
        email: user.email
      },
      JWT_KEY!
    )

    res.setHeader(
      'Set-cookie',
      `vanillajwt=${userJwt};path=/;expires=${new Date(
        new Date().getTime() + 86409000
      ).toUTCString()}`
    )
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.write(
      JSON.stringify([
        userRefine(
          {
            ...user,
            created_at: 'dfsd',
            updated_at: 'fdsfdsf',
            deleted_at: 'ffsd',
            deleted: false
          },
          userJwt
        )
      ])
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
