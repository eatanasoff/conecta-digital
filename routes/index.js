var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');

var url = 'mongodb://service:zxcvbnm@localhost:27018/conecta';

console.log('URL definida: ' + url);
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('Home');
  res.render('index', { title: 'Home' });
});

router.get('/index', function (req, res, next) {
  console.log('Home');
  res.render('index', { title: 'Home' });
});

router.get('/faqs', function (req, res, next) {
  res.render('faqs', { title: 'faqs' });
});

router.get('/quienes_somos', function (req, res, next) {
  res.render('quienes_somos', { title: 'quienes_somos' });
});

/* Nosotros. */
router.get('/proyectos', function (req, res, next) {
  var encuestas = [];
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('conecta');

    var query = {};
    dbo
      .collection('negocios')
      .find(query)
      .sort({ _id: -1 })
      .toArray(function (err, result) {
        if (err) throw err;
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
router.get('/proyecto/:id', function (req, res, next) {
  console.log('Entrando a proyecto');
  var o_id = new mongo.ObjectID(req.params.id);
  console.log('Id consultado: ' + req.params.id);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('conecta');
    dbo
      .collection('negocios')
      .find({ _id: o_id })
      .toArray(function (err, result) {
        if (err) throw err;
        var proyecto = result.map((i) => ({ ...i }))[0];
        db.close();
        console.log(proyecto);
        console.log('despues de cerrar DB');
        res.render('proyecto', {
          data: proyecto,
        });
      });
  }); // array : array
});

/* Servicios. */
router.get('/voluntarios', function (req, res, next) {
  res.render('voluntarios', { title: 'Voluntarios' });
});

/* Servicios. */
router.get('/ajax', function (req, res, next) {
  res.render('ajax', { title: 'Voluntarios' });
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
    mensaje: 'form_not_found',
  };
  var collection = 'other';
  var myobj = req.body;

  if (myobj.form_response) {
    if (myobj.form_response.form_id == 'mnC1wG') collection = 'voluntarios';
    else if (myobj.form_response.form_id == 'a6SYuS') collection = 'negocios';
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db('conecta');
      dbo.collection(collection).insertOne(myobj, function (err, res) {
        if (err) throw err;
        db.close();
      });
    });
    res.send(ok);
  } else {
    res.send(error);
  }
});

/* Likes */
router.post('/addlike', function (req, finalRes, next) {
  var ok = {
    error: false,
    codigo: 200,
    mensaje: 'Todo OK',
  };
  var error = {
    error: true,
    codigo: 404,
    mensaje: 'form_not_found',
  };
  var collection = 'other';
  var myobj = req.body;
  console.log(myobj);
  var o_id = new mongo.ObjectID(myobj.id);
  if (myobj.id) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db('conecta');
      // update a record in the collection
      dbo.collection('negocios').updateOne(
        // find record with name "MyServer"
        { _id: o_id },
        // increment it's property called "ran" by 1
        { $inc: { likes: 1 } },
        function (err, res) {
          if (err) throw err;
          console.log('1 document updated');
          dbo
            .collection('negocios')
            .find({ _id: o_id })
            .toArray(function (err, result) {
              if (err) throw err;
              var proyecto = result.map((i) => ({ ...i }))[0];
              db.close();
              console.log(proyecto);
              console.log('despues de cerrar DB');
              ok = proyecto;
              finalRes.send(ok);
            });
          db.close();
        }
      );
    });
  } else {
    finalRes.send(error);
  }
});

/* Likes */
router.post('/addVoluntario', function (req, finalRes, next) {
  console.log('Entrando en add voluntario');
  var ok = {
    error: false,
    codigo: 200,
    mensaje: 'Todo OK',
  };
  var error = {
    error: true,
    codigo: 404,
    mensaje: 'form_not_found',
  };
  var collection = 'other';
  var myobj = req.body;
  console.log(myobj);
  var o_id = new mongo.ObjectID(myobj.id);
  if (myobj.id) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db('conecta');
      // update a record in the collection
      dbo.collection('negocios').updateOne(
        // find record with name "MyServer"
        { _id: o_id },
        // increment it's property called "ran" by 1
        { $push: { email: myobj.email } },
        function (err, res) {
          if (err) throw err;
          console.log('1 document updated');
          finalRes.render('thanks', {
            title: 'Gracias',
          });
        }
      );
      db.close();
    });
  } else {
    finalRes.send(error);
  }
});

module.exports = router;
