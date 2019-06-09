const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "mydb"
});

con.connect(function(err) {
	if(err) {
		console.log(err)
	} else {
		console.log('connected');
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET add page. */
router.get('/add', function(req, res, next) {
	res.render('add', { title: 'Express' });
});

/* GET add page. */
router.post('/add', function(req, res, next) {
	console.log('post add');
	let employees = {
		name: req.body.name, 
		email: req.body.email, 
		phone: req.body.phone
	}
	let sql = "INSERT INTO members SET ?";

	con.query(sql,employees,function(err, result) {
		if(err) {
			console.log(err);
		} else {
			console.log('Record Saved');
			res.render('index', { title: 'Express' });
		}
	});
});

module.exports = router;
