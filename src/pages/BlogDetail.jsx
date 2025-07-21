import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './Blog.scss';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.presstoindia.com/react-pressto-blog/wp-json/wp/v2/posts/${id}?_embed`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error('Error fetching blog detail:', error));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <div className="blog-detail-container">
      <Helmet>
        <title>{post.title.rendered} | Pressto</title>
      </Helmet>

      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      {featuredImage && <img src={featuredImage} alt={post.title.rendered} />}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
};

export default BlogDetail;
