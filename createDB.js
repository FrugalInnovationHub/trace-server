var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "anujmysql",
	database: "medshare"
});

con.connect(function(err){
	if(err) throw err;
	var createQuery = "CREATE TABLE IF NOT EXISTS product_add_table(product_name VARCHAR(40) NOT NULL, product_id VARCHAR(20) NOT NULL PRIMARY KEY, category VARCHAR(10))";
	con.query(createQuery, function(err, result){
		if(err) throw err;
	});
	createQuery = "CREATE TABLE IF NOT EXISTS manufacturer_table(manufacturer_id VARCHAR(20) NOT NULL PRIMARY KEY, manufacturer_name VARCHAR(30) NOT NULL)";
	con.query(createQuery, function(err, result){
		if(err) throw err;
	});
	createQuery = "CREATE TABLE IF NOT EXISTS product_details_table(product_details_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, product_id VARCHAR(20) NOT NULL REFERENCES product_add_table(product_id), manufacturer_id VARCHAR(20) NOT NULL REFERENCES manufacturer_table(manufacturer_id))"
	con.query(createQuery, function(err, result){
		if(err) throw err;
	});
});

