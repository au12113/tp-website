const express = require('express')
const cors = require('cors')
const _ = require('lodash')
const app = express()
const port = process.env.PORT || 3000

const Database = require('./db/database')

require('dotenv').config()
if(process.env.ENV==='PROD') {
    require('@google-cloud/debug-agent').start({ serviceContext: { enableCanary: true } });
}
app.set('trust proxy', true)

app.use(cors())

app.use((req, res, next)=>{
    if(process.env.ENV==='DEBUG') {
        const date = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Bangkok'
        })
        console.log(`[${date}] ${req.originalUrl}`)
    }
    next()
})

app.get('/', (req, res) => {
    res.jsonp({
        "name": "index"
    })
})

app.get('/banner', async(req, res) => {
    let result = await Database.query(
        "SELECT fileName, fileNameMobile, url FROM banner \
        WHERE isPromotion is false \
        OR ( \
            isPromotion is true \
            AND CURRENT_DATE() < expiredDate \
        ) \
        ORDER BY id DESC \
        LIMIT 5")
    return res.jsonp(result)
})

app.get('/contactus', async (req, res) => {
    let result = await Database.query('SELECT * FROM v_branch_order_province')
    let grouped_branch = _.groupBy(result, 'province')
    return res.jsonp(grouped_branch)
})

app.get('/products', async (req, res) => {
    let result = await Database.query('SELECT * FROM v_homepage_products')
    return res.jsonp(result)
})

app.get('/product/:web_category', async (req, res) => {
    let data = await Database.query(`SELECT * FROM product_link WHERE id like '${req.params.web_category}' `)
    let priceList = await Database.query(`SELECT id as code, description, price FROM products WHERE webCategory like '${req.params.web_category}' ORDER BY code asc`)
    return res.jsonp({
        ...data[0],
        "priceList": priceList
    })
})

app.listen(port, () => {
    console.log(`Server listening on PORT: ${port}`)
})