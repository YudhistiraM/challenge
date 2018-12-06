var express = require('express');
var router = express.Router();
var Chat = require('../models/chat')

/* GET home page. */
router.get('/', (req, res) => {
  Chat.find().then(data =>{
    res.json(data);
  }).catch(err => {
    json({ error: true, message: `something went wrong : ${err.message}`})
  })
})

router.post('/', (req, res) => {
  let data = new Chat({
    name: req.body.name,
    message: req.body.message
  })
  data.save().then(data =>{
    res.json(data)
  }).catch(err => {
    res.json({error: true,message: err.message})
  })
})

router.delete('/:id', function(req, res) {
  Chat.findByIdAndRemove(req.params.id)
  .then(data => {
    if(!data){
      res.json({error: true, message: `id : ${id} not found`})
    }else{
      res.json(data)
    }
  }).catch(err => {
    res.json({error: true, message: err.message})
  })
})

module.exports = router;
