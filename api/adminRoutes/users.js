const express = require('express');
const {userModel, adminModel} = require('../models/index')
const router = express();
const jwt = require('jsonwebtoken')
const {   
    authenticateTokenUserRoute, 
    authenticateTokenAdminRoute
 } = require('../validators/tokenValidator')
// const { getUsersValidator } = require('../validators/bikeValidator')
// 

router.get('/', authenticateTokenAdminRoute, async(req, res) => {
    const {first_name, last_name} = req.query
    try {
        const AllUsers = await userModel.find({})
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
        console.log('error en get usuario')
        console.log(err)
        console.log('error en get usuario')
        res.status(404).send("not found D:")
    }
})

router.get('/:id', authenticateTokenAdminRoute, async(req, res) => {
    const { id } = req.params;
    try {
        const data = await userModel.findById(id).populate('history')
        if(data.softDelete === true) {
            res.status(404).send('user not found D:')
        } else {
            res.status(200).send(data)
        }
        
    } catch (err) {
        console.log('error en get user id')
        console.log(err)
        console.log('error en get user id')
        res.status(404).send("not found D:")
    }

})

router.put('/:id', authenticateTokenAdminRoute, async(req, res) => {
    const { id } = req.params;
    try {
        const { ...body } = req.body
        const data = await userModel.findByIdAndUpdate(id, body)
        res.status(200).send(data)
    } catch (err) {
        console.log('error en put users')
        console.log(err)
        console.log('error en put users')
        res.status(400).send("cant't modify")
    }
})

module.exports = router