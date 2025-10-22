const express = require('express');
const {
  getAllProducts,
  getProductById,
  getFeaturedProducts
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

module.exports = router;
