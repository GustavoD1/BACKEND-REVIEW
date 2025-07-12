import { check } from 'express-validator'

const create = [
  check('stars').exists().isInt({ min: 0, max: 5 }).withMessage('Stars must be an integer between 0 and 5'),
  check('body').optional().isString().withMessage('Body must be a string'),
  check('restaurantId').exists().isInt().withMessage('Restaurant ID must be an integer'),
  check('customerId').exists().isInt().withMessage('Customer ID must be an integer')
]

const update = [
  check('stars').exists().isInt({ min: 0, max: 5 }).withMessage('Stars must be an integer between 0 and 5'),
  check('body').optional().isString().withMessage('Body must be a string'),
  check('restaurantId').exists().isInt().withMessage('Restaurant ID must be an integer'),
  check('customerId').exists().isInt().withMessage('Customer ID must be an integer')
]

export { create, update }
