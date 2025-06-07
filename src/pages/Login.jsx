import React from 'react'
import { Helmet } from "react-helmet";

const HelmetMeta = () => {
  return (
      <Helmet>
        <title>Login Page | Login Page</title>
        <meta name="description" content="Learn more about our company and mission." />
        <meta name="keywords" content="about us, company, mission, values" />
        <link rel="canonical" href="https://www.yoursite.com" />
      </Helmet>
  )
}

const Login = () => {
  return (
    <div>
      <HelmetMeta/>
      Login
    </div>
  )
}

export default Login
