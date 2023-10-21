const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database/database');

const productList_query = 'SELECT pr.*,prc.`Color`,prc.`Size`,prc.`Size`,prc.`Weight`,prc.`Dimensions`,prc.`Price` FROM Product pr inner join productcharacteristic_ prc on pr.`ProductID` = prc.`ProductID` where pr.Status = "active";';

router.get('/product', (req, res) => {
    mysqlConnection.query(productList_query, (err,rows,fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.get('/product/:id',(req,res) =>{
    const { id } = req.params;
    const productListById_query = `SELECT pr.*,prc.Color,prc.Size,prc.Size,prc.Weight,prc.Dimensions,prc.Price FROM Product pr inner join productcharacteristic_ prc on pr.ProductID = prc.ProductID where pr.Status = "active" and pr.ProductID = ${id};`
    mysqlConnection.query(productListById_query, (err,rows,fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

/* router.get('/product',(req,res) =>{
    const { cat } = req.query;
    const productListByCategoryId_query = `SELECT pr.*,prc.Color,prc.Size,prc.Size,prc.Weight,prc.Dimensions,prc.Price FROM Product pr inner join productcharacteristic_ prc on pr.ProductID = prc.ProductID where pr.Status = "active" and pr.CatalogtypeID = ${cat};`
    mysqlConnection.query(productListByCategoryId_query, (err,rows,fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}); */

module.exports = router;