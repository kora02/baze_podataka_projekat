var express = require('express');
var router = express.Router();
var mysqlPool = require('../database')

router.get('/', async (req, res) => {
    var id = req.body.id;
    await mysqlPool.query("SELECT zv.zaduzenje_vozila_id, d.ime, d.prezime, " +
        "v.tip_vozila, zv.datum_i_vrijeme_prijave, zv.datum_i_vrijeme_odjave from zaduzenje_vozila zv " +
        "inner join dostavljaci d on zv.dostavljac = d.dostavljac_id " +
        "inner join vozila v on zv.vozilo = v.vozilo_id;")
        .then(data => {
            return res.render('zaduzenja', {rows: data})
        })
        .catch(err => console.log(err));
});

module.exports = router;