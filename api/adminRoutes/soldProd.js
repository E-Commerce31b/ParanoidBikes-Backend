const express = require('express');
const {soldProdModel} = require('../models/index')
const router = express();
const jwt = require('jsonwebtoken')
const {   
    authenticateTokenUserRoute, 
    authenticateTokenAdminRoute
 } = require('../validators/tokenValidator')


router.get('/', authenticateTokenAdminRoute, async(_req, res) => {
   try{
      const products = await soldProdModel.find({})
      res.status(200).send(products)
   } catch(error) {
      console.log("ERROR EN GET ADMINROUTE SOLD")
      console.log(error)
      console.log("ERROR EN GET ADMINROUTE SOLD")
   }

})

router.post('/', authenticateTokenUserRoute, async(req, res) => {
   try {
      const {
         client, product, date, address, zip
      } = req.body
   
      const prod = await soldProdModel.create({
         client, product, date, address, zip
      })
   
      res.status(201).send(prod)
   } catch(error) {
      console.log("ERROR EN POST ADMINROUTE SOLD")
      console.log(error)
      console.log("ERROR EN POST ADMINROUTE SOLD")
   }

})

router.put('/:id', authenticateTokenAdminRoute, async(req, res) => {
   const { id } = req.params
   try {
       const { ...body } = req.body;
       const data = await soldProdModel.findByIdAndUpdate(id, body)
       res.status(200).send(data)
   } catch (err) {
       console.log('ERROR EN PUT SOLDPROD ')
       console.log(err)
       console.log('ERROR EN PUT SOLDPROD ')
       res.status(400).send("cant't modify")
   }
})



module.exports = router