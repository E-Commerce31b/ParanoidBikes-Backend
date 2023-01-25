const express = require('express');
const router = express()
const mongoose = require('mongoose');
const { commentModel } = require('../models');

// ! 63cb425243c8adacf2821d3e bike
//!  63d0417fceff9f451cb92b79 user
//! 63c19e6fe7be015afaf3161c admin
//! 63d073e43876d79d8cedb8f9 comment

router.get('/', async(_req, res) => {
   const comments = await commentModel.find({}).populate('author').populate('bike')
   try {
      res.send(comments)
   } catch (error) {
      console.log('ERROR EN POST COMMENTS')
      console.log(error)
      console.log('ERROR EN POST COMMENTS')
   }
})

router.put('/:id', async(req, res) => {
   const { id } = req.params
   const { ...body } = req.body
   try {
      const comment = await commentModel.findById(id)
      comment.replies.push(body)
      await comment.save()
      res.status(200).send('Response added successfully')
   } catch (error) {
      console.log('ERROR EN PUT COMMENTS')
      console.log(error)
      console.log('ERROR EN PUT COMMENTS')
   }
})

router.post('/', async(req, res) => {
   const comment = new commentModel(req.body);
   try {
     await comment.save();
     res.send(comment);
   } catch (error) {
     console.log('ERROR EN POST COMMENTS')
     console.log(error)
     console.log('ERROR EN POST COMMENTS')
     res.status(422).send(error);
   }
});




module.exports = router;