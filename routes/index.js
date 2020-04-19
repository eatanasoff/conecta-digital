var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@'+process.env.MONGO_URL+':'+process.env.MONGO_PORT+'/conecta';
console.log("URL definida: "+url)
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('Home');
  res.render('index', { title: 'Home' });
});

/* Nosotros. */
router.get('/proyectos', function (req, res, next) {
  var encuestas = [];
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('conecta');

    var query = {};
    dbo
      .collection('test')
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;

        for (var i = 0; i < 10; i++) {
          console.log(
            '-----' + result[0].form_response.definition.fields[i].title
          );
          if (result[0].form_response.answers[i].choice != undefined)
            console.log(result[0].form_response.answers[i].choice.label);
          if (result[0].form_response.answers[i].email != undefined)
            console.log(result[0].form_response.answers[i].email);
          if (result[0].form_response.answers[i].boolean != undefined)
            console.log(result[0].form_response.answers[i].boolean);
          if (result[0].form_response.answers[i].text != undefined)
            console.log(result[0].form_response.answers[i].text);
        }
        encuestas = result.map((i) => ({ ...i }));
        db.close();
        console.log(encuestas);
        console.log('despues de cerrar DB');
        res.render('proyectos', {
          title: 'Proyectos',
          data: encuestas,
        });
      });
  }); // array : array
});
/*
 */

/* Servicios. */
router.get('/voluntarios', function (req, res, next) {
  res.render('voluntarios', { title: 'Voluntarios' });
});

/* typeformwebhook */
router.post('/addresponse', function (req, res, next) {
  var ok = {
    error: false,
    codigo: 200,
    mensaje: 'Todo OK',
  };
  var error = {
    error: true,
    codigo: 404,
    mensaje: "form_not_found",
  }
  var collection = "other";
  var myobj = req.body;

  if (myobj.form_response) {
    if (myobj.form_response.form_id=="mnC1wG") collection = "voluntarios"
    else if (myobj.form_response.form_id=="a6SYuS") collection = "negocios"
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db('conecta');
        dbo.collection(collection).insertOne(myobj, function (err, res) {
          if (err) throw err;
          db.close();
        });      
    });
    res.send(ok)
  }
  else {
    res.send(error)
  }
  
});

module.exports = router;
