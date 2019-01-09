/*
 * Utility functions for authorization
 */
// Dependencies
const jwt = require('jsonwebtoken');

const auth = {};

// 256 Random character secret
const secret = process.env.JWT_SECRET;

// Create function that create a jwt token
auth.createToken = function(user) {
  return jwt.sign({ username: user.email, role: 'admin'}, secret, { expiresIn: '4h' });
};

// Create function to check if token is present in request or not
// if present call next function
// else
// send error
auth.isToken = function (req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.type('application/json').status(401).send({'Error' : 'Token not found in response'});
  }
};

// Create function to verify token received
// if verified invoke the callback
// else
// respond with the provided error
auth.verifyToken = function(req, res, callback) {
  jwt.verify(req.token, secret, function(err, data) {
    if(err) {
      res.type('application/json').status(401).send({'Error' : err});
    } else {
      // If token is verified invoke callback function with data in it.
      callback(data);
    }
  });
};

// Export the module
module.exports = auth;