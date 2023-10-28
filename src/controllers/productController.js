const express = require('express');
const mysqlConnection = require('../database/database');

const getProductList = (req, res) => {
    let { Code, CatalogtypeID, Status } = req.query;
    if (Code == null){ Code = null}; if (CatalogtypeID == null){ CatalogtypeID = null};if (Status == null){ Status = null}else{encodeURIComponent(Status)};
    const productListByCategoryId_query = `Call spProductGetFiltering(${Code},${CatalogtypeID},${Status})`;
        console.log(productListByCategoryId_query)
        mysqlConnection.query(productListByCategoryId_query, (err,rows,fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        } 
    })
}

const retrieveProduct = (req,res) =>{
    const { id } = req.params;
    const productListById_query = `Call spProductGetByID(${id});`
    mysqlConnection.query(productListById_query,[ id ], (err,rows,fields) => {
        if (!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    })
}

const createProuduct = (req,res) => {
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
}

const deleteProduct = (req,res) =>{
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
}

const updateProduct = (req,res) =>{
    const { id } = req.params;
    let { Code, Name, CatalogtypeID, Status, Color, Size, Weight, Dimensions, Price } = req.body;
    const insertProduct_query = `Call spProductAddOrEdit(${id},'${Code}','${Name}', ${CatalogtypeID}, '${Status}', '${Color}','${Size}','${Weight}','${Dimensions}',${Price});`;
        mysqlConnection.query(insertProduct_query, [id, Code, Name, CatalogtypeID, Status, Color, Size, Weight, Dimensions, Price], (err,rows,fields) => {
            if (!err) {
                res.statusCode = 200;
                res.statusMessage = 'OK';
                res.json(rows[0][0]);
            } else {
                console.log(err);
            }
    })
}

module.exports = {
    getProductList,
    retrieveProduct,
    createProuduct,
    deleteProduct,
    updateProduct
}