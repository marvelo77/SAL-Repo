const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database/database');

//const { rows } = require('pg/lib/defaults');

router.get('/order', (req, res) => {
    mysqlConnection.query('select o.*,poi.ProductorderitemID,poi.Action,poi.Status,pr.Code,pr.Name,pr.Price,pr.Tax,pr.Validfor_startdatetime, pr.Validfor_enddatetime from saldbd.order o inner join saldbd.Productorderitem poi on o.OrderID = poi.OrderID inner join saldbd.productofferingprice pr on pr.ProductorderitemID = poi.ProductorderitemID', (err,rows,fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});


module.exports = router;