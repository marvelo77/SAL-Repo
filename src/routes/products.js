const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database/database');

router.get('/product', (req, res) => {
    let { Code, CatalogtypeID, Status } = req.query;
    if (Code == null){ Code = null}; if (CatalogtypeID == null){ CatalogtypeID = null};if (Status == null){ Status = null};
    const productListByCategoryId_query = `Call spProductGetFiltering(${Code},${CatalogtypeID},${Status})`;

        mysqlConnection.query(productListByCategoryId_query, (err,rows,fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        } 
    })
});

router.get('/product/:id',(req,res) =>{
    const { id } = req.params;
    const productListById_query = `Call spProductGetByID(${id});`
    mysqlConnection.query(productListById_query,[ id ], (err,rows,fields) => {
        if (!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    })
});

router.post('/product', (req,res) => {
    let { ProductID, Code, Name, CatalogtypeID, Status, Color, Size, Weight, Dimensions, Price } = req.body;
    if (ProductID == null) {ProductID=null};
    const insertProduct_query = `Call spProductAddOrEdit(${ProductID},'${Code}','${Name}', ${CatalogtypeID}, '${Status}', '${Color}','${Size}','${Weight}','${Dimensions}',${Price});`;
        mysqlConnection.query(insertProduct_query, [ProductID, Code, Name, CatalogtypeID, Status, Color, Size, Weight, Dimensions, Price], (err,rows,fields) => {
            if (!err) {
                res.statusCode = 201;
                res.statusMessage = 'Created';
                res.json(rows[0][0]);
            } else {
                console.log(err);
            }
        })
});

router.delete('/product/:id',(req,res) =>{
    const { id } = req.params;
    const productDelById_query = `Call spProductDelByID(${id});`
    mysqlConnection.query(productDelById_query,[ id ], (err,rows,fields) => {
        if (!err) {
            res.statusCode = 204;
            res.statusMessage = 'Deleted';
            res.json();
        } else {
            console.log(err);
        }
    })
});

router.patch('/product/:id',(req,res) =>{
    const { id } = req.params;
    let { ProductID, Code, Name, CatalogtypeID, Status, Color, Size, Weight, Dimensions, Price } = req.body;
    if (ProductID == null) {ProductID=null};
    const insertProduct_query = `Call spProductAddOrEdit(${ProductID},'${Code}','${Name}', ${CatalogtypeID}, '${Status}', '${Color}','${Size}','${Weight}','${Dimensions}',${Price});`;
        mysqlConnection.query(insertProduct_query, [ProductID, Code, Name, CatalogtypeID, Status, Color, Size, Weight, Dimensions, Price], (err,rows,fields) => {
            if (!err) {
                res.statusCode = 200;
                res.statusMessage = 'OK';
                res.json(rows[0][0]);
            } else {
                console.log(err);
            }
    })
});

module.exports = router;