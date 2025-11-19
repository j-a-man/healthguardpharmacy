// Run this file by typing: node test-email.js
const nodemailer = require('nodemailer');

async function main() {
  console.log("1. Starting Test...");

  // Create the transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'jaylinman4@gmail.com', 
      // MAKE SURE THIS APP PASSWORD IS CORRECT (NO SPACES)
      pass: 'wtyckhujotshrcab' 
    }
  });

  // Verify connection
  try {
    console.log("2. Verifying connection to Gmail...");
    await transporter.verify();
    console.log("✅ Connection Successful!");
  } catch (err) {
    console.error("❌ Connection Failed:", err.message);
    console.log("Tip: Check if your App Password is correct or if Antivirus is blocking Node.js");
    return;
  }

  // Send test email
  try {
    console.log("3. Sending test email...");
    const info = await transporter.sendMail({
      from: 'jaylinman4@gmail.com',
      to: 'jaylinman4@gmail.com', // Sending to yourself
      subject: 'Test Email from Node.js',
      text: 'If you see this, your email code is working perfectly.',
    });
    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("⚠️ CHECK YOUR 'SENT' FOLDER AND 'SPAM' FOLDER NOW ⚠️");
  } catch (err) {
    console.error("❌ Sending Failed:", err.message);
  }
}

main();