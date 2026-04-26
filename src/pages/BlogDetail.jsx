import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Helmet } from "react-helmet";
import {useNavigate} from 'react-router';
import Heading from '../components/common/Heading';
import {useDispatch } from "react-redux";
import { setOpenBookNow } from "../redux/slices/sheetSlice";
import "./BlogDetail.scss";
import SixColumnlayoutCenter from '../components/SixColumnlayoutCenter';
import axios from 'axios';


//experience
import { Button } from '../components/common/Button';
import { Image } from '@imagekit/react';

const getReadingTime = (content) => {
  if (!content) return "0 Min Read";
  
  const wordsPerMinute = 200; // avg reading speed
  const text = content.replace(/<[^>]+>/g, ""); // strip HTML tags
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return `${minutes} Min Read`;
};

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};
const FeaturedSkeleton = () => (
    <div className="blog-detail-container mb-3">
      <div className="skeletonUI mb-3 w-100" style={{ height: "400px", borderRadius: "12px" }}></div>
      <div className="mb-2">
        <div className="skeletonUI mb-2" style={{ height: "10px", width: "90%" }}></div>
        <div className="skeletonUI mb-2" style={{ height: "10px", width: "70%" }}></div>
        <div className="skeletonUI" style={{ height: "10px", width: "50%" }}></div>
      </div>
    </div>
);

const BlogDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const [post, setPost] = useState(null);


  const goToStoretPage = () => {
        //data layer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "blog_details_locate_store_btn_click",
            event_type:"redirection_to_store"
        });
      navigate('/store');
  };
  const goToBookNowPage = () => {
      //data layer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
          event: "blog_details_pickup_btn_click",
          event_type:"book_now_popup_open"
      });
      dispatch(setOpenBookNow(true));
  }; 
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://www.presstoindia.com/react-pressto-blog/wp-json/wp/v2/posts?slug=${slug}&_embed`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setPost(response.data[0]);
        } else {
          setPost(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog detail:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="blogDetails">
        <FeaturedSkeleton />
      </div>
    );
  }

  if (!post) {
    return <p className="text-center">Blog not found</p>;
  }

  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="blogDetails">
      <Helmet>
        <title>{post.title.rendered} | Pressto</title>
        <meta name="description" content={ post.yoast_head_json?.description || post.excerpt?.rendered.replace(/<[^>]+>/g, "") || "Discover premium garment care tips, luxury fabric guides & expert cleaning advice."}/>
        <meta 
          name="keywords" 
          content="luxury garment care tips, premium fabric care guides, expert cleaning advice, luxury clothing maintenance, designer garment care, premium care specialists, artisan expertise, luxury fabric guides, high-end garment tips" 
        />
        <link 
          rel="canonical" 
          href={`https://www.presstoindia.com/blog/${post.slug}`}
        />
      </Helmet>
      <div className="blog-detail-container">
            <div className="meta-header">
              <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div className="meta">
                <span>Last Updated: {formatDate(post.modified)}</span>
                <span>{getReadingTime(post.content?.rendered)}</span>
              </div>
              {
                featuredImage &&  <div className="main-blog-img">
                    <img src={featuredImage} alt={post.title.rendered} />
                  </div>
              }  
            </div>     
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />        
      </div> 
      <div className="section-container luxaryExperience mb-120">
        <Heading title="Experience Pressto" />
        <div className="section-luxaryExperience-item">
          <div className="exp-item">
            <h3 className="only-mobile">Locate Store Near you</h3>
            <div className="img-container">
              <Image
                urlEndpoint="https://www.presstoindia.com/media/"
                src="exp-6.jpg"
                width={416}
                height={416}
                alt="exp6"
              />
            </div>
            <div className="exp-content">
              <h3 className="only-desktop">Locate Store Near you</h3>
              <p>Find your nearest Pressto and step into effortless, premium care</p>
               <div className="btn btn-md base-btn secondary overflowHidden" onClick={goToStoretPage}>Find Now</div>
            </div>
          </div>
          <div className="exp-item">
            <h3 className="only-mobile pickme">Pickup & Drop</h3>
            <div className="img-container">
              <Image
                urlEndpoint="https://www.presstoindia.com/media/"
                src="exp-7.jpg"
                width={416}
                height={416}
                alt="exp7"
              />
            </div>
            <div className="exp-content">
              <h3 className="only-desktop">Pickup & Drop</h3>
              <p>Schedule a pickup and let premium care come to you.</p>
               <div className="btn btn-md base-btn secondary overflowHidden" onClick={goToBookNowPage}>Book an Appointment</div>
            </div>
          </div>
        </div>
      </div>
      <SixColumnlayoutCenter image={["whatwedo1.jpeg", "whatwedo2.jpg"]}/>
    </div>
  )
}

export default BlogDetail
