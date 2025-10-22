const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');

exports.createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    // Check if user has purchased the product
    const hasPurchased = await Order.findOne({
      user: req.user._id,
      'items.product': productId,
      isPaid: true
    });

    if (!hasPurchased) {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only review products you have purchased' 
      });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already reviewed this product' 
      });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      comment
    });

    await review.populate('user', 'name');

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    await review.save();
    await review.populate('user', 'name');

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }

    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    await review.deleteOne();

    res.json({
      success: true,
      message: 'Review deleted'
    });
  } catch (error) {
    next(error);
  }
};
