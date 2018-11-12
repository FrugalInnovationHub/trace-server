/*
 * File for createing DB
 */

// Dependencies
const mysql = require('mysql');
const dbConfig = require('./dbConfig');

// Create connection with database
const connection = mysql.createConnection(dbConfig);
connection.connect((error) => {
  if(error) {
    throw error;
  }
});

let query = '';

// Create query for creating product_add_table
query = 'CREATE TABLE IF NOT EXISTS product_add_table(product_name VARCHAR(40) NOT NULL, product_id VARCHAR(20) NOT NULL PRIMARY KEY, category VARCHAR(10))';

connection.query(query, (error, result) => {
  if(error) {
    throw error;
  }
});

query = 'CREATE TABLE IF NOT EXISTS manufacturer_table(manufacturer_id VARCHAR(20) NOT NULL PRIMARY KEY, manufacturer_name VARCHAR(30) NOT NULL)';

connection.query(query, (error, result) => {
  if(error) {
    throw error;
  }
});

query = 'CREATE TABLE IF NOT EXISTS product_details_table(product_details_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, product_id VARCHAR(20) NOT NULL REFERENCES product_add_table(product_id), manufacturer_id VARCHAR(20) NOT NULL REFERENCES manufacturer_table(manufacturer_id))';

connection.query(query, (error, result) => {
  if(error) {
    throw error;
  }
});

// Disconnect connection from database
connection.end();

