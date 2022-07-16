const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
global.__basedir = __dirname
global.__sharedir = path.join(require('os').homedir(), '/shared/assets/')
// const urlencodeParser = bodyParser.urlencoded({ extended: false })

const { verifyToken } = require('./helpers/auth')

const accountRoute = require('./endpoints/accounts/accountRoute')
const productRoute = require('./endpoints/products/productRoute')
const adminRoute = require('./endpoints/admins/contentManagement')

///
const homeController = require('./helpers/home')
const upload = require('./middleware/upload')
///

app.set('trust proxy', true)
app.use(cors({origin: true, credentials: true, optionsSuccessStatus: 204}))
app.options('*', cors())

app.use(cookieParser())
app.use(bodyParser.json())

if (!fs.existsSync(__sharedir)) {
    fs.mkdirSync(__sharedir, { recursive: true })
}

if (process.env.ENV === 'DEV') {
    app.use((req, res, next) => {
        const date = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Bangkok'
        })
        console.log(`[${date}] ${req.originalUrl}`)
        next()
    })
}
console.log(__sharedir)

app.get('/test', homeController.getHome)
app.post('/upload', upload.uploadFile, upload.resizeImage, upload.getResult)

app.use('/v1', productRoute)

app.use('/v1', accountRoute)

app.use('/v1/admin', verifyToken, adminRoute)

app.listen(port, () => {
    (`Server listening on PORT: ${port}`)
})
