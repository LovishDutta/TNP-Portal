const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Use real credentials if provided in env, else mock
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log(`[MOCK EMAIL] Sending email to ${options.to}`);
    console.log(`[MOCK EMAIL] Subject: ${options.subject}`);
    console.log(`[MOCK EMAIL] Text: ${options.text}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Change if using another service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
