import React, { useRef, useState } from "react";
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
  { type: "video", src: Gabriella, name: "Gabriella Demetriades", designation: "Fashion Designer" },
  { type: "video", src: NandiniBhalla, name: "Nandini Bhalla", designation: "Editor, Cosmopolitan India" },
  { type: "video", src: RinaDhaka, name: "Rina Dhaka", designation: "Indian Fashion Designer" },
];

const RealSlider = () => {
  const videoRefs = useRef([]);
  const swiperRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [pausedVideos, setPausedVideos] = useState({});
  const [mutedVideos, setMutedVideos] = useState({});

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);

    // Pause all videos when changing slides; do not auto-play the new slide
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        video.pause();
        video.muted = true;
        setPausedVideos((prev) => ({ ...prev, [idx]: true }));
        setMutedVideos((prev) => ({ ...prev, [idx]: true }));
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

              {/* Play button only if paused (default to paused so no autoplay) */}
              {(pausedVideos[index] ?? true) && (
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

              {/* Name and designation */}
              <div className="slider-caption">
                <div className="slider-caption-name">{item.name}</div>
                <div className="slider-caption-designation">{item.designation}</div>
              </div>
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
