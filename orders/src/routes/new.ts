import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import {
  NotFoundError,
  requireAuth,
  validateRequest,
  OrderStatus,
  BadRequestError,
} from '@gristix/common'
import { body } from 'express-validator'
import { Ticket } from '../models/ticket'
import { Order } from '../models/order'

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
    const { ticketId } = req.body

    // Find the ticket the user is trying to order in the db
    const ticket = await Ticket.findById(ticketId)
    if (!ticket) {
      throw new NotFoundError()
    }

    // Ensure the ticket is not already reserved
    const isReserved = await ticket.isReserved()
    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved!')
    }

    // Calculate an expiration date for the order

    // Build the order and save it to the db

    // Publish an event saying an order was created

    res.send({})
  }
)

export { router as newOrderRouter }
