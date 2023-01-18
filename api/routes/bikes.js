const express = require('express');
const router = express();
const {getBikesApi, getBikesDb, bikesToDb} = require("../controllers/bikes");
const { bikeModel } = require('../models');

router.get("/", async(req, res) => {
    const { name } = req.query;
    try {
        const bikes = await getBikesDb()
            const total = bikes.filter(e => e.softDelete !== true)
            if(name) {
                let found = total.filter(
                    f => f?.name?.toLowerCase().includes(name?.toLowerCase())
                )
                // console.log(found)
                found.length ?
                res.status(200).send(found) :
                res.status(404).send('Bike not found...')
            } else {
                res.status(200).send(total.flat())//
            }
    } catch(err) {
        console.log('error en get bicis')
        console.log(err)
        console.log('error en get bicis')
        res.status(404).send("not found D:")
    }
} )

router.get("/:id", async(req, res) => {
    const { id } = req.params
    try {
        const data = await bikeModel.findById(id)
        if(data.softDelete === true) {
            res.status(404).send('not found D:')
        } else {
            res.status(200).send(data)
        }
    } catch (err) {
        console.log('error en get bicis por id')
        console.log(err)
        console.log('error en get bicis por id')
        res.status(404).send("not found D:")
    }
})


module.exports = router