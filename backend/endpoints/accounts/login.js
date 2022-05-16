const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Database = require('../../db/database')
const { separateJwt } = require('../../helpers/jwt')

const tokenLife = 24*60*60

const register = async (req, res) => {
  try {
    const { id, email, password } = req.body
    if(!(email && password)) {
      return res.status(400).send({ "msg": "Bad request" })
    }

    const existedUser = await Database.query(`
      SELECT email, hash
      FROM user
      WHERE email = '${email}'
    `)

    if(existedUser) {
      return res.status(409).send({ "msg": "User already existed."})
    }

    const hashed = await bcrypt.hash(password, user.id.length)

    let user = await Database.query(`
      INSERT INTO user (id, email, hash, isBanned, expired)
      VALUES (${id}, ${email}, ${hashed}, 0, NULL)
    `)
  } catch (err) {
    console.log(err)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await Database.query(`
      SELECT id, email, hash
      FROM user
      WHERE email = '${email}'
    `)
    if (user.length === 1) {
      const result = await bcrypt.compare(password, user[0].hash)
      if (result) {
        const token = jwt.sign(
          {
            "id": user[0].id,
            "email": user[0].email
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: tokenLife
          }
        )
        const { payload, signature } = separateJwt(token)
        return res.status(202)
          .cookie('sig', signature, { secure: true, sameSite: 'strict', path: '/', maxAge: tokenLife*1000, httpOnly: true })
          .jsonp({ msg: "Success", token: payload, user: { id: user[0].id }})
      } 
      else {
        return res.status(404).jsonp({ "msg": "Invalid credentials" })
      }
    } else {
      return res.status(404).jsonp({ "msg": "User not found" })
    }
  } catch (err) {
    console.log(err)
    return res.status(400).jsonp({ "msg": "Bad request" })
  }
}

module.exports = { login, register }