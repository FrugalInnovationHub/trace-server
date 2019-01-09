// Dependencies
const user = require('./components/user');
const product = require('./components/product');

// Container for routeHandler
const routeHandler = {};

// Container for user submethods
routeHandler.user = {};

// User route-handlers
routeHandler.user.signup = user.signup;
routeHandler.user.login = user.login;

// Container for product submethods
routeHandler.product = {};

// Product route-handlers
routeHandler.product.get  = product.get;
routeHandler.product.post  = product.post;
routeHandler.product.put  = product.put;
routeHandler.product.delete  = product.delete;

routeHandler.product.test = product.test;

// Export the module
module.exports = routeHandler;