const jwt = require('jsonwebtoken')
const { combineJwt } = require('../helpers/jwt')

const verifyToken = async (req, res, next) => {
  const sigCookie = req.cookies['sig']

  if (req.headers['authorization']) {
    const headerBody = req.headers['authorization']
    // const date = new Date().getTime() / 1000
    const token = combineJwt(headerBody, sigCookie)
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY)
      req.decoded = decoded
      return next()
    } catch (err) {
      return res.status(401).send({ ...err })
    }
  } else {
    return res.status(403).send('A token is required for authentication')
  }
}

module.exports = { verifyToken }