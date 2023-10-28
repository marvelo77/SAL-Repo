const express = require('express');
const mysqlConnection = require('../database/database');

const getCategoryList = (req, res) => {
    mysqlConnection.query('SELECT * FROM Category', (err,rows,fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}

module.exports = {
    getCategoryList
}