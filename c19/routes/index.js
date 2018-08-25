var express = require('express');
var router = express.Router();
var data = [
  {
    id: 12345678,
    string: 'yudhis',
    integer: 25,
    float : 45.5,
    date : '09/21/2018',
    boolean : false
  },
  {
    id: 12345679,
    string: 'eful',
    integer: 27,
    float : 42.8,
    date : '06/14/2018',
    boolean : true
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('list', {data: data});
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add', function(req, res, next) {
  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let date = req.body.date;
  let boolean = req.body.boolean;
  data.push({id: Date.now(), string: string, integer: integer, float: float, date: date, boolean: boolean});
  res.redirect('/');
});

router.get('/delete/:id', function(req, res, next) {
  let id = req.params.id;
  data = data.filter(x=>x.id != id);
  res.redirect('/');
});

router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id;
  let item = data.filter(x=>x.id == id);
  //console.log(data);
  res.render('edit', {data: item});
});

router.post('/edit/:id', function(req, res, next) {
  let id = req.params.id;
  let string = req.body.string;
  let integer = req.body.integer;
  let float = req.body.float;
  let date = req.body.date;
  let boolean = req.body.boolean;
  data = data.map(function(x){
    if(x.id == id){
      x.string = string;
      x.integer = integer;
      x.float = float;
      x.date = date;
      x.boolean = boolean;
    }
    // console.log(data);
    return x;
    })
  //data.push({id: Date.now(), string: string, integer: integer, float: float, date: date, boolean: boolean});
  res.redirect('/');
});

module.exports = router;
