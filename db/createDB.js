/*
 * File for createing DB
 */

// Dependencies
const dbUtils = require('./dbUtils');

 // Create query for creating product_add_table
let query = 'CREATE TABLE IF NOT EXISTS product_add_table(product_name VARCHAR(40) NOT NULL, product_id VARCHAR(20) NOT NULL PRIMARY KEY, category VARCHAR(10))';

dbUtils.query(query, [])
.then(function(result) {
  query = 'CREATE TABLE IF NOT EXISTS manufacturer_table(manufacturer_id VARCHAR(20) NOT NULL PRIMARY KEY, manufacturer_name VARCHAR(30) NOT NULL)';
  return dbUtils.query(query, []);
})
.then(function(result) {
  query = 'CREATE TABLE IF NOT EXISTS product_details_table(product_details_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, product_id VARCHAR(20) NOT NULL REFERENCES product_add_table(product_id), manufacturer_id VARCHAR(20) NOT NULL REFERENCES manufacturer_table(manufacturer_id))';
  return dbUtils.query(query, []);
})
.catch(function() {
  console.log('Error Occurs');
});


