/*
 * File for populating Parent code in product_add_table
 * product_name
 * product_id
 * category
 * value
 */

const dbUtils = require('./dbUtils');
const fs = require('fs');
const csv = require('fast-csv');

let stream = fs.createReadStream('../../data.csv');
let myData = [];
let csvStream = csv
  .parse()
  .on("data", function (data) {
    myData.push(data);
  })
  .on("end", function () {
  myData.shift();

  let query = 'INSERT INTO product_add_table (product_name, product_id, category, value) VALUES ?';
  dbUtils.query(query,[myData])
  .then(function(result) {
    console.log('Product_add_table populated');
  })
  .catch(function(err) {
    console.log('Error occured while populating product_add_table',err);
  });
});

stream.pipe(csvStream);