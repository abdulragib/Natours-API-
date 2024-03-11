const reviewController = require('./../controllers/reviewController');
const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router({
  mergeParams: true,
});

router.use(authController.protect);
//POST /tours/1f6fd7sdh2/reviews
//GET /tours/1f6fd7sdh2/reviews
//POST /reviews

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview,
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview,
  );

module.exports = router;
