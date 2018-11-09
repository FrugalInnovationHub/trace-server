var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "anujmysql",
	database: "medshare"
});

con.connect(function(err){
	if(err) throw err;

	//drop the child tables first and then the parent tables
	var dropQuery = "DROP TABLE IF EXISTS product_details_table, product_add_table, manufacturer_table";
	con.query(dropQuery, function(err, results){
		if(err) throw err;
	});
});