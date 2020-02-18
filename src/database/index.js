const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Teste:6NVFQjB7EIbRkliU@rankmyappteste-hkjrb.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true});
mongoose.Promise = global.Promise;
console.log('database conected');

module.exports = mongoose;