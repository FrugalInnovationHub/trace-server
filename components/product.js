// Product handler

// Container for Product methods
const product = {};

product.get = function(req, res) {
  res.type('application/json');
  res.status(405).send({});
};

product.post = function(req, res) {
  console.log('Request : ', req.body);

  res.type('application/json');
  res.status(405).send({'Error' : 'Missing required fields'});
};

product.put = function(req, res) {
  res.type('application/json');
  res.status(405).send({});
};

product.delete = function(req, res) {
  res.type('application/json');
  res.status(405).send({});
};

// Export the module
module.exports = product;