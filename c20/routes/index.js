var express = require('express');
var router = express.Router();
var moment = require('moment');

//connect to database sqlite
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('bread.db');

/* GET home page. & search */
router.get('/', function(req, res, next) {
  let url = req.url == '/' ? '/?page=1' : req.url;
  let currentPage = req.query.page || 1;
  let limit = 3;
  let offset = (currentPage - 1) * limit;

  let sql = `SELECT count(*) as total FROM detailBread`;
  // Search (tidak perlu membuat path route baru karena halaman masih sama dengan path ini)
  let params = []
  let searchingMode = false;
  if(req.query.cid && req.query.Bread_id){
    params.push(`Bread_id = ${req.query.Bread_id}`)
    searchingMode = true;
  }
  if(req.query.cstring && req.query.string){
    params.push(`string like '%${req.query.string}%'`)
    searchingMode = true;
  }
  if(req.query.cinteger && req.query.integer){
    params.push(`integer = ${req.query.integer}`)
    searchingMode = true;
  }
  if(req.query.cfloat && req.query.float){
    params.push(`float = ${req.query.float}`)
    searchingMode = true;
  }
  if(req.query.cdate && req.query.sdate && req.query.edate ){
    params.push(`date between '${req.query.sdate}' and '${req.query.edate}'`)
    searchingMode = true;
  }
  if(req.query.cboolean && req.query.boolean){
    params.push(`boolean = '${req.query.boolean}'`)
    searchingMode = true;
  }
  if(searchingMode){
    sql += ` where ${params.join(' and ')}`
  }

  db.all(sql, (err, data) => {
    let total = data[0].total;
    let pages = Math.ceil(total / limit);
    sql = `SELECT Bread_id, string, integer, float, date, boolean FROM detailBread`;

    if(searchingMode){
      sql += ` where ${params.join(' and ')}`
    }
    // add pagination on sql
    sql += ` order by Bread_id limit ${limit} offset ${offset}`;
    db.all(sql, (errdata, rows) => {
      if (errdata) {
        throw errdata;
      }
      //return rows;
      res.render('list', {rows: rows, pagination: {total, pages, currentPage, limit, offset, url: url}, query: req.query, moment: moment});
      // console.log(rows);
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
  let sql = `INSERT INTO detailBread (string, integer, float, date, boolean) VALUES ('${string}',${integer},${float}, '${date}', '${boolean}')`;
  db.run(sql, function(err) {
    if (err) {
      throw err;
    }
    res.redirect('/');
  })
});

//Get Fungsi Delete
router.get('/delete/:Bread_id', function(req, res) {
  let B_id = req.params.Bread_id;
  let sql = `DELETE FROM detailBread WHERE Bread_id = ${B_id}`;
  db.run(sql, function (err){
    if (err) {
      throw err;
    }
    res.redirect('/');
  })
});

//Get Halaman Edit
router.get('/edit/:Bread_id', function(req, res, next) {
  let B_id = req.params.Bread_id;
  let sql = `SELECT * FROM detailBread`;
  db.all(sql, [], (err, rows) =>{
    if (err) {
      throw err;
    }
    console.log(rows);
    let item = rows.filter(x=>x.Bread_id == B_id);
    //console.log(data);
    res.render('edit', {item: item, moment: moment});
  })
});

router.post('/edit/:Bread_id', function(req, res) {
  let B_id = req.params.Bread_id;
  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let date = req.body.date;
  let boolean = req.body.boolean;
  let sql = `UPDATE detailBread SET string = '${string}', integer = ${integer}, float = ${float}, date = '${date}', boolean = '${boolean}' WHERE Bread_id = '${B_id}'`;
  db.run(sql, function(err,rows) {
    if (err) {
      throw err;
    }
  })
  res.redirect('/');
});

module.exports = router;
