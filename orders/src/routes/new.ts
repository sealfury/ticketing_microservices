import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@gristix/common'
import { body } from 'express-validator'

const router = express.Router()

// NB route is subtly coupled to mongodb due to validation
// Remove the custom function to remove this coupling

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({})
  }
)

export { router as newOrderRouter }
