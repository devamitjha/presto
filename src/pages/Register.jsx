import React from 'react';
import { Helmet } from "react-helmet";

const HelmetMeta = () => {
  return (
      <Helmet>
        <title>Register | Pressto India</title>
        <meta name="description" content="Create your Pressto India account. Register for laundry, dry cleaning and shoe care services." />
        <meta name="keywords" content="Pressto register, Pressto India sign up, create account" />
        <link rel="canonical" href="https://www.presstoindia.com/register" />
      </Helmet>
  )
}

const Register = () => {
  return (
    <div>
      <HelmetMeta/>
      Register
    </div>
  )
}

export default Register
