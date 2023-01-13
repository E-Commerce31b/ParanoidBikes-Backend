const express = require('express');
const {adminModel} = require('../models/index')
const router = express();
const jwt = require('jsonwebtoken')
const {   
   authenticateTokenUserRoute, 
   authenticateTokenAdminRoute
} = require('../validators/tokenValidator')
// const { getUsersValidator } = require('../validators/bikeValidator')


router.post('/', async(req, res) => {
   console.log('admin post')
   try {
       const {
           first_name,
           last_name,
           type,
           email,
           country,
           city,
           state,
           address,
           birthday,
           password,
           DNI,
           admin,
           superAdmin
       } = req.body
       const createdUser = adminModel.create({
         first_name,
         last_name,
         type,
         email,
         country,
         city,
         state,
         address,
         birthday,
         password,
         DNI,
         admin,
         superAdmin
       })
       res.status(200).send("Admin Creado")
   } catch (err) {
       console.log('error en post Admin')
       console.log(err)
       console.log('error en post Admin')
       res.status(404).send("can't post D:")
   }
})

module.exports = router