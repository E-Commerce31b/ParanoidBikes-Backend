require("dotenv").config();
const express = require("express");
const router = express();
const Stripe = require("stripe");
const sendMail = require("../controllers/nodemailer")

const { API_STRIPE } = process.env;

const stripe = new Stripe(API_STRIPE);

router.post("/checkout", async (req, res) => {
  const { id, amount, email } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount : amount,
      currency: "USD",
      description: "Bicicle",
      payment_method: id,
      confirm: true,
    });
    sendMail.sendMail(email, amount)
    res.send({ message: "Pago exitoso" });
    console.log(id)
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;
