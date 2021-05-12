import { Publisher, Subjects, TicketUpdatedEvent } from '@gristix/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}
