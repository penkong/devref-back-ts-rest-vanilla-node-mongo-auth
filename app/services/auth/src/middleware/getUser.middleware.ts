import jwt from 'jsonwebtoken'
//
import { config } from '../config'
import { ICurrentUser } from '../@types/index'

// ---

const { JWT_KEY } = config

export const getUser = (cookie: string) =>
  jwt.verify(cookie, JWT_KEY!) as ICurrentUser
