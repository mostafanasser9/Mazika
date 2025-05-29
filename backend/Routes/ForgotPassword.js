// // Routes/ForgotPassword.js
// import express from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.js';
// import { sendEmail } from '../util/sendEmail.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here'; // same as SignIn

// router.post('/', async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required.' });
//   }

//   try {
//     // Case-insensitive search for the user by email
//     const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
//     if (!user) {
//       return res.status(404).json({ message: 'Email not found or invalid. Please check and try again.' });
//     }

//     // Generate a reset token valid for 15 minutes (you can adjust)
//     const resetToken = jwt.sign(
//       { userId: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: '15m' }
//     );

//     // Create a password reset link with the token as a query param
//     // Replace the URL below with your frontend password reset page URL
//     const resetLink = `https://yourfrontend.com/reset-password?token=${resetToken}`;

//     // Send password reset email
//     await sendEmail({
//       to: user.email,
//       subject: 'Password Reset Request',
//       text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
//       html: `<p>You requested a password reset.</p><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
//     });

//     res.status(200).json({ message: 'Password reset email sent.' });
//   } catch (err) {
//     console.error('Forgot password error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;


import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { sendEmail, addUserToContacts, triggerSingleSend } from '../util/sendEmail.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

router.post('/', async (req, res) => {
  const { email } = req.body;

  console.log('Received email for forgot password:', email);

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    // Trim and lowercase the email to match DB normalization
    const cleanEmail = email.trim().toLowerCase();

    // Case-insensitive search for user by normalized email
    const user = await User.findOne({ email: cleanEmail });

    console.log('User found:', user);

    if (!user) {
      return res.status(404).json({ message: 'Email not found or invalid. Please check and try again.' });
    }

    // Generate reset token valid for 15 minutes
    const resetToken = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Your frontend URL here
    const resetLink = `https://yourfrontend.com/reset-password?token=${resetToken}`;

    // Send reset email
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
      html: `
        <p>You requested a password reset.</p>
        <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
        <p>This link will expire in 15 minutes.</p>
      `
    });

    console.log(`Password reset email sent to ${user.email}`);

    // Optionally add user to SendGrid contacts and trigger campaign
    await addUserToContacts(user.email);
    console.log(`User ${user.email} added to SendGrid contacts`);

    await triggerSingleSend();
    console.log('Triggered Single Send campaign');

    res.status(200).json({ message: 'Password reset email sent and follow-up campaign triggered.' });

  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

export default router;
