import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Volume2, VolumeX, Play, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "./RealSlider.scss";

import Gabriella from "../assets/video/Gabriella.mp4";
import NandiniBhalla from "../assets/video/Nandini-Bhalla.mp4";
import RinaDhaka from "../assets/video/Rina-Dhaka.mp4";

const mediaItems = [
  { type: "video", src: Gabriella },
  { type: "video", src: NandiniBhalla },
  { type: "video", src: RinaDhaka },
];

const RealSlider = () => {
  const videoRefs = useRef([]);
  const swiperRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [pausedVideos, setPausedVideos] = useState({});
  const [mutedVideos, setMutedVideos] = useState({});

  useEffect(() => {
    const playFirstVideo = () => {
      const firstVideo = videoRefs.current[0];
      if (firstVideo) {
        firstVideo.muted = true; 
        firstVideo.play()
          .then(() => {
            setPausedVideos({ 0: false });
            setMutedVideos({ 0: true }); 
          })
          .catch(() => {
            setPausedVideos({ 0: true });
            setMutedVideos({ 0: true });
          });
      }
    };

    const timeout = setTimeout(playFirstVideo, 100); 
    return () => clearTimeout(timeout);
  }, []);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);

    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === newIndex) {
          video.muted = false;
          video.play().catch(() => {});
          setPausedVideos((prev) => ({ ...prev, [idx]: false }));
          setMutedVideos((prev) => ({ ...prev, [idx]: false }));
        } else {
          video.pause();
          video.muted = true;
          setPausedVideos((prev) => ({ ...prev, [idx]: true }));
          setMutedVideos((prev) => ({ ...prev, [idx]: true }));
        }
      }
    });
  };

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setPausedVideos((prev) => ({ ...prev, [index]: false }));
      } else {
        video.pause();
        setPausedVideos((prev) => ({ ...prev, [index]: true }));
      }
    }
  };

  const toggleMute = (e, index) => {
    e.stopPropagation();
    const video = videoRefs.current[index];
    if (video) {
      video.muted = !video.muted;
      setMutedVideos((prev) => ({ ...prev, [index]: video.muted }));
    }
  };

  return (
    <div className="realSlider">
      <Swiper
        modules={[Navigation]}
        loop
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {mediaItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="slider-item" onClick={() => togglePlay(index)}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={item.src}
                playsInline
                loop
                muted={mutedVideos[index] ?? true} // first video muted initially
                style={{ width: "100%", height: "500px" }}
              />

              {/* Play button only if paused */}
              {pausedVideos[index] && (
                <button
                  className="play-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay(index);
                  }}
                >
                  <Play />
                </button>
              )}

              {/* Mute/unmute button */}
              <button
                className="mute-btn"
                onClick={(e) => toggleMute(e, index)}
              >
                {mutedVideos[index] ? <VolumeX /> : <Volume2 />}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Arrows */}
      <div
        className="video-slider prevArrow"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ChevronLeft />
      </div>
      <div
        className="video-slider nextArrow"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ChevronRight />
      </div>
    </div>
  );
};

export default RealSlider;
