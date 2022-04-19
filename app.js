const express = require('express');
const ExpressError = require('./expressError');
const morgan = require('morgan');
const itemRoutes = require('./routes/items');

const app = express();

app.use(morgan('dev'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204)); // responds with 204 "no content" if browser requests favicon
app.use(express.json());
app.use('/items', itemRoutes);

// If no other route matches, respond with a 404
app.use((req, res, next) => {
	const e = new ExpressError('Page Not Found', 404);
	next(e);
});

// Error handler
app.use(function (err, req, res, next) {
	// the default status is 500 Internal Server Error
	let status = err.status || 500;
	let message = err.msg;

	// set the status and alert the user
	return res.status(status).json({
		error: { message, status },
	});
});

app.listen(3000, function () {
	console.log('Server starting on port 3000');
});

module.exports = app;
