const express = require('express');
const router = express()
const mongoose = require('mongoose');
const { commentModel } = require('../models');

router.get('/', async(_req, res) => {
   const comments = await commentModel.find({}).populate('author').populate('bike')
   try {
      const filtered = comments.filter(c => c.softDelete !== true)
      res.send(filtered)
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