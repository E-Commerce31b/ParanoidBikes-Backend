const {check} = require('express-validator')
const { adminModel } = require('../models')
const validateResults = require('../utils/handleValidator');


const adminValidator = [
   check('email')
      .exists()
      .notEmpty()
      .isLength({ min: 6, max: 50})
      .custom(async (value) => {
         const user = await userModel.findOne({ email: value });
         if (user) {
           throw new Error('El email ya está en uso');
         }
         return true;
      }),
   check('password')
      .exists()
      .notEmpty()
      .custom(value => {
         if(value.length < 8) {
            throw new Error('Password debe conteer al menos 8 caracteres')
         }
         return true
      })
      .isLength({ min: 8, max: 50 }),
   check('first_name')
      .optional()
      .isLength({ min: 4, max: 50 }),
   check('last_name')
      .optional()
      .isLength({ min: 4, max: 50 }),
   check('city')
      .optional(),
   check('country')
      .optional(),
   check('state')
      .optional(),
   check('softDelete')
      .optional(),
   (req, res, next) => {
      return validateResults(req, res, next)
   }
]

module.exports = adminValidator