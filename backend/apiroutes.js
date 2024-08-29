// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// require('dotenv').config(); // To load environment variables

// const User = require('./User'); // Ensure this path is correct

// const app = express();
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000', // The frontend's origin
//   credentials: true, // Include credentials (like cookies, authorization headers) if needed
// }));

// // Signup Route
// app.post('/api/signup', async (req, res) => {
//   const { firstName, lastName, email, mobile, role, password } = req.body;
//   try {
//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ firstName, lastName, email, mobile, role, password: hashedPassword });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });



// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     console.log('User found:', user);
//     if (!user) {
//       console.error('User not found for email:', email);
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.error('Password mismatch for user:', email);
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     res.json({ token, user });
//   } catch (error) {
//     console.error('Login server error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get Users Route
// app.get('/api/users', async (req, res) => {
//   const { search, role } = req.query;
//   const query = {};
//   if (search) {
//     query.$or = [
//       { firstName: { $regex: search, $options: 'i' } },
//       { lastName: { $regex: search, $options: 'i' } },
//       { email: { $regex: search, $options: 'i' } },
//       { mobile: { $regex: search, $options: 'i' } },
//     ];
//   }
//   if (role) {
//     query.role = role;
//   }
//   try {
//     const users = await User.find(query);
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Connect to MongoDB and start the server
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.error('MongoDB connection error:', error));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./User');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, mobile, role, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = new User({ firstName, lastName, email, mobile, role, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Users Route
app.get('/api/users', async (req, res) => {
  const { search, role } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { mobile: { $regex: search, $options: 'i' } },
    ];
  }

  if (role) {
    query.role = role;
  }

  try {
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
