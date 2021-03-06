
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 5004


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//Allow cors origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Routes
app.use('/api', require('./src/routes'));

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});

