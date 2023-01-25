const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
   text: {
   	type: String,
   	required: true,
   },
   date: {
   	type: Date,
   	default: Date.now,
   },
   author: {
   	type: mongoose.Schema.Types.ObjectId,
   	ref: 'User',
   },
   bike: {
   	type: mongoose.Schema.Types.ObjectId,
   	ref: 'Bike',
   },
	softDelete: {
		type: Boolean,
		default: false
	},
	replies: [{
		text: {
		  type: String,
		  required: true,
		},
		date: {
		  type: Date,
		  default: Date.now,
		},
		author: {
		  type: mongoose.Schema.Types.ObjectId,
		  ref: 'Admin',
		},
	 }],
});

module.exports = mongoose.model('Comment', CommentSchema);
