import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const FeaturedPost = ({ posts }) => {
  if (!posts?.length) return null;

  const post = posts[0];
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://placehold.co/1920x1080';
  const title = post.title.rendered;
  const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '');
  const date = formatDate(post.date);
  const author = post._embedded?.author?.[0]?.name || 'Admin';

  return (
    <div key={post.id} className="blog-hero rounded overflow-hidden position-relative">
      <img src={image} alt={title} className="img-fluid" />
      <div className="blog-title-info position-absolute z-2">
        <h3 className="main-title" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="details">{excerpt}</p>
        <div className="tags flex justify-content-start align-items-center">
          {post.tags.length ? post.tags.map((tagId) => <span key={tagId}>Tag {tagId}</span>) : <span>No Tags</span>}
        </div>
        <div className="blog-meta">
          <div className="date flex">Date: {date}</div>
          <div className="editor flex">Written By: {author}</div>
        </div>
      </div>
    </div>
  );
};

const PopularPosts = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    axios
      .get('https://www.presstoindia.com/react-pressto-blog/wp-json/wp/v2/posts?categories=3&per_page=3&_embed')
      .then((res) => {
        const sorted = res.data.sort((a, b) => (b.views || 0) - (a.views || 0));
        setPopular(sorted);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="popular-container">
      {popular.map((post) => (
        <div className="row popular-row mb-4" key={post.id}>
          <div className="col-4">
            <div className="popular-img-thumb">
              <img
                src={
                  post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.thumbnail?.source_url ||
                  'https://placehold.co/300x300'
                }
                alt={post.title.rendered}
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-8">
            <div className="popular-info">
              <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div className="excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <div className="readmore">Read More</div>
              <div className="meta d-flex gap-3 mt-2">
                <div className="date">Date: {formatDate(post.date)}</div>
                <div className="views">Views: {post.views || 0}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AllPosts = ({ posts }) => {
  if (!posts || posts.length <= 1) return null;

  return posts.slice(1).map((post) => {
    const image = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url || 'https://placehold.co/300x300'
    const title = post.title.rendered;
    const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '');
    const date = formatDate(post.date);
    const author = post._embedded?.author?.[0]?.name || 'Admin';

    return (
      <div className="blog-hero rounded overflow-hidden position-relative" key={post.id}>
        <img src={image} alt={title} className="img-fluid" />
        <div className="blog-title-info position-absolute z-2">
          <h3 className="main-title" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="details excerpt">{excerpt}</p>
          {
            post.tags.length > 0 && <div className="tags flex justify-content-start align-items-center">
                                  {post.tags.length && post.tags.map((tagId) => <span key={tagId}>Tag {tagId}</span>)}
                                </div>
          }
          
          <div className="blog-meta">
            <div className="date flex">Date: {date}</div>
            <div className="editor flex">Written By: {author}</div>
          </div>
        </div>
      </div>
    );
  });
};

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('https://www.presstoindia.com/react-pressto-blog/wp-json/wp/v2/posts?categories=3&_embed')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Error fetching blog posts:', err));
  }, []);

  return (
    <div className="blog-container">
      <HelmetMeta />
      <div className="section-top mt-5">
        <div className="row">
          <div className="col-12 col-xl-8">
            <div className="title fs-2 mb-4">Latest Posts</div>
            <FeaturedPost posts={posts} />
          </div>
          <div className="col-12 col-xl-4">
            <div className="title fs-2 mb-4">Popular Posts</div>
            <PopularPosts />
          </div>
        </div>
        <div className="row mt-4 blog-grid-container">
          <div className="grid">
            <AllPosts posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
