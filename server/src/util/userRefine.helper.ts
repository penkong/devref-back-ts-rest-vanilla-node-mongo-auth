import { WithId } from 'mongodb'
import { UserModel } from '../data'

// ---

export const userRefine = (
  { _id, email }: WithId<UserModel>,
  token: string
) => ({
  id: _id,
  email,
  token
})
