import { Subjects, Publisher, ExpirationCompleteEvent } from '@gristix/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
}
