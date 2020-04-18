var express = require('express');
var web = express();

web.get('/', function (req, res) {
  res.send('Página Home');
});

web.get('/voluntarios', function (req, res) {
  res.send('Página Voluntarios');
});

web.get('/proyectos', function (req, res) {
  res.send('Página Servicios');
});

web.get('/contacto', function (req, res) {
  res.send('Página Contacto');
});

web.listen(3000, function () {
  console.log('Proyecto funcionando en el Puerto 3000');
});