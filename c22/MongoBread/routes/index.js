var express = require('express');
var router = express.Router();
var moment = require('moment');

module.exports = function(data){

  router.get('/', function(req, res, next) {
    let url = req.url == '/' ? '/?page=1' : req.url;
    let currentPage = req.query.page || 1;
    let limit = 3;
    let offset = (currentPage - 1) * limit;

    // let sql = `SELECT Bread_id, string, integer, float, date, boolean FROM detailBread`;
    // let sql = `SELECT count(*) as total FROM data`;
    // Search (tidak perlu membuat path route baru karena halaman masih sama dengan path ini)
    let params = {};
    if(req.query.cid && req.query.Bread_id){
      params._id = req.query.Bread_id;
    }
    if(req.query.cstring && req.query.string){
      params.stringdata = req.query.string
    }
    if(req.query.cinteger && req.query.integer){
      params.integerdata = parseInt(req.query.integer)
    }
    if(req.query.cfloat && req.query.float){
      params.floatdata = parseFloat(req.query.float)
    }
    if(req.query.cdate && req.query.sdate && req.query.edate ){
      //
    }
    if(req.query.cboolean && req.query.boolean){
      params.booleandata = JSON.parse(req.query.boolean)
    }

    data.find(params).count(function(err, total){
      let pages = Math.ceil(total / limit);
      data.find(params).limit(limit).skip(offset).toArray(function(err, docs){
        res.render('list', {rows: docs, pagination: {total, pages, currentPage, limit, offset, url: url}, query: req.query, moment: moment});
      })
    })
  });

  //Get Halaman Add
  router.get('/add', function(req, res, next) {
    res.render('add');
  });

  router.post('/add', function(req, res) {
    let string = req.body.string;
    let integer = req.body.integer;
    let float = req.body.float;
    let date = req.body.date;
    let boolean = req.body.boolean;
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("cruddb");
      var myobj = {stringdata: `${string}`, integerdata: `${integer}`, floatdata: `${float}`, datedata: `${date}`, booleandata: `${boolean}`};
      dbo.collection("data").insertOne(myobj, function(err, res) {
        if (err) throw err;

        // console.log(res);
      });
    });
    res.redirect('/');
  });

  //Get Fungsi Delete
  router.get('/delete/:_id', function(req, res) {
    let B_id = req.params._id;
    const removeDocument = function(db, callback) {
      // Get the documents collection
      const collection = db.collection('data');
      var myquery = {"_id": `ObjectId("${B_id}")`};
      // Delete document where a is 3
      collection.deleteOne(myquery, function(err, result) {
        // assert.equal(err, null);
        // assert.equal(1, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        callback(result);
      });
    }
    // var MongoClient = require('mongodb').MongoClient;
    // var url = "mongodb://localhost:27017/";
    //
    // MongoClient.connect(url, function(err, db) {
    //   if (err) throw err;
    //   var dbo = db.db("cruddb");
    //   var myquery = {"_id": `ObjectId("${B_id}")`};
    //   dbo.collection("data").deleteOne(myquery, function(err, obj) {
    //     if (err) throw err;
    //     console.log(myquery);
    //     res.redirect('/');
    //   });
    // });
    // let sql = `DELETE FROM data WHERE id = ${B_id}`;
    // pool.query(sql, function (err){
    //   if (err) {
    //     throw err;
    //   }

    // })
  });

  //
  //   //Get Halaman Edit
  //   router.get('/edit/:id', function(req, res, next) {
  //     let B_id = req.params.id;
  //     let sql = `SELECT * FROM data`;
  //     pool.query(sql, [], (err, data) =>{
  //       if (err) {
  //         throw err;
  //       }
  //       // console.log(data);
  //       let item = data.rows.filter(x=>x.id == B_id);
  //       console.log(item);
  //       res.render('edit', {item: item, moment: moment});
  //     })
  //   });
  //
  //   router.post('/edit/:id', function(req, res) {
  //     let B_id = req.params.id;
  //     let string = req.body.string;
  //     let integer = req.body.integer;
  //     let float = req.body.float;
  //     let date = req.body.date;
  //     let boolean = req.body.boolean;
  //     let sql = `UPDATE data SET stringdata = '${string}', integerdata = ${integer}, floatdata = ${float}, datedata = '${date}', booleandata = '${boolean}' WHERE id = '${B_id}'`;
  //     pool.query(sql, function(err,rows) {
  //       if (err) {
  //         throw err;
  //       }
  //     })
  //     res.redirect('/');
  //   });

  return router;
}
