import { Subjects, Publisher, OrderCancelledEvent } from '@gristix/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}
