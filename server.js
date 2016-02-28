'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var path = require('path');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:DATESTRING', function(req, res) {
	var dateString = req.params.DATESTRING;
	var obj = {
		"unix"   : undefined,
		"natural": undefined
	};
	
	var date = new Date(dateString);
	if(date == 'Invalid Date') {
		// not a valid date
		obj["unix"] = null;
		obj["natural"] = null;
	}
	else {
		console.log(date);
		
		// unix timestamp
		var unix = date.getTime();
		obj["unix"] = unix;
		
		// natural date
		var months = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			];
		var dateStr = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
		obj["natural"] = dateStr;
	}
	
	res.send(JSON.stringify(obj));
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});