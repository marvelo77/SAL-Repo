const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database/database');

//const { rows } = require('pg/lib/defaults');

router.get('/category', (req, res) => {
    mysqlConnection.query('SELECT * FROM Category', (err,rows,fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});


module.exports = router;