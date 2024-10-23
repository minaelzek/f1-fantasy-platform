const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function signUp(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  return generateToken(user);
}

async function logIn(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  return generateToken(user);
}

function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    throw new Error('Invalid token');
  }
}

async function googleLogIn(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  let user = await User.findOne({ email: payload.email });
  if (!user) {
    user = new User({ email: payload.email });
    await user.save();
  }
  return generateToken(user);
}

module.exports = {
  signUp,
  logIn,
  verifyToken,
  googleLogIn,
};
