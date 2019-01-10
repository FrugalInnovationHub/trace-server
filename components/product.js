/*
 * File for Product handler
 */

// Dependencies
const dbUtils = require('../db/dbUtils');
const helper = require('../helpers/helpers');
const auth = require('../helpers/auth');


// Container for Product methods
const product = {};


// Product getParent method for returning all the parent code
product.getParent = function(req, res) {
  auth.verifyToken(req, res, function(data) {
    // You can query the database or do what ever you want to do once you have this data
    // console.log('req body', data, '\n req token', req.token);
    let query = "Select product_name, product_id from product_add_table";
    dbUtils.query(query)
    .then(function(parentCodes){
      res.type('application/json').status(200).send(parentCodes);
    })
    .catch(function(err) {
      console.log('Error Occured: ', err);
      res.type('application/json').status(405).send({});
    });
  });
};

// Product POST request
product.post = function(req, res) {
  auth.verifyToken(req, res, function(data) {
    let { productNumber, category, manufacturer } = req.body;

    // Check if all required fields are present
    productNumber = typeof productNumber === 'undefined' ? false : productNumber;
    category = typeof category === 'undefined' ? false : category;
    manufacturers = Array.isArray(manufacturer) ? manufacturer : false;

    if (productNumber && category && manufacturers) {
      let query = "Insert into manufacturer_table (manufacturer_id, manufacturer_name) values (?, ?)";
      let manufacturersPromise = manufacturers.map((manufacturer) => {
        let { manufacturerName, manufacturerId } = manufacturer;
        values = [manufacturerId, manufacturerName];
        return dbUtils.query(query, values);
      });

      Promise.all(manufacturersPromise)
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
  });
};

// Product get methods
product.get = function(req, res) {
  auth.verifyToken(req, res, function(data) {
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

  });
};

// // Product get methods
// product.get = function(req, res) {
//   // Product Add Table
//   let query = "Select * from product_add_table";
//   let productAddTable = [];

//   // Manufacturer table
//   let manufacturerTable = [];

//   // Common table between product details table
//   let productDetailsTable = [];

//   dbUtils.query(query)
//   .then(function(results) {
//     productAddTable = results;
//     query = "Select * from manufacturer_table";
//     return dbUtils.query(query);
//   })
//   .then(function(results) {
//     manufacturerTable = results;
//     query = "Select * from product_details_table";
//     return dbUtils.query(query);
//   })
//   .then(function(productDetailsTable){
//     const data = helper.productOutputData(productAddTable, manufacturerTable, productDetailsTable);
//     res.type('application/json').status(200).send(data);
//   })
//   .catch(function(err) {
//     console.log('Error Occured: ', err);
//     res.type('application/json').status(405).send({});
//   });
// };

// Product put methods
product.put = function(req, res) {
  res.type('application/json').status(405).send({});
};

// Product delete methods
product.delete = function(req, res) {
  res.type('application/json').status(405).send({});
};


// Export the module
module.exports = product;