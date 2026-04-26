import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Blog.scss';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';

const HelmetMeta = () => (
  <Helmet>
    <title>Dry Cleaning & Laundry Blog | Pressto India</title>
    <meta name="description" content="Tips and guides on dry cleaning and laundry care from Pressto India. Expert advice for fabric care, stain removal and garment maintenance." />
    <meta name="keywords" content="dry cleaning blog, laundry tips, garment care, Pressto India blog, fabric care guides"/>
    <link rel="canonical" href="https://www.presstoindia.com/blog/dry-cleaning-and-laundry" />
  </Helmet>
);


const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const getReadingTime = (content) => {
    if (!content) return "0 Min Read";
    
    const wordsPerMinute = 200; // avg reading speed
    const text = content.replace(/<[^>]+>/g, ""); // strip HTML tags
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return `${minutes} Min Read`;
  };

const FeaturedPost = ({ posts }) => {
  if (!posts?.length) return null;

  const post = posts[0];
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://placehold.co/1920x1080';
  const title = post.title.rendered;
  const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '');
  const date = formatDate(post.date);
  const author = post._embedded?.author?.[0]?.name || 'Admin';

  return (
    <Link to={`/blog/${post.slug}`} key={post.id} className="blog-hero rounded overflow-hidden position-relative">
      <div className="hero-img feature">
        <img src={image} alt={title} className="img-fluid" />
      </div>
      <div className="blog-title-info position-absolute z-2">
        <h3 className="main-title" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="details">{excerpt}</p>
        {
          post.tags.length > 0 && 
            <div className="tags flex justify-content-start align-items-center">
              {post.tags.map((tagId) => <span key={tagId}>Tag {tagId}</span>)}
            </div>
        }
        <div className="blog-meta">
          <div className="date flex">Date: {date}</div>
          <div className="editor flex">{getReadingTime(post.content?.rendered)}</div>
        </div>
      </div>
    </Link>
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
        <Link to={`/blog/${post.slug}`} className="row popular-row mb-4" key={post.id}>
          <div className="col4">
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
          <div className="col8">
            <div className="popular-info">
              <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div className="excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <div className="readmore">Read More</div>
              <div className="meta d-flex gap-3 mt-2">
                <div className="date">Date: {formatDate(post.date)}</div>
                <div className="views">{getReadingTime(post.content?.rendered)}</div>
              </div>
            </div>
          </div>
        </Link>
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
      <Link to={`/blog/${post.slug}`} className="blog-hero rounded overflow-hidden position-relative" key={post.id}>
        <img src={image} alt={title} className="img-fluid" />
        <div className="blog-title-info position-absolute z-2">
          <h3 className="main-title" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="details excerpt">{excerpt}</p>
          {
            post.tags.length > 0 && <div className="tags flex justify-content-start align-items-center">
                                  {post.tags.map((tagId) => <span key={tagId}>Tag {tagId}</span>)}
                                </div>
          }
          
          <div className="blog-meta">
            <div className="date flex">Date: {date}</div>
            <div className="editor flex">{getReadingTime(post.content?.rendered)}</div>
          </div>
        </div>
      </Link>
    );
  });
};

const FeaturedSkeleton = () => (
  <div className="skeletonUI mb-3 w-100" style={{ height: "650px", borderRadius: "12px" }}></div>
);

const PopularSkeleton = () => (
  <div>
    {[...Array(3)].map((_, i) => (
      <div key={i} className="d-flex gap-2 mb-3">
        <div className="skeletonUI flex-shrink-0" style={{ width: "170px", height: "170px", borderRadius: "8px" }}></div>
        <div className="flex-grow-1">
          <div className="skeletonUI mb-2" style={{ height: "15px", width: "90%" }}></div>
          <div className="skeletonUI mb-2" style={{ height: "15px", width: "70%" }}></div>
          <div className="skeletonUI" style={{ height: "15px", width: "50%" }}></div>
        </div>
      </div>
    ))}
  </div>
);

const GridSkeleton = () => (
    [...Array(3)].map((_, i) => (
      <div key={i} className="col-12 mb-3">
        <div className="skeletonUI mb-2 w-100" style={{ height: "560px", borderRadius: "12px" }}></div>
        <div className="skeletonUI mb-2" style={{ height: "15px", width: "90%" }}></div>
        <div className="skeletonUI mb-2" style={{ height: "15px", width: "60%" }}></div>
        <div className="skeletonUI" style={{ height: "15px", width: "30%" }}></div>
      </div>
    ))
);


const Blog = () => {  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://www.presstoindia.com/react-pressto-blog/wp-json/wp/v2/posts?categories=3&_embed")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog posts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="blog-container">
      <HelmetMeta />
      <div className="section-top mt-5">
        {loading ? (
          <div className="row">
            <div className="col-12 col-xl-8 latest">
              <div className="title fs-2 mb-4">Latest Posts</div>
              <FeaturedSkeleton />
            </div>
            <div className="col-12 col-xl-4 popular">
              <div className="title fs-2 mb-4">Popular Posts</div>
              <PopularSkeleton />
            </div>
            <div className="row mt-4 blog-grid-container allposts">
              <div className="grid">
                <GridSkeleton />
              </div>
            </div>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="row">
              <div className="col-12 col-xl-8 latest">
                <div className="title fs-2 mb-4">Latest Posts</div>
                <FeaturedPost posts={posts} />
              </div>
              <div className="col-12 col-xl-4 popular">
                <div className="title fs-2 mb-4">Popular Posts</div>
                <PopularPosts />
              </div>
            </div>
            <div className="row mt-4 blog-grid-container allposts">
              <div className="grid">
                <AllPosts posts={posts} />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-muted py-5 fs-4">
            No posts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
