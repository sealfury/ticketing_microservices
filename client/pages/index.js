import axios from 'axios'

const LandingPage = ({ currentUser }) => {
  console.log(currentUser)
  // axios.get('/api/users/currentuser')

  return <h1>Landing Page</h1>
}

LandingPage.getInitialProps = async () => {
  if (typeof window === 'undefined') {
    // rendering on server
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.googleCloudBuild/api/users/currentuser',
      {
        headers: {
          Host: 'ticketing.dev',
        },
      }
    )

    return data
  } else {
    // rendering in browser
    const { data } = await axios.get('/api/users/currentuser')

    return data
  }
  return {}
}

export default LandingPage

