import React from 'react';
import './FullWidthBackgroundVideo.scss';

export default function FullWidthBackgroundVideo({
  src,
  poster,
  type = 'video/mp4',
}) {
  return (
    <div className="video-container">
      <video
        className="video-background"
        src={src}
        type={type}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
