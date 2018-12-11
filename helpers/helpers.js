/*
 * Helper functions for applications
 */

const helper = {};

helper.productOutputData = function(productTable, manufacturerTable, connectionTable) {
  let formatedData = [];
  productTable.forEach(function(row) {
    const {product_name, product_id, category} = row;
    let manufacturer_id = '';
    let manufacturer_name = '';

    connectionTable.forEach((connection) => {
      if(connection.product_id === product_id) {
        manufacturer_id = connection.manufacturer_id;
        manufacturerTable.forEach((manufacturer) => {
          if(manufacturer.manufacturer_id === manufacturer_id) {
            manufacturer_name = manufacturer.manufacturer_name;
            const data = {
              product_name,
              product_id,
              category,
              manufacturer_id,
              manufacturer_name
            };
            formatedData.push(data);
          }
        });
      }
    });
  });

  return formatedData;
};

// Export the module
module.exports = helper;