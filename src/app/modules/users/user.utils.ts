import { User } from './user.model'

export const generateUserId = async () => {
  const lastUserId = await User.findOne({}, { userId: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  const { userId } = lastUserId || { userId: '0' }
  const newUserId = (parseInt(userId) + 1).toString().padStart(9, '0')
  return newUserId
}
