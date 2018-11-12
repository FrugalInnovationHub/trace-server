/*
 * File for droping DB tables
 */
var mysql = require('mysql');
const dbConfig = require('./dbConfig');

// Create connection with database
const connection = mysql.createConnection(dbConfig);
connection.connect((error) => {
  if(error) {
    throw error;
  }
});

const query = 'DROP TABLE IF EXISTS product_details_table, product_add_table, manufacturer_table';

connection.query(query, (error, result) => {
  if(error) {
    throw error;
  }
  console.log('this runs');
});


// Disconnect connection from database
connection.end();
