const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

app.use(bodyParser.json()); 
app.use(cors());

const url = "mongodb+srv://root:Shubu%40123@testing.rdqvgba.mongodb.net/SIH2023";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./models/Users'); 

const nodemailer = require('nodemailer'); 

app.post('/signup', async (req, res) => {
  try {
    const { email, password, userGroup } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ email, password, userGroup }); 
    await newUser.save();


    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/addUser', async (req, res) => {
  try {
    const { email, password, userGroup } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ email, password, userGroup }); 
    await newUser.save();


    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user: { userGroup: user.userGroup } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
