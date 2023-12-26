const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');

//2) Routes handlers
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
  
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
