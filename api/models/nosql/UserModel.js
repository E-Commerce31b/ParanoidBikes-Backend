const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// const mongooseDelete = require('mongoose-delete')
const bcrypt = require("bcryptjs");
const UserScheme = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
  },
  history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bike'
  }],
  type: {
    type: String,
  },
  purchased: {
    type: Array
  },
  cart: [{
    bike: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bike',
    },
    count: {
      type: Number,
      default: 0
    }
  }],
  softDelete: {
    type: Boolean,
    default: false,
  },
});

const saltRound = 10;
UserScheme.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, saltRound, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
      }
});

UserScheme.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(err, res);
    }
  });
};

module.exports = mongoose.model("User", UserScheme);
