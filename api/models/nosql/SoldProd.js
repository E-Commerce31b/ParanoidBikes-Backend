const mongoose = require('mongoose')

const SoldProdSchema = mongoose.Schema({
   id: {
      type: mongoose.Types.ObjectId
   },
   client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bike"
   },
   date: {
      type: Date,
      default: Date.now
   },
   country: {
      type: String,
   },
   city: {
      type: String,
   },
   state: {
      type: String,
   },
   address: {
      type: String,
   },
   birthday: {
      type: String,
   },
   DNI: {
      type: Number,
   },
   zip: {
      type: String
   },
   sent: {
      type: Boolean,
      default: false
   }
})

module.exports = mongoose.model("SoldProd", SoldProdSchema)