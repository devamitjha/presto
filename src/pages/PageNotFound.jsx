import React from 'react'
import { Helmet } from 'react-helmet'

const PageNotFound = () => {
  return (
    <div>
      <Helmet>
        <title>Page Not Found | Pressto India</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      Not Found
    </div>
  )
}

export default PageNotFound
