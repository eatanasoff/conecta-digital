var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var url =
  'mongodb://' +
  process.env.MONGO_USER +
  ':' +
  process.env.MONGO_PASS +
  '@' +
  process.env.MONGO_URL +
  ':' +
  process.env.MONGO_PORT +
  '/conecta';

/* Nosotros. */
router.get('/', function (req, res, next) {
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
        res.render('admin_negocios', {
          title: 'Administracion Negocios',
          data: encuestas,
        });
      });
  }); // array : array
});

module.exports = router;
