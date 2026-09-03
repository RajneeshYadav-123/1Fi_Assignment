const express = require('express');
const { getProducts, getProductBySlug, createProduct } = require('../controllers/productController');

const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/:slug').get(getProductBySlug);

module.exports = router;
