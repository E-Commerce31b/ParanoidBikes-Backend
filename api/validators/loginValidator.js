const {check} = require('express-validator')
const { adminModel, userModel } = require('../models')
const validateResults = require('../utils/handleValidator');

const logginValidator = [
   check('email')
      .exists()
      .notEmpty()
      .custom(async (value) => {
         console.log(value)
         let user = await userModel.find({ email: value })
         if(!user.length) {
            user = await adminModel.find({ email: value })
            if(!user.length) {
               throw new Error('Email no existe')
            }
         }
         if(user[0].softDelete) {
            console.log('soft')
            throw new Error('este usuario no tiene permitido el ingreso a este sitio')
         }
         return true
      }),
   check('password')
      .exists()
      .notEmpty(),
   (req, res, next) => {
      return validateResults(req, res, next)
   }
]

module.exports = logginValidator