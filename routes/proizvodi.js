var express = require('express');
var router = express.Router();
var mysqlPool = require('../database')

router.get('/', async (req, res) => {
    await mysqlPool.query("SELECT DISTINCT rp.sifra_proizvoda, rp.naziv_proizvoda, rp.sifra_kategorije, rp.cijena_proizvoda, " +
        "sp.slika  from registar_proizvoda rp " +
        "left outer join slike_proizvoda sp on sp.proizvod_id = rp.sifra_proizvoda;")
        .then(data => {
            for(let i = 0; i < data[0].length; i++)
               if(data[0][i].slika !== null) data[0][i].slika = `data:image/png;base64,${data[0][i].slika.toString('base64')}`;
            return res.render('proizvodi', {rows: data});
        })
        .catch(err => console.log(err));
});

module.exports = router;


