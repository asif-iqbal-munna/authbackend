import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body

    const result = await UserService.createUserService(payload)
    res.status(200).json({
      status: true,
      message: 'User has been created successfully.',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUser,
}
