import { Subjects, Publisher, PaymentCreatedEvent } from '@gristix/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}
