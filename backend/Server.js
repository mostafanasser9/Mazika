// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';

// import signUpRoutes from './Routes/SignUp.js';
// import signInRoutes from './Routes/SignIn.js';

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173', // your Vite dev server origin
// }));

// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://mouniramir39:xu0l5wU2N6au3GNy@cluster0.ur25z14.mongodb.net/', {
//   // useNewUrlParser and useUnifiedTopology no longer required with Mongoose 6+
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/signup', signUpRoutes);
// app.use('/api/signin', signInRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// //dh s7
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';

// import signUpRoutes from './Routes/SignUp.js';
// import signInRoutes from './Routes/SignIn.js';
// import forgotPasswordRoutes from './Routes/ForgotPassword.js';
// import { sendEmail } from './util/sendEmail.js';

// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173', // Adjust this to your frontend URL
// }));

// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/signup', signUpRoutes);
// app.use('/api/signin', signInRoutes);
// app.use('/api/forgot-password', forgotPasswordRoutes); // <--- Added ForgotPassword route

// // Test email endpoint
// app.post('/api/send-test-email', async (req, res) => {
//   try {
//     await sendEmail({
//       to: req.body.to,
//       subject: 'Test Email',
//       text: 'This is a test email from server.',
//       html: '<strong>This is a test email from server.</strong>',
//     });
//     res.status(200).json({ message: 'Test email sent successfully' });
//   } catch (error) {
//     console.error('Error sending test email:', error);
//     res.status(500).json({ message: 'Failed to send test email' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import signUpRoutes from './Routes/SignUp.js';
import signInRoutes from './Routes/SignIn.js';
import forgotPasswordRoutes from './Routes/ForgotPassword.js';
import { sendEmail } from './util/sendEmail.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/signup', signUpRoutes);
app.use('/api/signin', signInRoutes);
app.use('/api/forgot-password', forgotPasswordRoutes);

app.post('/api/send-test-email', async (req, res) => {
  try {
    await sendEmail({
      to: req.body.to,
      subject: 'Test Email',
      text: 'This is a test email from server.',
      html: '<strong>This is a test email from server.</strong>',
    });
    res.status(200).json({ message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ message: 'Failed to send test email' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

