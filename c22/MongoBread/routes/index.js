var express = require('express');
var router = express.Router();
var moment = require('moment');
var objectId = require('mongodb').ObjectId;

module.exports = function(data){

  router.get('/', function(req, res, next) {
    let url = req.url == '/' ? '/?page=1' : req.url;
    let currentPage = req.query.page || 1;
    let limit = 3;
    let offset = (currentPage - 1) * limit;
    
    let params = {};
    if(req.query.cid && req.query._id){
      params._id = objectId(req.query._id);
    }

    if(req.query.cstring && req.query.string){
      // db.data.find({"stringdata": {$regex: "ac", $options: "$i"}});
      // db.data.find({"stringdata": /Achmad angri/i});
      params.stringdata = {$regex: req.query.string, $options: "$i"}
    }

    if(req.query.cinteger && req.query.integer){
      params.integerdata = req.query.integer
      //parseInt() --> dihilangkan
    }

    if(req.query.cfloat && req.query.float){
      params.floatdata = req.query.float
      //parseFloat() --> dihilangkan
    }

    if(req.query.cdate && req.query.sdate && req.query.edate ){
      // db.data.find({$and : [{datedata: {$gt: "2018-03-13"}}, {datedata: {$lt: "2018-09-17"}}]});
      params.datedata = { $gte: req.query.sdate, $lte: req.query.edate }
    }

    if(req.query.cboolean && req.query.boolean){
      params.booleandata = req.query.boolean
      // JSON.parse() --> dihilagkan
    }

    data.find(params).count(function(err, total){
      //console.log(params);
      let pages = Math.ceil(total / limit);
      data.find(params).limit(limit).skip(offset).toArray(function(err, docs){
        console.log(params);
        // console.log(docs);
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

    var myobj = {stringdata: `${string}`, integerdata: `${integer}`, floatdata: `${float}`, datedata: `${date}`, booleandata: `${boolean}`};
    data.insertOne(myobj, function(err, res) {
      if (err) throw err;
      // console.log(res);
    });
    res.redirect('/');
  });

  //Get Fungsi Delete
  router.get('/delete/:_id', function(req, res) {
    let B_id = req.params._id;

    data.deleteOne({"_id": objectId(B_id)}, function(err, obj) {
      if (err) throw err;
      // console.log(myquery);
      res.redirect('/');
    });
  });

  //Get Halaman Edit
  router.get('/edit/:_id', function(req, res, next) {
    let B_id = req.params._id;
    data.find(objectId(B_id)).toArray(function(err, docs){

      res.render('edit', {item: docs});
      // console.log(docs);
    })
  });

  router.post('/edit/:_id', function(req, res) {
    let B_id = req.params._id;
    let item =
    {
      stringdata : req.body.string,
      integerdata : req.body.integer,
      floatdata : req.body.float,
      datedata : req.body.date,
      booleandata : req.body.boolean
    };

    var myquery = {"_id": objectId(B_id)};
    var newvalues = { $set: item };
    data.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
    });

    res.redirect('/');
  });

  return router;
}
