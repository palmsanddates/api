import AppError from './util/appError';
if (process.env.NODE_ENV !== 'production') require('dotenv-safe').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// Import Routes
const roleRouter = require('./routes/roles');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const eventRouter = require('./routes/events');

// Set App Variable
const app = express();

// Require database configuration
const connectDB = require('./data/db');

// Middleware
app.use(express.json({ limit: '25mb' }));
app.use(logger('dev', { skip: () => process.env.NODE_ENV === 'test' }));
app.use(helmet());
app.use(cors());

// Routes
app.use('/roles', roleRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/events', eventRouter);

/// //////////////////////////////////////////////////////////////////////////////////////
// If no explicit error and route requested not found
/// //////////////////////////////////////////////////////////////////////////////////////
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/// //////////////////////////////////////////////////////////////////////////////////////
// Error page for error handling
/// //////////////////////////////////////////////////////////////////////////////////////
app.use((error, req, res, next) =>
	res.status(error.statusCode || 500).json({
		message: error.message || 'Internal Server Error',
		data: error.data || null,
	}),
);

// Set db
const run = async () => {
	// Connect to Mongoose database. Connection code in data/db.js
	await app.listen(process.env.PORT);
	console.log(`App listening on port ${process.env.PORT}!`);
	await connectDB();
};

run();

module.exports = app;
