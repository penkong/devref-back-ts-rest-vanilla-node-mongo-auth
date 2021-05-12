/*
 ** Description :
 */

import jwt from 'jsonwebtoken'

import { IncomingMessage, ServerResponse } from 'http'

import { config } from '../../config'
import { BadReqErr } from '../../error'
import { IRegisterInfo } from '../../@types'
import { PasswordService } from '../../service'
import { getBody, userRefine } from '../../util'
import { UserRepository } from '../../data'
import { WithId } from 'mongodb'

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

    const existingUser = await UserRepository.getByEmail(email)

    if (existingUser) throw new BadReqErr('Email in use!')

    const hashed = await PasswordService.toHash(password)

    const user = (
      await UserRepository.create({
        email,
        password: hashed!
      })
    )[0]

    if (!user) throw new BadReqErr('Problem')

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user?._id,
        email: user?.email
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
    res.write(JSON.stringify([userRefine(user, userJwt)]))
    res.end()
    return
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify([{ message: error.message }]))
    res.end()
    return
  }
}
