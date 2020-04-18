var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://user:password@localhost:27017/conecta';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

/* Nosotros. */
router.get('/proyectos', function (req, res, next) {
  // query mongo
  res.render('proyectos', { title: 'Proyectos' }); // array : array
});

/* Servicios. */
router.get('/voluntarios', function (req, res, next) {
  res.render('voluntarios', { title: 'Voluntarios' });
});

/* typeformwebhook */
router.post('/addresponse', function (req, res, next) {
  //console.log(JSON.stringify(req.body));
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('conecta');
    var myobj = req.body;
    dbo.collection('test').insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log('1 document inserted');
      db.close();
    });
  });
  respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'Todo OK',
  };
  res.send(respuesta);
});

module.exports = router;
