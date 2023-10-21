const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database/database');

router.get('/product', (req, res) => {
    const { CatalogtypeID } = req.query;

    if (CatalogtypeID != null)
    {
    const productListByCategoryId_query = `SELECT pr.*,prc.Color,prc.Size,prc.Size,prc.Weight,prc.Dimensions,prc.Price FROM Product pr left join productcharacteristic_ prc on pr.ProductID = prc.ProductID where pr.Status = "active" and pr.CatalogtypeID = ${CatalogtypeID};`
    mysqlConnection.query(productListByCategoryId_query, (err,rows,fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        } 
    })
    } else {
        const productList_query = 'SELECT pr.*,prc.`Color`,prc.`Size`,prc.`Size`,prc.`Weight`,prc.`Dimensions`,prc.`Price` FROM Product pr left join productcharacteristic_ prc on pr.`ProductID` = prc.`ProductID` where pr.Status = "active";';

        mysqlConnection.query(productList_query, (err,rows,fields) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log(err);
            }
        })
    }
});

router.get('/product/:id',(req,res) =>{
    const { id } = req.params;
    const productListById_query = `SELECT pr.*,prc.Color,prc.Size,prc.Size,prc.Weight,prc.Dimensions,prc.Price FROM Product pr left join productcharacteristic_ prc on pr.ProductID = prc.ProductID where pr.Status = "active" and pr.ProductID = ${id};`
    mysqlConnection.query(productListById_query, (err,rows,fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.post('/product', (req,res) => {
    const { Code, Name, CatalogtypeID, Status } = req.body;
    const insertProduct_query = `
        CALL spProductAdd('${Code}','${Name}', '${CatalogtypeID}', '${Status}');
        `;
        mysqlConnection.query(insertProduct_query, [Code, Name, CatalogtypeID, Status], (err,rows,fields) => {
            if (!err) {
                res.json({Status: 'New Product!'});
            } else {
                console.log(err);
            }
        })

});

module.exports = router;