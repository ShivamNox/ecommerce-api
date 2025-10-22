const express = require('express');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  getDashboardStats
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { validateProduct } = require('../middleware/validationMiddleware');

const router = express.Router();

router.use(protect);
router.use(admin);

router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatus);
router.post('/products', validateProduct, createProduct);
router.put('/products/:id', validateProduct, updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
