const nodemailer = require('nodemailer')
var transport = nodemailer.createTransport({
    port: 587,
    service: 'gmail',
    auth: 
    {
      user: 'rodsguilherme@gmail.com',
      pass: 'triplex@99'
    }
  });
  const emailSend = async (email, username) => {
    const mailOptions = {
        from: `"Guilherme Rodrigues" <rodsguilherme@gmail.com>`,
        to: `${email}`,
        subject: `Olá, ${username}`,
        html: `<strong>Mandamos esse email para agradacer o cadastro :)</strong>`
    }
    
    transport.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err)
        }
        else console.log("Email enviado com sucesso!")
    })
    }
  module.exports = {emailSend}