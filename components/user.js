/*
 * File for User handler
 */
// Dependencies
const bcrypt = require('bcryptjs');
const auth = require('../helpers/auth');
const dbUtils = require('../db/dbUtils');

// Container for User methods
const user = {};

user.signup = function(req, res) {
  let { email, password } = req.body;
  // Check if all required fields are present
  email = typeof email === 'undefined' ? false : email;
  password = typeof password === 'undefined' ? false : password;

  if ( email && password ) {
    let hashedPassword = bcrypt.hashSync(password, 14);
    const user = {
      email,
      password: hashedPassword
    };

    const query = "Insert into users (email, password) values (?, ?)";
    let values = [email, hashedPassword];
    dbUtils.query(query, values)
    .then(function(results){
      const token = auth.createToken(user);
      res.type('application/json').status(200).send({token : token});
    })
    .catch(function(err) {
      res.type('application/json').status(500).send({'Error' : 'DB error in signup'});
    });
  } else {
    res.type('application/json').status(422).send({'Error' : 'Missing required fields'});
  }
};

user.login = function(req, res) {
  let { email, password } = req.body;
  // Check if all required fields are present
  email = typeof email === 'undefined' ? false : email;
  password = typeof password === 'undefined' ? false : password;

  if (email && password) {
    const query = 'Select * from users where email = ?' ;
    let values = [email];
    dbUtils.query(query, values)
    .then(function(user) {
      if(bcrypt.compareSync(password, user[0].password)) {
        const user = {
          email
        };
        const token = auth.createToken(user);
        res.type('application/json').status(200).send({token : token});
      } else {
        res.type('application/json').status(422).send({'Error' : 'Invalid credentials'});
      }
    })
    .catch(function(err) {
      res.type('application/json').status(500).send({'Error' : 'Internal Server Error while Login'});
    });

  } else {
    res.type('application/json').status(422).send({'Error' : 'Missing required fields'});
  }
};

// Export the module
module.exports = user;
