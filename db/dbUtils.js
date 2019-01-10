/*
 * Utility functions for sending data
 */
const mysql = require('mysql');
const dbConfig = require('./dbConfig');
const dbUtils = {};

dbUtils.query = function (currentQuery, args) {
  return new Promise(function(resolve, reject) {
    const connection = mysql.createConnection(dbConfig);
    connection.connect();
    connection.query(currentQuery, args, function(err, results) {
      if(err) {
        reject(err);
      }
      resolve(results);
    });
    connection.end();
  });
};

// Export the module
module.exports = dbUtils;