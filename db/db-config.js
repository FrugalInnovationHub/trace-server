/*
 * Create and export database configuration variables
 */

// Dependencies
const mysql = require('mysql');

const dbConfig = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'medshare'
};

// Export the module
module.exports = dbConfig;