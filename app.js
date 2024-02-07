const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

const bodyParser = require('body-parser');



// Middle ware

app.use(bodyParser.json());
//app.use(express.json())

// Import the routes
const postRoute = require('./Routes/posts');

app.use('/posts', postRoute);

// Get() -> Fetch the data, POST() -> Push the data, PATCH() -> Update the data, DELETE() -> Delete the data

// Routes
app.get('/', (req, res) => {
  res.send("I'm inside the home");
});



// connect the mongo db
 mongoose.connect(process.env.DB_CONNECTION);

console.log('connected');
// Create a listening port to the server
app.listen(3000);