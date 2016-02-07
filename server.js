var express = require('express');
var app = express();
var moment = require('moment')

app.get('/:query', function(req, res) {
	var date = req.params.query;
	var unix = null;
	var natural = null;
	
	if(+date >= 0) {
		unix = +date;
        natural = moment.unix(unix).format("MMMM D, YYYY");
	}
    
    if (isNaN(+date) && moment(date, "MMMM DD, YYYY").isValid()) {
        unix = moment(date, "MMMM D, YYYY").format("X");
        natural = moment.unix(unix).format("MMMM D, YYYY");
    }

	var dateObj = { "unix": unix, "natural": date }
    res.send(JSON.stringify(dateObj))
})

app.listen(process.argv[2] || 3000)