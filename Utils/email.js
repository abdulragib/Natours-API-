const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1) Create a transporter
  let transporter = nodemailer.createTransport({
    service:"gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    logger: true,
    debug:true,
    secureConnection:false,
    auth: {
      user: 'abdulragib36@gmail.com',
      pass: 'lvxf qpeb yqyt xfdg',
    },
    tls:{
      rejectUnauthorized:true
    }
  });

  // Define the email options
  const mailOptions = {
    from: 'abdulragib36@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
