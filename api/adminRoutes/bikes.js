const express = require('express');
const router = express();
const {getBikesApi, getBikesDb, bikesToDb} = require("../controllers/bikes");
const { bikeModel } = require('../models');
const {   
    authenticateTokenUserRoute, 
    authenticateTokenAdminRoute,
    validateAdminToken
 } = require('../validators/tokenValidator')
// 
router.get("/", authenticateTokenAdminRoute, async(req, res) => {
    const { name } = req.query;
    try {
         const bikes = await getBikesDb()
            if(name) {
               let found = bikes.filter(
                  f => f?.name?.toLowerCase().includes(name?.toLowerCase())
               )
               // console.log(found)
               found.length ?
               res.status(200).send(found) :
               res.status(404).send('Bike not found...')
            } else {
               res.status(200).send(bikes.flat())//
            }
    } catch(err) {
      console.log('error en get bicis')
      console.log(err)
      console.log('error en get bicis')
      res.status(404).send("not found D:")
    }
} )

router.get("/:id", authenticateTokenAdminRoute, async(req, res) => {
    const { id } = req.params
    try {
        const data = await bikeModel.findById(id)
            res.status(200).send(data)
    } catch (err) {
        console.log('error en get bicis por id')
        console.log(err)
        console.log('error en get bicis por id')
        res.status(404).send("not found D:")
    }
})

router.put('/:id', authenticateTokenAdminRoute, async(req, res) => {
    const { id } = req.params
    try {
        const { ...body } = req.body;
        const data = await bikeModel.findByIdAndUpdate(id, body)
        res.status(200).send(data)
    } catch (err) {
        console.log('error en put bicis')
        console.log(err)
        console.log('error en put bicis')
        res.status(400).send("cant't modify")
    }
})

router.post("/", authenticateTokenAdminRoute, async(req, res) => {
    try {
        console.log(req.body)
        const {
            name,
            maker,
            image,
            year,
            category,
            isEBike,
            gender,
            priceCurrency,
            priceAmount
        } = req.body;
        
        const createdBike = await bikeModel.create({
            name,
            maker,
            image,
            year,
            category,
            isEBike,
            gender,
            priceCurrency: priceCurrency,
            priceAmount: priceAmount
        })

        res.status(200).send(createdBike)
    } catch (err) {
        console.log('error en post bicis')
        console.log(err)
        console.log('error en post bicis')
        res.status(404).send("can't post D:")
    }
})

router.delete('/:id', authenticateTokenAdminRoute, async(req, res) => {
    const { id } = req.params;
    try {
        const data = await bikeModel.findByIdAndDelete(id)
        res.status(200).send(data)
    } catch (err) {
        console.log('error en delete bikes')
        console.log(err)
        console.log('error en delete bikes')
        res.status(400).send("Can't delete")
    }
})

module.exports = router