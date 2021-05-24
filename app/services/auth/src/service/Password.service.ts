/*
 ** Description :
 */

import { scrypt, randomBytes, createHash } from 'crypto'
import { promisify } from 'util'

// ---

const scryptAsync = promisify(scrypt)

// ---

export class PasswordService {
  //

  static async toHash(password: string) {
    try {
      const salt = randomBytes(12).toString('hex')
      const buf = (await scryptAsync(password, salt, 64)) as Buffer
      return `${buf.toString('hex')}.${salt}`
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  static async compare(storedPass: string, password: string) {
    const [hashedPassword, salt] = storedPass.split('.')
    const buf = (await scryptAsync(password, salt, 64)) as Buffer

    return buf.toString('hex') === hashedPassword
  }

  static async resetToken(t?: string) {
    try {
      const tt = t || randomBytes(20).toString('hex')
      return createHash('sha256').update(tt).digest('hex')
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}
