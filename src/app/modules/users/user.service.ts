import config from '../../../config'
import ApiError from '../../../errors/apiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

const createUserService = async (data: IUser): Promise<IUser | null> => {
  // Auto generated incremental id for user
  const userId = await generateUserId()

  data.userId = userId

  // Default password
  if (!data.password && config.defaultPassword) {
    data.password = config.defaultPassword
  }

  const createdUser = await User.create(data)

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user')
  }
  return createdUser
}

export const UserService = {
  createUserService,
}
