const jwt = require('jsonwebtoken');

const encrypt = (payload, secret) => {
  try {
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    console.log('Generated JWT:', token);
    return token;
  } catch (err) {
    console.error('Error generating token:', err);
  }
};

const payload = { username: 'atharva', role: 'user' };
const secret = 'mySuperSecretKey';
const token = encrypt(payload, secret);

setTimeout(() => {
  try {
    const decoded = jwt.verify(token, secret);
    console.log('Token is still valid:', decoded);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.log('Token expired!');
    } else {
      console.error('Token verification failed:', err.message);
    }
  }
}, 1000);

module.exports = encrypt;