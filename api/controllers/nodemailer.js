const nodemailer = require("nodemailer")

const sendMail = async (email, amount) =>{

  const config ={
    host : "smtp.gmail.com",
    port : 465,
    secure: true,
    auth : {
      user : "paranoidbikesarg@gmail.com",
      pass :  'yxoc cgsi igwk nvdf',
       },
    tls: {
      rejectUnauthorized: false
  }
  }
  const mensaje = {
    from : "paranoidbikesarg@gmail.com",
    to : email,
    subject : "Gracias por tu compra",
    text : `Tu pago por ${amount} USD se ha acreditado con éxito`


  }
const transport = nodemailer.createTransport(config)
const info = await transport.sendMail(mensaje)

}
module.exports = {
sendMail
}
