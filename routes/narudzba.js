var express = require('express');
var router = express.Router();
var mysqlPool = require('../database')

router.post('/', async (req, res) => {
    var id = req.body.id;
    await mysqlPool.query("SELECT rn.narudzba_id, sz.status as statusz, so.status as statuso  from registar_narudzbi rn " +
        "left outer join zaduzenja z ON rn.zaduzenje_id = z.zaduzenje_id " +
        "left outer join otpremljene_narudzbe on2 ON z.otpremanje_narudzbe  = on2.otp_narudzba_id " +
        "left outer join statusi_zaduzenja sz ON z.status_zaduzenja = sz.status_zaduzenja_id " +
        "left outer join statusi_otpremljenih so ON on2.status_id = so.status_otpremljenih_id " +
        "WHERE (rn.narudzba_id = ?);", id)
        .then(data => {
            var str;
            if(data[0].length === 0) str = 'Trazena narudzba ne postoji!';
            else if(data[0][0].statuso === null && data[0][0].statusz === null)
                str = 'Narudzba nije jos proslijedjena nekom objektu!'
            else if(data[0][0].statuso !== null) str = data[0][0].statuso;
            else str = data[0][0].statusz;
            res.send(str);

        })
        .catch(err => console.log(err));
});

module.exports = router;