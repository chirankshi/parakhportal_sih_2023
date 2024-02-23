const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userGroup: { type: String, default: 'user' }, // Added userGroup field with a default value
});

// Compare entered password with the stored hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;