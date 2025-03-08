const express = require('express');
const Nexmo = require('nexmo');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Initialize Nexmo with API Key and Secret
const nexmo = new Nexmo({
  apiKey: '46542529',
  apiSecret: 'sEM57eiQ3vCR8v2o',
});

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    return res.status(400).send({ error: 'Mobile number is required' });
  }

  // Generate OTP (6 digits)
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Send SMS using Nexmo
  nexmo.message.sendSms(
    'YOUR_NEXMO_PHONE_NUMBER', // Sender's number
    mobileNumber,               // Recipient's number
    `Your OTP is: ${otp}`,      // OTP message
    (error, response) => {
      if (error) {
        return res.status(500).send({ error: 'Error sending OTP' });
      }

      // Respond with success message
      return res.status(200).send({ message: 'OTP sent successfully', otp });
    }
  );
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
