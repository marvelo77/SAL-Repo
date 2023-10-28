const express = require('express');
const mysqlConnection = require('../database/database');

const getOrderList = (req, res) => {
    const order_select = 'SELECT * FROM `Order`';
    mysqlConnection.query(order_select, (err,rows,fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}

module.exports = {
    getOrderList
}