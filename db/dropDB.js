/*
 * File for droping DB tables
 */

const dbUtils = require('./dbUtils');

 // Create query for creating product_add_table
let query = 'DROP TABLE IF EXISTS users, product_details_table, product_add_table, manufacturer_table';

dbUtils.query(query, [])
.then(function(result) {
  console.log("\x1b[32m",'Success: All table dropped.', "\x1b[37m");
})
.catch(function() {
  console.log('Error Occured in dropping table.');
});