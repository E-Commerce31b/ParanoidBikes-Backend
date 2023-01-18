require("dotenv").config();
const express = require("express");
const router = express();
const Stripe = require("stripe");
const sendMail = require("../controllers/nodemailer")
const { userModel } = require("../models");

const { API_STRIPE } = process.env;

const stripe = new Stripe(API_STRIPE);

router.post("/checkout", async (req, res) => {
  const { id, amount, email, city, adress, country } = req.body;
  try {
    const info = await userModel.findOneAndUpdate({email : email },{adress : adress, city : city, country : country})

    const payment = await stripe.paymentIntents.create({
      amount : amount,
      currency: "USD",
      description: "Bicicle",
      payment_method: id,
      confirm: true,
    });
    sendMail.sendMail(email, amount, adress, city)
    res.send({ message: "Pago exitoso" });
    console.log(id)
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
