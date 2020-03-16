// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require ('./server/config/database') 

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
console.log('connection to the database ' + config.database);
})

// On Connection Error
mongoose.connection.on('error', (err) => {
  console.log('Database Connection Error : ' + err);
  })

const app = express();


// PORT Number
const port = 3000;

// CORS Middleware
app.use(cors());


app.use(express.static(path.join(__dirname, 'dist/eab-app')))

// BODYPARSER Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);

const users = require('./server/routes/users')
app.use('/users', users)

// Index Route
app.get('/', (req,res) =>{
  res.send("Invalid endpoiont")
})

// Start Server
app.listen(port, () =>{
  console.log("server started on port" + port);
})

