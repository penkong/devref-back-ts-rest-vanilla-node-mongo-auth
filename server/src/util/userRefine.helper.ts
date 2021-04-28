import { IUser } from '../@types'

// ---

export const userRefine = (
  { user_id, email, updated_at, created_at }: IUser,
  token: string
) => ({
  id: user_id,
  email,
  createdAt: created_at,
  updatedAt: updated_at,
  token
})
