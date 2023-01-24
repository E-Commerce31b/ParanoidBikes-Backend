const express = require('express');
const {adminModel} = require('../models/index')
const router = express();
const jwt = require('jsonwebtoken')
const {   
   authenticateTokenUserRoute, 
   authenticateTokenAdminRoute,
} = require('../validators/tokenValidator')
// const { getUsersValidator } = require('../validators/bikeValidator')

router.get('/', authenticateTokenAdminRoute, async(req, res) => {

    const {first_name, last_name} = req.query
    try {
        const AllUsers = await adminModel.find({})
        const users = AllUsers.filter(e => e.softDelete !== true)
        if(last_name || first_name) {
            let found = []
            last_name ? 
            found = users.filter(u => u?.last_name?.toLowerCase().includes(last_name?.toLowerCase())) :
            found = users.filter(u => u?.first_name?.toLowerCase().includes(first_name?.toLowerCase()))
            console.log(found)
            res.status(200).send(found)
        } else {
            res.status(200).send(AllUsers)
        }

    } catch (err) {
        console.log('error en get admin')
        console.log(err)
        console.log('error en get admin')
        res.status(404).send("not found D:")
    }
})


router.post('/', authenticateTokenAdminRoute, async(req, res) => {
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

router.get('/:id', authenticateTokenAdminRoute, async(req, res) => {
    const { id } = req.params;
    try {
        const data = await adminModel.findById(id)
        if(data.softDelete === true) {
            res.status(404).send('admin not found D:')
        } else {
            res.status(200).send(data)
        }
        
    } catch (err) {
        console.log('error en get admin id')
        console.log(err)
        console.log('error en get admin id')
        res.status(404).send("not found D:")
    }

})



router.put('/:id', authenticateTokenAdminRoute, async(req, res) => {
    console.log(req.params) 
    
    const { id } = req.params;
    console.log(id)
    try {
        const { ...body } = req.body
        console.log(body)
        const data = await adminModel.findByIdAndUpdate(id, body)
        res.status(200).send("Admin Updated")
    } catch (err) {
        console.log('error en put admin')
        console.log(err)
        console.log('error en put admin')
        res.status(400).send("cant't modify")
    }
})



module.exports = router