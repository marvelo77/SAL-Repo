const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database/database');

//const { rows } = require('pg/lib/defaults');

router.get('/product', (req, res) => {
    mysqlConnection.query('SELECT * FROM Product', (err,rows,fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});


module.exports = router;