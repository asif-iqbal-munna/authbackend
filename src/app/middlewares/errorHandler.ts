import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IErrorResponse } from '../interfaces/error'
import { validationError } from '../../errors/validationError'
import ApiError from '../../errors/apiError'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errObj: IErrorResponse = {
    status: false,
    message: 'System Error',
    errors: [],
    stack: config.nodeEnvironment !== 'prod' ? err.stack : undefined,
  }

  let statusCode = 400

  if (err?.name === 'ValidationError') {
    const { statusCode: code = 400, errors, message } = validationError(err)
    statusCode = code
    errObj.errors = errors
    errObj.message = message
  } else if (err instanceof Error) {
    errObj.message = err?.message
    errObj.errors = err?.message ? [{ path: '', message: err.message }] : []
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode
    errObj.message = err?.message
    errObj.errors = err?.message ? [{ path: '', message: err.message }] : []
  }

  res.status(statusCode).json(errObj)
  next()
}

export default errorHandler