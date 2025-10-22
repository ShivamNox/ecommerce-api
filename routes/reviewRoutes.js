const express = require('express');
const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/product/:productId', getProductReviews);
router.post('/product/:productId', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
