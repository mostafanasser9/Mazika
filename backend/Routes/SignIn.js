// import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.js';


// const router = express.Router();

// const JWT_SECRET = 'your_jwt_secret_key_here'; // In production, load from process.env.JWT_SECRET

// router.post('/', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password.' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password.' });
//     }

//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     console.error('Signin error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;



import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { sendEmail } from '../util/sendEmail.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Optional: delay for 500ms to slow down brute force
      await new Promise(r => setTimeout(r, 500));
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await new Promise(r => setTimeout(r, 500));
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send login notification email (optional)
    sendEmail({
      to: user.email,
      subject: 'Login Successful',
      text: 'You have successfully logged in to your account.',
      html: '<strong>You have successfully logged in to your account.</strong>',
    }).catch(error => {
      console.error('Error sending login email:', error);
    });

    // Respond with success and some user info (exclude sensitive data)
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || '', // if you have name field
      }
    });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;

