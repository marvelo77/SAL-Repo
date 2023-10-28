const express = require('express');
const mysqlConnection = require('../database/database');

const getProductList = (req, res) => {
    let { Code, CatalogtypeID, Status } = req.query;
    if (Code == null){ Code = null}; if (CatalogtypeID == null){ CatalogtypeID = null};if (Status == null){ Status = null}else{encodeURIComponent(Status)};
    const productListByCategoryId_query = `Call spProductGetFiltering(${Code},${CatalogtypeID},${Status})`;
        console.log(productListByCategoryId_query)
        mysqlConnection.query(productListByCategoryId_query, (err,rows,fields) => {
        if (!err) {
            res.statusCode = 200;
            res.statusMessage = 'Success';
            res.json(rows[0]);
        } else {
            console.log(err);
            res.statusCode = 500;
            res.statusMessage = 'Server Error';
            res.json();
        } 
    })
}

const retrieveProduct = (req,res) =>{
    const { id } = req.params;
    const productListById_query = `Call spProductGetByID(${id});`
    mysqlConnection.query(productListById_query,[ id ], (err,rows,fields) => {
        if (!err) {
            res.statusCode = 200;
            res.statusMessage = 'Success';
            res.json(rows[0][0]);
        } else {
            console.log(err);
            res.statusCode = 500;
            res.statusMessage = 'Server Error';
            res.json();
        }
    })
}

const createProduct = (req,res) => {
    let { ProductID, Code, Name, CatalogtypeID, Status, Color, Size, Weight, Dimensions, Price } = req.body;
    if (ProductID == null) {ProductID=null};
    const insertProduct_query = `Call spProductAddOrEdit(${ProductID},'${Code}','${Name}', ${CatalogtypeID}, '${Status}', '${Color}','${Size}','${Weight}','${Dimensions}',${Price});`;
        mysqlConnection.query(insertProduct_query, [ProductID, Code, Name, CatalogtypeID, Status, Color, Size, Weight, Dimensions, Price], (err,rows,fields) => {
            if (!err) {
                if (rows.affectedRows = 1) 
                {
                    res.statusCode = 201;
                    res.statusMessage = 'Created';
                    res.json(rows[0][0]);
                } else {
                    res.statusCode = 400;
                    res.statusMessage = 'Bad Request';
                    res.json(rows);
                }
            } else {
                console.log(err);
                res.statusCode = 500;
                res.statusMessage = 'Server Error';
                res.json();
            }
        })
}

const deleteProduct = (req,res) =>{
    const { id } = req.params;
    const productDelById_query = `Call spProductDelByID(${id});`
    mysqlConnection.query(productDelById_query,[ id ], (err,rows,fields) => {
        if (!err) {
            if (rows.affectedRows == 0){
                res.statusCode = 404;
                res.statusMessage = 'Not Found';
            } else {
                res.statusCode = 204;
                res.statusMessage = 'Deleted';
            }
            res.json();
        } else {
            console.log(err);
            res.statusCode = 500;
            res.statusMessage = 'Server Error';
            res.json();
        }
    })
}

const updateProduct = (req,res) =>{
    const { id } = req.params;
    let { Code, Name, CatalogtypeID, Status, Color, Size, Weight, Dimensions, Price } = req.body;
    const insertProduct_query = `Call spProductAddOrEdit(${id},'${Code}','${Name}', ${CatalogtypeID}, '${Status}', '${Color}','${Size}','${Weight}','${Dimensions}',${Price});`;
        mysqlConnection.query(insertProduct_query, [id, Code, Name, CatalogtypeID, Status, Color, Size, Weight, Dimensions, Price], (err,rows,fields) => {
            if (!err) {
                if (rows.affectedRows == 0){
                    res.statusCode = 404;
                    res.statusMessage = 'Not Found';
                    res.json();
                } else {
                    res.statusCode = 200;
                    res.statusMessage = 'Success';
                    res.json(rows[0][0])
                }
            } else {
                console.log(err);
                res.statusCode = 500;
                res.statusMessage = 'Server Error';
                res.json();
            }
    })
}

module.exports = {
    getProductList,
    retrieveProduct,
    createProduct,
    deleteProduct,
    updateProduct
}