import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import './Blog.scss';

const HelmetMeta = () => (
  <Helmet>
    <title>Blog Page | Pressto</title>
    <meta name="description" content="Read our latest blog posts and updates about our services." />
    <meta name="keywords" content="blog, laundry tips, dry cleaning, service updates" />
    <link rel="canonical" href="https://www.presstoindia.com/blog" />
  </Helmet>
);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://www.presstoindia.com/react-pressto-blog/wp-json/wp/v2/posts?_embed')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
      });
  }, []);

  return (
    <div className="blog-container">
      <HelmetMeta />
      <h1>Latest Blog Posts</h1>

      <div className="post-list">
        {posts.map((post) => {
          const featuredImage =
            post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

          return (
            <div key={post.id} className="post-card" onClick={() => navigate(`/blog/${post.id}`)}
            style={{ cursor: 'pointer' }}>
              {featuredImage && (
                <img
                  className="post-image"
                  src={featuredImage}
                  alt={post.title.rendered}
                />
              )}
              <h2
                className="post-title"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div
                className="post-excerpt"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
