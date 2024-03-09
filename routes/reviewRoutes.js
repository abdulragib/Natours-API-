const reviewController = require('./../controllers/reviewController');
const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router({
  mergeParams: true,
});

//POST /tours/1f6fd7sdh2/reviews
//GET /tours/1f6fd7sdh2/reviews
//POST /reviews

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
