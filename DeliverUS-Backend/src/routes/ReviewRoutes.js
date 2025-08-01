import ReviewController from '../controllers/ReviewController.js'
import * as ReviewValidation from '../controllers/validation/ReviewValidation.js'
import { isLoggedIn, hasRole } from '../middlewares/AuthMiddleware.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import { checkEntityExists } from '../middlewares/EntityMiddleware.js'
import { Restaurant, Review } from '../models/models.js'
import { userHasPlacedOrderInRestaurant, checkReviewOwnership, checkReviewBelongsToRestaurant, checkCustomerHasNotReviewed } from '../middlewares/ReviewMiddleware.js'

const loadReviewRoutes = function (app) {
  app.route('/restaurants/:restaurantId/reviews')
    .get(
      checkEntityExists(Restaurant, 'restaurantId'),
      ReviewController.index)
    .post(
      isLoggedIn,
      hasRole('customer'),
      checkEntityExists(Restaurant, 'restaurantId'),
      userHasPlacedOrderInRestaurant,
      checkCustomerHasNotReviewed,
      ReviewValidation.create,
      handleValidation,
      ReviewController.create
    )

  app.route('/restaurants/:restaurantId/reviews/:reviewId')
    .put(
      isLoggedIn,
      hasRole('customer'),
      checkReviewOwnership,
      checkEntityExists(Review, 'reviewId'),
      checkEntityExists(Restaurant, 'restaurantId'),
      checkReviewBelongsToRestaurant,
      ReviewValidation.update,
      handleValidation,
      ReviewController.update
    )
    .delete(
      isLoggedIn,
      hasRole('customer'),
      checkReviewOwnership,
      checkEntityExists(Review, 'reviewId'),
      checkEntityExists(Restaurant, 'restaurantId'),
      checkReviewBelongsToRestaurant,
      ReviewController.destroy
    )
}

export default loadReviewRoutes
