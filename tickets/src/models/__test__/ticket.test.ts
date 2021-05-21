import { Ticket } from '../ticket'

it('implements optimistic concurrency control', async done => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  })

  // Save ticket to db
  await ticket.save()

  // Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id)
  const secondInstance = await Ticket.findById(ticket.id)

  // Make a change to each fetched ticket
  firstInstance!.set({ price: 10 })
  secondInstance!.set({ price: 15 })

  // Save the first fetched ticket
  await firstInstance!.save()

  // Save the second fetched ticket and expect an error
  try {
    await secondInstance!.save()
  } catch (err) {
    return done()
  }

  throw new Error('should not reach point of saving second instance')
})

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '123',
  })

  await ticket.save()
  expect(ticket.version).toEqual(0)
  await ticket.save()
  expect(ticket.version).toEqual(1)
  await ticket.save()
  expect(ticket.version).toEqual(2)
})
