
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5001

// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// set up a rule that says requests to "/math" should be handled by the
// handleMath function below
app.get('/', function (req, res) {
    res.render('pages/index')
  });

app.post('/getRate', urlencodedParser, calculateRate);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});

function calculateRate(req, res) {
    var weight = req.body["weight"];
    var type = req.body["type"];
    var zone = req.body["zone"];
    let result = {};
    if (type == "LettersStamped") {
        if (weight == 1) {result = {price: "0.55"};}
        if (weight == 2) {result = {price: "0.70"};}
        if (weight == 3) {result = {price: "0.85"};}
        if (weight > 3.5) {result = {price: "1.00"};}
    }

    if (type == "LettersMetered") {
        if (weight == 1) {result = {price: "0.50"};}
        if (weight == 2) {result = {price: "0.65"};}
        if (weight == 3) {result = {price: "0.80"};}
        if (weight > 3.5) {result = {price: "0.95"};}
    }

    if (type == "LargeEnvelopes") {
        if (weight == 1) {result = {price: "1.00"};}
        if (weight == 2) {result = {price: "1.15"};}
        if (weight == 3) {result = {price: "1.30"};}
        if (weight == 4) {result = {price: "1.45"};}
        if (weight == 5) {result = {price: "1.60"};}
        if (weight == 6) {result = {price: "1.75"};}
        if (weight == 7) {result = {price: "1.90"};}
        if (weight == 8) {result = {price: "2.05"};}
        if (weight == 9) {result = {price: "2.20"};}
        if (weight == 10) {result = {price: "2.35"};}
        if (weight == 11) {result = {price: "2.50"};}
        if (weight == 12) {result = {price: "2.65"};}
        if (weight == 13) {result = {price: "2.80"};}
    }

    if (type == "First-Class") {
        if (weight <= 4) {
            if (zone == 1) {result = {price: "3.66"};}
            if (zone == 3) {result = {price: "3.70"};}
            if (zone == 4) {result = {price: "3.74"};}
            if (zone == 5) {result = {price: "3.78"};}
            if (zone == 6) {result = {price: "3.82"};}
            if (zone == 7) {result = {price: "3.94"};}
            if (zone == 8) {result = {price: "4.06"};}
            if (zone == 9) {result = {price: "4.06"};}
        }
        if (weight > 4 <= 8) {
            if (zone == 1) {result = {price: "4.39"};}
            if (zone == 3) {result = {price: "4.44"};}
            if (zone == 4) {result = {price: "4.49"};}
            if (zone == 5) {result = {price: "4.53"};}
            if (zone == 6) {result = {price: "4.57"};}
            if (zone == 7) {result = {price: "4.69"};}
            if (zone == 8) {result = {price: "4.81"};}
            if (zone == 9) {result = {price: "4.81"};}
        }
        
        if (weight > 8 <= 12) {
            if (zone == 1) {result = {price: "5.19"};}
            if (zone == 3) {result = {price: "5.24"};}
            if (zone == 4) {result = {price: "5.30"};}
            if (zone == 5) {result = {price: "5.35"};}
            if (zone == 6) {result = {price: "5.40"};}
            if (zone == 7) {result = {price: "5.53"};}
            if (zone == 8) {result = {price: "5.66"};}
            if (zone == 9) {result = {price: "5.66"};}
        }
        
        if (weight > 12) {
            if (zone == 1) {result = {price: "5.71"};}
            if (zone == 3) {result = {price: "5.78"};}
            if (zone == 4) {result = {price: "5.85"};}
            if (zone == 5) {result = {price: "5.93"};}
            if (zone == 6) {result = {price: "5.99"};}
            if (zone == 7) {result = {price: "6.13"};}
            if (zone == 8) {result = {price: "6.27"};}
            if (zone == 9) {result = {price: "6.27"};}
        }  
    }
    res.render('pages/result', result)
}
