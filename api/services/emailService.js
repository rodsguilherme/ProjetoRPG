const nodemailer = require('nodemailer')
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "05ef82153707a9",
      pass: "753b225094b020"
    }
  });
const url = 'http://localhost:8080/login'
const mailOptions = {
    from: `"Guilherme Rodrigues" <rodsguilherme@gmail.com>`,
    to: 'wkdozegui@gmail.com',
    subject: "teste",
    html: `Confirme o email: <a href='${url}'>${url}</a>`
}

transport.sendMail(mailOptions, (err, info) => {
    if(err) {
        console.log(err)
    }
    else console.log("Email enviado com sucesso!")
})