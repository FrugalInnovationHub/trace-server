var mysql = require('mysql');
var express = require('express');
const bodyparser = require('body-parser')
const app = express();

app.use(bodyparser.urlencoded({extended: false}))


app.get("/", function(req, res) {
	res.send("Hello from server")
})

app.post('/add', function(req, res) {
	const id = req.body.id;
	const name = req.body.name;
	getConnected().query("INSERT IGNORE INTO demo_table(demo_id, demo_name) VALUES(?, ?)", [id, name], function(err, results, fields){
		if (err) {
			throw err
			return
		}
		console.log("Inserted");
		res.end();
	})
})

function getConnected() {
	return mysql.createConnection({
		host: "localhost",
  		user: "root",
  		password: "anujmysql",
  		database: 'medshare'
  	})
}



app.listen(3003, function(req, res){
	console.log("Server is up and listening on port 3003")
});