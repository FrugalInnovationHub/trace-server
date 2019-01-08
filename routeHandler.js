// Dependencies

const product = require('./components/product');

// Container for routeHandler
const routeHandler = {};

// Container for login submethods
routeHandler.login = login;

// Container for product submethods
routeHandler.product = {};

// Product route-handlers
routeHandler.product.get  = product.get;
routeHandler.product.post  = product.post;
routeHandler.product.put  = product.put;
routeHandler.product.delete  = product.delete;


// Export the module
module.exports = routeHandler;