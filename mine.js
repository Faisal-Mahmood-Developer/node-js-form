const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer Transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'faisalmahmood3737@gmail.com', // Your email address
    pass: 'pdei uffg yffk vfzt'         // Your App Password
  }
});

// API endpoint to handle email sending
app.post('/send-email', (req, res) => {
  const { recipient, subject, message } = req.body;

  // Validate recipient email
  if (!recipient || !subject || !message) {
    return res.status(400).json({ message: 'All fields (recipient, subject, and message) are required.' });
  }

  const mailOptions = {
    from: recipient,
    to: 'faisalmahmood3737@gmail.com', // Use the recipient provided in the form
    subject: subject,
    text: message
  };

  // Send the email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return res.status(500).json({ message: 'Error sending email' });
    } else {
      return res.status(200).json({ message: 'Email sent: ' + info.response });
    }
  });
});

// Serve the HTML form (frontend)
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
