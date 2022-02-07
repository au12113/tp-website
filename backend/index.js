const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

const Database = require('./db/database')

// require('dotenv').config()
// if(process.env.ENV==='PROD') {
//     require('@google-cloud/debug-agent').start({ serviceContext: { enableCanary: true } });
// }
app.set('trust proxy', true)
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     next()
// })
app.use(cors({"credentials": true, "optionsSuccessStatus": 204}))
app.options('*', cors())

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

app.get('/banner/:category', async(req, res) => {
    let result = await Database.query(
        `SELECT fileName, fileNameMobile, url FROM banner \
        WHERE category like '${req.params.category}' \
        AND ( isPromotion is false \
        OR ( \
            isPromotion is true \
            AND CURRENT_DATE() < expiredDate \
        )) \
        ORDER BY id DESC \
        LIMIT 10`)
    return res.jsonp(result)
})

app.get('/contactus', async (req, res) => {
    const result = await Database.query('SELECT * FROM v_branch_order_province')
    const grouped_branch = result.reduce((acc, val) => {
        if(!acc[val.province]) {
            acc[val.province] = []
        }
        acc[val.province].push(val)
        return acc
    }, {})
    return res.jsonp(grouped_branch)
})

app.get('/products', async (req, res) => {
    const result = await Database.query('SELECT * FROM v_homepage_products')
    return res.jsonp(result)
})

app.get('/productType', async (req, res) => {
    const typeList = [
        { id: 'Pick-up', text: 'รถกระบะ', modelList: [] },
        { id: 'PPV', text: 'รถอเนกประสงค์', modelList: [] },
        { id: 'Truck', text: 'รถบรรทุก', modelList: [] }
    ]
    const result = await Database.query('SELECT * FROM v_homepage_product_type')
    const productTypes = result.reduce((acc, val) => {
        let found = false
        acc.forEach((x, index) => {
            if(!found && x.id == val.category) {
                acc[index].modelList.push(val)
                found = true
            }
        })
        return acc
    }, typeList)
    return res.jsonp(productTypes)
})

app.get('/product/:web_category', async (req, res) => {
    let data = await Database.query(`SELECT * FROM product_link WHERE id like '${req.params.web_category}' `)
    let priceList = await Database.query(`
        SELECT description, MIN(price) as price FROM products
        WHERE webCategory like '${req.params.web_category}' 
        AND isCancel is FALSE 
        GROUP BY description ORDER BY price`)
    return res.jsonp({
        ...data[0],
        "priceList": priceList
    })
})

app.listen(port, () => {
    console.log(`Server listening on PORT: ${port}`)
})
