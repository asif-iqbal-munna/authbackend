export type IErrorResponse = {
  status?: boolean
  message: string
  errors: {
    path: string
    message: string
  }[]
  stack?: unknown
  statusCode?: number
}
