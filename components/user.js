/*
 * File for User handler
 */
// Dependencies
const auth = require('../helpers/auth');


// Container for User methods
const user = {};

user.signup = function(req, res) {

};

user.login = function(req, res) {
  console.log('This runs');
  const user = {
    username: 'test@medshare.com',
    passowrd: 'testpassword'
  };
  const token = auth.createToken(user);
  res.type('application/json').status(200).send({token : token});
};

// Export the module
module.exports = user;
