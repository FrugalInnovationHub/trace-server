/*
 * File for Product handler
 */

// Dependencies
const dbUtils = require('../db/dbUtils');
const helper = require('../helpers/helpers');

// Container for Product methods
const product = {};

product.get = function(req, res) {
  // Product Add Table
  let query = "Select * from product_add_table";
  let productAddTable = [];

  // Manufacturer table
  let manufacturerTable = [];

  // Common table between product details table
  let productDetailsTable = [];

  dbUtils.query(query)
  .then(function(results) {
    productAddTable = results;
    query = "Select * from manufacturer_table";
    return dbUtils.query(query);
  })
  .then(function(results) {
    manufacturerTable = results;
    query = "Select * from product_details_table";
    return dbUtils.query(query);
  })
  .then(function(productDetailsTable){
    const data = helper.productOutputData(productAddTable, manufacturerTable, productDetailsTable);
    res.type('application/json').status(200).send(data);
  })
  .catch(function(err) {
    console.log('Error Occured: ', err);
    res.type('application/json').status(405).send({});
  });
};

// Product POST request
product.post = function(req, res) {
  let { productName, productNumber, category, manufacturer } = req.body;

  // Check if all required fields are present
  productName = typeof productName === 'undefined' ? false : productName;
  productNumber = typeof productNumber === 'undefined' ? false : productNumber;
  category = typeof category === 'undefined' ? false : category;
  manufacturers = Array.isArray(manufacturer) ? manufacturer : false;

  if (productName && productNumber && category && manufacturers) {
    // Insert values in product_add_table
    let query = "Insert into product_add_table (product_name, product_id, category) values (?, ?, ?)";
    let values = [productName, productNumber, category];
    dbUtils.query(query, values)
    .then(function(results){
      // Insert values in manufacturer_table
      query = "Insert into manufacturer_table (manufacturer_id, manufacturer_name) values (?, ?)";
      var manufacturersPromise = manufacturers.map((manufacturer) => {
        let { manufacturerName, manufacturerId } = manufacturer;
        values = [manufacturerId, manufacturerName];
        return dbUtils.query(query, values);
      });
      return Promise.all(manufacturersPromise);
    })
    .then(function(results) {
      // Insert values in product_details_table
      query = "Insert into product_details_table (product_id, manufacturer_id) values (?,?)";
      var manufacturersPromise = manufacturers.map((manufacturer) => {
        let { manufacturerId } = manufacturer;
        values = [productNumber, manufacturerId];
        return dbUtils.query(query, values);
      });

      return Promise.all(manufacturersPromise);
    })
    .then(function(results) {
      res.type('application/json').status(200).send({});
    })
    .catch(function(err) {
      res.type('application/json').status(500).send({'Error' : 'Internal Server Error'});
    });
  } else {
    res.type('application/json').status(422).send({'Error' : 'Missing required fields'});
  }
};

product.put = function(req, res) {
  res.type('application/json').status(405).send({});
};

product.delete = function(req, res) {
  res.type('application/json').status(405).send({});
};

// Export the module
module.exports = product;