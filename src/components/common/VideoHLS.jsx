/* ---------- VideoHLS.jsx (CORRECTED)
 * This version passes the 'poster' prop and lazy-loads the HLS source ONLY when 'play' is called.
 * This resolves the thumbnail loading issue and prevents premature HLS manifest fetching.
 * -------------------------------------------------------------------------------------- */

"use client";
import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState } from "react";
import Hls from "hls.js";

const VideoHLS = forwardRef(({ src, className = "" , poster, ...props}, ref) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  // State to track if the HLS source has been loaded yet (defaults to false)
  const [isSourceLoaded, setIsSourceLoaded] = useState(false); 

  // Function to load the HLS stream into the video element
  const loadHLS = () => {
    if (isSourceLoaded || !src) return; // Don't load if already loaded or if no source exists
    
    const video = videoRef.current;
    if (!video) return;

    // Cleanup previous hls instance before starting a new one
    if (hlsRef.current) {
      try { hlsRef.current.destroy() } catch (e) {}
      hlsRef.current = null
    }

    if (video.canPlayType && video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS (Safari)
      video.src = src;
    } else if (Hls.isSupported()) {
      // hls.js for other browsers
      const hls = new Hls({ lowLatencyMode: true });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      // Fallback 
      video.src = src;
    }
    
    setIsSourceLoaded(true); // Mark as loaded so we don't try again
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        try { hlsRef.current.destroy() } catch (e) {}
        hlsRef.current = null;
      }
    };
  }, [src]);

  // Expose imperative controls to parent via ref
  useImperativeHandle(ref, () => ({
    play: async () => {
      // CRITICAL FIX: Trigger HLS loading *before* attempting to play
      loadHLS(); 

      const v = videoRef.current;
      if (!v) return Promise.reject(new Error("Video element not ready"));
      
      try {
        // play returns a promise in modern browsers
        return await v.play();
      } catch (e) {
        // Log error if play fails (often due to autoplay restrictions)
        console.warn("Video Play failed:", e);
        return Promise.reject(e);
      }
    },
    pause: () => {
      const v = videoRef.current;
      if (v) v.pause();
    },
    setCurrentTime: (t) => {
      const v = videoRef.current;
      if (v && typeof t === "number" && !Number.isNaN(t)) {
        try { v.currentTime = t } catch (e) {}
      }
    },
    currentTime: videoRef.current?.currentTime ?? 0, // Simplified getter
    // Expose `currentTime` directly to match the logic in EmblaCarousel.jsx's syncAndPlayBoth
  }), [src, isSourceLoaded]); // Depend on src and load state

  return (
    <video
      ref={videoRef}
      // CRITICAL FIX: Add the poster prop here
      poster={poster} 
      
      // Ensure 'preload' is NOT set to 'auto' or 'metadata' when lazy loading. 
      // The absence of `src` (from EmblaCarousel.jsx) handles this, but explicitly setting it 
      // or relying on the browser default (auto) could cause issues if src was provided.
      // Since we control src via the parent, and we call loadHLS on play, we're safe.
      
      controls={false} // Typically hide controls for custom control overlay
      muted
      playsInline
      loop // Added loop back as per typical use in a continuous carousel
      className={className + " pointer-events-auto"}
      {...props}
    />
  );
});

export default VideoHLS;