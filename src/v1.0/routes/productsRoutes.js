const express = require('express');
const router = express.Router();

//Product
const productController = require ('../../controllers/productController');

router
    .get('/product', productController.getProductList)
    .get('/product/:id',productController.retrieveProduct)
    .post('/product', productController.createProuduct)
    .delete('/product/:id',productController.deleteProduct)
    .patch('/product/:id',productController.updateProduct);


module.exports = router;