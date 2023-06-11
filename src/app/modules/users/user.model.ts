import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    role: { type: String, required: true },
    password: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser>('User', userSchema)
