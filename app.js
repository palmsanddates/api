require("dotenv").config();
const express = require('express')
const cookieParser = require('cookie-parser')

// Import Routes
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

// Set App Variable
const app = express()
const cors = require('cors');

// Require database configuration
const connectDB = require('./data/db')

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cors());

// Routes
app.use('/', indexRouter)
app.use('/users', usersRouter)

// Set db
const run = async () => {
  // Connect to Mongoose database. Connection code in data/db.js
  await app.listen(process.env.PORT)
  console.log(`App listening on port ${process.env.PORT}!`)
  await connectDB()
  
  
}

run()

module.exports = app

