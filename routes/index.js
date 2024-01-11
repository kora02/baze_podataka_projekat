var express = require('express');
const mysqlPool = require("../database");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/postzaduzenje', async (req, res) => {
  var id_v = req.body.id_v;
  var id_d = req.body.id_d;
  console.log(id_d, id_v);
  await mysqlPool.query("Insert into zaduzenje_vozila (dostavljac, vozilo) values (?, ?)", [id_d, id_v])
      .then(data => {
        res.redirect('/');
      })
      .catch(err => console.log(err));
});

module.exports = router;
