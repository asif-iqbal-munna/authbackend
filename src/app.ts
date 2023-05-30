import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

// Enable cors support
app.use(cors())

// Parse incoming requests with JSON payloads
app.use(express.json())

//  Parse incoming requests with URL-encoded payloads.
app.use(express.urlencoded({ extended: true }))

// Test root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('okk!')
})

export default app
