const ERROR_HANDLERS = {
  CastError: (res) => res.status(400).json({ error: 'id used is malformed' }),
  ValidationError: (res, { message }) => res.status(409).json({ error: message }),
  JsonWebTokenError: (res) => res.status(401).json({ error: 'token is missing or invalid' }),
  TokenExpiredError: (res) => res.status(401).json({ error: 'token expired' }),
  defaultError: (res) => res.status(500).end()
}

module.exports = (error, _request, res, _next) => {
  console.log(error.name)

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(res, error)
}