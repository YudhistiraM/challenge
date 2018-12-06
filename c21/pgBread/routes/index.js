var express = require('express');
var router = express.Router();
var moment = require('moment');

module.exports = function(pool){

  router.get('/', function(req, res, next) {
    let url = req.url == '/' ? '/?page=1' : req.url;
    let currentPage = req.query.page || 1;
    let limit = 3;
    let offset = (currentPage - 1) * limit;

    // let sql = `SELECT Bread_id, string, integer, float, date, boolean FROM detailBread`;
    let sql = `SELECT count(*) as total FROM data`;
    // Search (tidak perlu membuat path route baru karena halaman masih sama dengan path ini)
    let params = []
    let searchingMode = false;
    if(req.query.cid && req.query.Bread_id){
      params.push(`id = ${req.query.Bread_id}`)
      searchingMode = true;
    }
    if(req.query.cstring && req.query.string){
      params.push(`stringdata Ilike '%${req.query.string}%'`)
      searchingMode = true;
    }
    if(req.query.cinteger && req.query.integer){
      params.push(`integerdata = ${req.query.integer}`)
      searchingMode = true;
    }
    if(req.query.cfloat && req.query.float){
      params.push(`floatdata = ${req.query.float}`)
      searchingMode = true;
    }
    if(req.query.cdate && req.query.sdate && req.query.edate ){
      params.push(`datedata between '${req.query.sdate}' and '${req.query.edate}'`)
      searchingMode = true;
    }
    if(req.query.cboolean && req.query.boolean){
      params.push(`booleandata = '${req.query.boolean}'`)
      searchingMode = true;
    }
    if(searchingMode){
      sql += ` where ${params.join(' and ')}`
    }

    pool.query(sql, (err, data) => {
      // console.log(data.rows[0]);
      // ".rows" digunakan karena membalikkan rows dalam postgress (Lihat Tutorial)
      let total = data.rows[0].total;
      let pages = Math.ceil(total / limit);
      sql = `SELECT * FROM data`;

      if(searchingMode){
        sql += ` where ${params.join(' and ')}`
      }
      // add pagination on sql
      sql += ` order by id limit ${limit} offset ${offset}`;
      pool.query(sql, (errdata, tabledata) => {
        if (errdata) {
          throw errdata;
        }
        //return rows;
        res.render('list', {rows: tabledata.rows, pagination: {total, pages, currentPage, limit, offset, url: url}, query: req.query, moment: moment});
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
    let sql = `INSERT INTO data (stringdata, integerdata, floatdata, datedata, booleandata) VALUES ('${string}',${integer},${float}, '${date}', '${boolean}')`;
    pool.query(sql, function(err) {
      if (err) {
        throw err;
      }
      res.redirect('/');
    })
  });

  //Get Fungsi Delete
  router.get('/delete/:id', function(req, res) {
    let B_id = req.params.id;
    let sql = `DELETE FROM data WHERE id = ${B_id}`;
    pool.query(sql, function (err){
      if (err) {
        throw err;
      }
      res.redirect('/');
    })
  });

  //Get Halaman Edit
  router.get('/edit/:id', function(req, res, next) {
    let B_id = req.params.id;
    let sql = `SELECT * FROM data`;
    pool.query(sql, [], (err, data) =>{
      if (err) {
        throw err;
      }
      // console.log(data);
      let item = data.rows.filter(x=>x.id == B_id);
      console.log(item);
      res.render('edit', {item: item, moment: moment});
    })
  });

  router.post('/edit/:id', function(req, res) {
    let B_id = req.params.id;
    let string = req.body.string;
    let integer = req.body.integer;
    let float = req.body.float;
    let date = req.body.date;
    let boolean = req.body.boolean;
    let sql = `UPDATE data SET stringdata = '${string}', integerdata = ${integer}, floatdata = ${float}, datedata = '${date}', booleandata = '${boolean}' WHERE id = '${B_id}'`;
    pool.query(sql, function(err,rows) {
      if (err) {
        throw err;
      }
    })
    res.redirect('/');
  });

  return router;
}
