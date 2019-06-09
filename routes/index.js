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
	const query = "SELECT * FROM members";
	con.query(query, function(err, result) {
		if(err) throw err;
		else res.render('index', {
			members: result,
			title: 'Express'
		});
	});
});

/* GET add page. */
router.get('/add', function(req, res, next) {
	res.render('add', { title: 'Express' });
});

/* POST add page. */
router.post('/add', function(req, res, next) {

	req.assert('name', 'Name cannot be blank').notEmpty();
	req.assert('email', 'Email cannot be blank').isEmail();
	req.assert('phone', 'Phone number cannot be blank').notEmpty();

	const errors = req.validationErrors();

	if(errors) {
		req.flash('errors', errors);
		return res.redirect('/');
	}

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
			res.redirect('/');
		}
	});
});

// Get Edit form
router.get('/edit/:id', function(req, res, next) {
	const query = "SELECT * FROM members WHERE id="+req.params.id;
	con.query(query, function(err, result) {
		console.log('result---', result);
		if(err) {
			console.log(err)
		} else {
			res.render('add', {
				member: result[0],
				editForm: true
			});
		}
	});
});

// Post Edit form
router.post('/edit/:id', function(req, res, next) {
	const query = 'UPDATE members SET ? WHERE id='+req.params.id;
	const employees = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone
	}

	con.query(query, employees, function(err, result) {
		if(err) {
			console.log(err);
		} else {
			console.log('Record Updated');
			res.redirect('/');
		}
	});
})

module.exports = router;
