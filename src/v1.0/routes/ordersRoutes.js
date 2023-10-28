const express = require('express');
const router = express.Router();

const orderController = require('../../controllers/orderController')

router.get('/order', orderController.getOrderList);

module.exports = router;