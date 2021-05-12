import { Db, Collection, WithId, InsertOneWriteOpResult } from 'mongodb'

import { IRegisterInfo } from '../../@types'

// ---

export interface UserModel {
  email: string
  password: string
}

// ---

export class UserRepository {
  private static users: Collection<UserModel>
  //

  static async injectDB(db: Db) {
    if (UserRepository.users) return

    try {
      this.users = db.collection('users')
    } catch (e) {
      console.error(`unable to establish ${e}`)
    }
  }

  static async getByEmail(email: string): Promise<UserModel | null> {
    try {
      return await this.users.findOne({ email })
    } catch (error) {
      console.log(error)
      return null
    }
  }

  static async create(
    info: IRegisterInfo
  ): Promise<InsertOneWriteOpResult<WithId<UserModel>>['ops']> {
    return (await this.users.insertOne(info)).ops
  }
}
