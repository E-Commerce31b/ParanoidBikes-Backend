const express = require('express');
const { soldProdModel } = require('../models');
const { validateAdminToken } = require('../validators/tokenValidator');
const router = express();

router.get('/', validateAdminToken, async(_req, res) => {
   try {
      const soldProd = await soldProdModel.find({}).populate('product').populate('client')
      res.status(200).send(soldProd)
   } catch (error) {
      console.log("ERROR EN GET SELLS")
      console.log(error)  
      console.log("ERROR EN GET SELLS")  
      res.sendStatus(400)
   }
})

router.post('/',  async(req, res) => {
   try {
      const prod = req.body
      await soldProdModel.create(prod)
      res.status(201).send('Gracias por su compra')
   } catch (error) {
      console.log("ERROR EN POST SELLS")
      console.log(error)  
      console.log("ERROR EN POST SELLS")  
      res.sendStatus(400)
   }
})

router.put('/:id', validateAdminToken, async(req, res) => {
   try {
      const { id } = req.params
      const { ...body } = req.body
      await soldProdModel.findByIdAndUpdate(id, body)
      res.status(200).send('Actualizacion realizada con exito')
   } catch (error) {
      console.log("ERROR EN PUT SELLS")
      console.log(error)  
      console.log("ERROR EN PUT SELLS")  
      res.sendStatus(400)
   }
})

module.exports = router