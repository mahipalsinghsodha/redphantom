const User = require("../models/user");
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js')



// Email from testing account
module.exports.signUp = async (req, res) => {

    // 1 fech data from req.body object
    const { name, email, question, message } = req.body;

    // 2-> check if the user existing in db

    // 4-> create the user
    const user = await User.create({
      name,
      email,
      question,
      message,
    });

    user.save(user)
    .then(data=>{
      res.redirect('/');
    })
    .catch(err =>{
      res.status(500).send({
        message:err.message
      });
    })

    // //5-> send response
    // return res.status(200).json({
    //   message: "user create successfully",
    //   data: {
    //     user,
    //   },
    // });
}




/** send mail from testing account */
module.exports.signTest = async (req, res) => {

    /** testing account */
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html: "<b>Successfully Register with us.</b>", // html body
    }


    transporter.sendMail(message).then((info) => {
        return res.status(201)
            .json({
                msg: "you should receive an email",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("Signup Successfully...!");
}

/** send mail from real gmail account */
module.exports.getbill = (req, res) => {

  const { userEmail } = req.body;
  console.log(userEmail);

  let config = {
      service: 'gmail',
      auth: {
          user: EMAIL,
          pass: PASSWORD
      }
  }

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
      theme: "default",
      product: {
          name: "Mailgen",
          link: 'https://mailgen.js/'
      }
  })

  let response = {
      body: {
          name: "Abhishek",
          intro: "Your bill has arrived!",
          table: {
              data: [
                  {
                      item: "Nodemailer Stack Book",
                      description: "A Backend application",
                      price: "$10.99",
                  }
              ]
          },
          outro: "Looking forward to do more business"
      }
  }

  let mail = MailGenerator.generate(response)

  let message = {
      from: EMAIL,
      to: userEmail,
      subject: "Place Order",
      html: mail
  }

  transporter.sendMail(message).then(() => {
      return res.status(201).json({
          msg: "you should receive an email"
      })
  }).catch(error => {
      return res.status(500).json({ error })
  })

  // res.status(201).json("getBill Successfully...!");
}
