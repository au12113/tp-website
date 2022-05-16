const express = require('express')
const router = express.Router()

const { parseArray } = require('../../helpers/responseHelper')

const Database = require('../../db/database')

router.get('/', (req, res) => {
  return res.status(200).jsonp({ "msg": "Hey, I'm in."})
})

// router.get('/banner', async (req, res) => {
//   const response = await Database.query(`
//     SELECT fileName, fileNameMobile, url 
//     FROM banner
//     WHERE isPromotion is false
//     OR (
//       isPromotion is true
//       AND CURRENT_DATE() < expiredDate
//     )
//     ORDER BY id DESC
//   `)
//   return res.status(200).jsonp(response)
// })

router.route('/contactus')
  .get(async (req, res) => {
    const response = await Database.query(`
      SELECT * 
      FROM branch
    `)
    return res.status(200).jsonp(response)
  })

router.route('/contactus/:id')
  .get(async (req, res) => {
    try {
      const response = await Database.query(`
        SELECT *
        FROM branch
        WHERE id = '${req.params.id}'
      `)
      return res.status(200).jsonp(response)
    } catch (err) {
      return res.status(404).jsonp(err)
    }
  })
  .post(async (req, res) => {
    const { id, name, address, subdistrict, district, province, postcode, tel, service_tel, url, embed } = req.body
    try {
      const response = await Database.query(`
        UPDATE branch
        SET name = '${name}', address='${address}', subdistrict='${subdistrict}',
        district='${district}', province='${province}', postcode='${postcode}', tel='${parseArray(tel)}', 
        service_tel='${service_tel}', url='${url}', embed='${embed}'
        WHERE id='${id}';
      `)
      return res.status(201).jsonp({response})
    } catch (err) {
      return res.status(400).jsonp({err})
    }
  })

router.route('/banners')
  .get(async(req, res)=>{
    const category = req.params.category ? req.params.category : null
    const response = await Database.query(`
      SELECT *
      FROM banner
      ${category !== null ? `WHERE category = '${category}'` : ''}
    `)
    return res.status(200).jsonp(response)
  })
  .post(async(req, res)=>{

  })

module.exports = router