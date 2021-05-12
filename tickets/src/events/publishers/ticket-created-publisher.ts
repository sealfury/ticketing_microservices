import { Publisher, Subjects, TicketCreatedEvent } from '@gristix/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
