const express = require('express')
const router = express.Router()

const Database = require('../../db/database')

router.get('/banner', async(req, res) => {
  let result = await Database.query(`
    SELECT fileName, fileNameMobile, url 
    FROM banner
    WHERE isPromotion is false
    OR (
      isPromotion is true
      AND CURRENT_DATE() < expiredDate
    )
    ORDER BY id DESC
    LIMIT 5
  `)
  return res.jsonp(result)
})

router.get('/banner/:category', async(req, res) => {
  let result = await Database.query(`
    SELECT fileName, fileNameMobile, url FROM banner
    WHERE category like '${req.params.category}'
    AND ( isPromotion is false
    OR (
      isPromotion is true
      AND CURRENT_DATE() < expiredDate
    ))
    ORDER BY id DESC
  `)
  return res.jsonp(result)
})

router.get('/contactus', async (req, res) => {
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

router.get('/products', async (req, res) => {
  const result = await Database.query('SELECT * FROM v_homepage_products')
  return res.jsonp(result)
})

router.get('/productType', async (req, res) => {
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

router.get('/product/:web_category', async (req, res) => {
  let data = await Database.query(`SELECT * FROM product_link WHERE id like '${req.params.web_category}' `)
  let priceList = await Database.query(`
      SELECT description, MIN(price) as price FROM products
      WHERE webCategory like '${req.params.web_category}' 
      AND isCancel is FALSE 
      GROUP BY description ORDER BY price
  `)
  return res.jsonp({
      ...data[0],
      "priceList": priceList
  })
})

module.exports = router