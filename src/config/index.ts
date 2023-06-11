import dotenv from 'dotenv'

//  Configure this to access env values
dotenv.config()

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URI,
  defaultPassword: process.env.DEFAULT_PASSWORD,
  nodeEnvironment: process.env.NODE_ENV,
}
