import React from 'react';
import { Helmet } from "react-helmet";

const HelmetMeta = () => (
  <Helmet>
    <title>Blog Page | YourSite</title>
    <meta name="description" content="Read our latest blog posts and updates about our services." />
    <meta name="keywords" content="blog, laundry tips, dry cleaning, service updates" />
    <link rel="canonical" href="https://www.yoursite.com/blog" />
  </Helmet>
);

const Blog = () => {
 

  return (
    <div className="blog-container">
      <HelmetMeta />
      <h1>Latest Blog Posts</h1>
      
    </div>
  );
};

export default Blog;
