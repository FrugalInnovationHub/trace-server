// Product handler

// Container for Product methods
const product = {};

product.get = function(req, res) {
  console.log('Hello get');
  res.send('Hello Get');
};

product.post = function(req, res) {
  console.log('Hello post');
  res.send('Hello Post');
};

product.put = function(req, res) {
  console.log('Hello put');
  res.send('Hello Put');
};

product.delete = function(req, res) {
  console.log('Hello delete');
  res.send('Hello Delete');
};

// Export the module
module.exports = product;