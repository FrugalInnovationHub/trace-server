const fs = require('fs');
const mysql = require('mysql');
const csv = require('fast-csv');

let stream = fs.createReadStream("C:/Users/anujy/Downloads/Parent codes - Product Code Table.csv");
let myData = [];
let csvStream = csv
    .parse()
    .on("data", function (data) {
        myData.push(data);
    })
    .on("end", function () {
		myData.shift();
		
		// create a new connection to the database
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'anujmysql',
			database: 'medshare'
		});

        // open the connection
		connection.connect((error) => {
			if (error) {
				console.error(error);
			} else {
				let query = 'INSERT INTO product_add_table (product_name, product_id, category, value) VALUES ?';
				connection.query(query, [myData], (error, response) => {
					console.log(error || response);
				});
			}
		});
   	});

stream.pipe(csvStream);