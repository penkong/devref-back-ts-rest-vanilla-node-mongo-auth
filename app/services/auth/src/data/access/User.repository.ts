import { Db, Collection, InsertOneWriteOpResult, WithId } from 'mongodb'
import { IRegisterInfo } from '../../@types/index'

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
      throw new Error(error)
    }
  }

  static async create(
    info: IRegisterInfo
  ): Promise<InsertOneWriteOpResult<WithId<UserModel>>['ops']> {
    return (await this.users.insertOne(info)).ops
  }

  static async updatePassword(email: string, password: string) {
    try {
      const updateResponse = await this.users.updateOne(
        { email },
        { $set: { password } }
      )

      if (updateResponse.matchedCount === 0) throw new Error('Not Found Match!')

      return updateResponse
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}
