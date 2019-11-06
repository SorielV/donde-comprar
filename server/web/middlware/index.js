import { getQueryOptions } from '../../utils'

export const errorHandle = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    return res
      .status(err.errorCode || 500)
      .json({
        message: err.message // Custom message
      })
      .end()
  })
}

export const queryOptions = defaultOptions => (req, res, next) => {
  req.queryOptions = getQueryOptions(req.query, defaultOptions)
  return next()
}
