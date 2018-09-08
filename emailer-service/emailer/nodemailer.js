const nodemailer = require('nodemailer');

const { etherealUserName, etherealUserPassword } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: etherealUserName,
    pass: etherealUserPassword,
  },
});

const testMessage = {
  to: 'shannon@shannonjohnstone.com.au <shannon@shannonjohnstone.com.au>',
  subject: 'Emailer service test - nodemailer',
  text: 'Hello World!',
  html: `
    <p>Hello in <strong>html</strong></p>
  `,
};

const sendMail = async message => {
  try {
    const response = await transporter.sendMail(message);
    console.log(response, 'response');
  } catch (e) {
    return new Error(e);
  }
};

module.exports = sendMail;
