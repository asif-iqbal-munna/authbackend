import express, { Router } from 'express'
import userRoutes from '../modules/users/user.routes'

const router: Router = express.Router()

router.use('/users', userRoutes)

export default router
