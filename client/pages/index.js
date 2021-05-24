const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map(ticket => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
      </tr>
    )
  })

  return (
    <div>
      <h4>
        {currentUser
          ? `Signed in as ${currentUser.email}`
          : 'You are not signed in'}
      </h4>
      <div>
        <h1>Tickets</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{ticketList}</tbody>
        </table>
      </div>
    </div>
  )
}

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets')

  return { tickets: data }
}

export default LandingPage
