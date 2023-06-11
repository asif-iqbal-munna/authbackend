import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { ErrorLog, SuccessLog } from './shared/log'
import { Server } from 'http'

process.on('uncaughtException', err => {
  ErrorLog(err)
  process.exit(1)
})

let server: Server

const connectToDb = async () => {
  try {
    if (config.database_url) {
      await mongoose.connect(config.database_url)

      SuccessLog('connected to the db')

      server = app.listen(config.port, () => {
        SuccessLog(`Listening on port ${config.port}`)
      })
    } else {
      SuccessLog('db url needed')
    }

    process.on('unhandledRejection', err => {
      if (server) {
        server.close(() => {
          ErrorLog(err)
          process.exit(1)
        })
      } else {
        process.exit(1)
      }
    })
  } catch (error) {
    ErrorLog('not able to connect with db')
  }
}

connectToDb()

process.on('SIGTERM', err => {
  if (server) {
    ErrorLog(err)
    server.close()
  }
})
