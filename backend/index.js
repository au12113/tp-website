const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

// const urlencodeParser = bodyParser.urlencoded({ extended: false })

const { verifyToken } = require('./helpers/auth')

const accountRoute = require('./endpoints/accounts/accountRoute')
const productRoute = require('./endpoints/products/productRoute')
const adminRoute = require('./endpoints/admins/dashboard')

app.set('trust proxy', true)
app.use(cors({origin: true, credentials: true, optionsSuccessStatus: 204}))
app.options('*', cors())

app.use(cookieParser())
app.use(bodyParser.json())

if (process.env.ENV === 'DEV') {
    app.use((req, res, next) => {
        const date = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Bangkok'
        })
        console.log(`[${date}] ${req.originalUrl}`)
        next()
    })
}

app.use('/v1', accountRoute)

app.use('/v1', productRoute)

app.use('/v1/admin', verifyToken, adminRoute)

app.listen(port, () => {
    (`Server listening on PORT: ${port}`)
})
