const express = require('express');
const routes = express.Router();
const fs = require('fs');

//routes.use(authMiddleware);
const boletoController = require('./controllers/boletoController');

//Boleto routes
routes.get('/boleto', boletoController.index);
routes.get('/boleto/:id', boletoController.show);
routes.post('/boleto', boletoController.store);
routes.put('/boleto/:id', boletoController.update);
routes.delete('/boleto/:id', boletoController.destroy);

//Download Boleto 
routes.get('/download/:id', async (req, res) => {
  var filePath = "/../public/billets/" + req.params.id + '.pdf';
  console.log(req.params.id);
  console.log(filePath);

  fs.readFile(__dirname + filePath , function (err,data){
    res.contentType("application/pdf");
    res.send(data);
  })
});


module.exports = routes;