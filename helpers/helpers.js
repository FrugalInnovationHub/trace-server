/*
 * Helper functions for applications
 */

const helper = {};

helper.productOutputData = function(productTable, manufacturerTable, connectionTable) {
  let formatedData = [];
  productTable.forEach(function(row) {
    const {product_name, product_id, value} = row;
    let manufacturer_id = '';
    let manufacturer_name = '';
    let id = '';
    let image = ''

    connectionTable.forEach((connection) => {
      if(connection.product_id === product_id) {
        image = connection.image;
        manufacturer_id = connection.manufacturer_id;
        manufacturerTable.forEach((manufacturer) => {
          if(manufacturer.manufacturer_id === manufacturer_id) {
            id = connection.product_details_id;
            manufacturer_name = manufacturer.manufacturer_name;
            const data = {
              id,
              product_name,
              product_id,
              value,
              manufacturer_id,
              manufacturer_name,
              image
            };
            formatedData.push(data);
          }
        });
      }
    });
  });

  return formatedData.reverse(function(a,b) {
    return a.id - b.id;
  });
};

// Export the module
module.exports = helper;