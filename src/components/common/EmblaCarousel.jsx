// components/common/EmblaCarousel.jsx
'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons'
import VideoHLS from './VideoHLS'

const EmblaCarousel = ({ slidesData = [], options = {} }) => {
  const slides = Array.isArray(slidesData) ? slidesData : []
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', ...options },
    [AutoScroll({ playOnInit: true, speed: 0.9 })]
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const restartTimerRef = useRef(null)

const [visibleSlides, setVisibleSlides] = useState([0]) // State to track slides to load

useEffect(() => {
  if (!emblaApi) return

  const updateVisibleSlides = () => {
    // 1. Get the indices of the slides currently in the viewport (partially or fully)
    const inView = emblaApi.slidesInView(true)
    
    // 2. Calculate indices to load (current view + 1 adjacent slide on each side)
    const nextIndex = emblaApi.selectedScrollSnap() + 1
    const prevIndex = emblaApi.selectedScrollSnap() - 1
    
    // 3. Collect all indices to load, handling boundary/loop cases (using current slides length)
    const slidesToLoad = new Set([
      ...inView, 
      nextIndex, 
      prevIndex
    ])

    // Convert Set to Array and update state
    setVisibleSlides(Array.from(slidesToLoad).filter(index => index >= 0 && index < slides.length)) 
    // Note: The loop:true option in Embla handles wrapping indices, but here we simplify 
    // by using current index and ensuring it's within bounds [0, slides.length - 1]
  }

  // Use the 'select' and 'reInit' events to trigger the update
  emblaApi.on('select', updateVisibleSlides)
  emblaApi.on('reInit', updateVisibleSlides)
  updateVisibleSlides() // Initial call

  return () => {
    emblaApi.off('select', updateVisibleSlides)
    emblaApi.off('reInit', updateVisibleSlides)
  }
}, [emblaApi, slides.length]) // Dependency on slides.length is important if slides change
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  const safeCall = (fn) => {
    if (typeof fn === 'function') fn()
  }

  const onButtonAutoplayClick = useCallback(
    (callback) => {
      const autoScroll = emblaApi?.plugins?.()?.autoScroll
      if (!autoScroll) {
        safeCall(callback)
        return
      }

      // stop or reset (same as before)
      const resetOrStop =
        autoScroll.options?.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop

      if (typeof resetOrStop === 'function') resetOrStop.call(autoScroll)

      // call the navigation callback (prev/next)
      safeCall(callback)

      // ensure we don't stack timers
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current)

      // restart auto-scroll shortly after the nav action
      restartTimerRef.current = setTimeout(() => {
        if (typeof autoScroll.play === 'function') {
          try {
            autoScroll.play.call(autoScroll)
          } catch (e) {
            /* fail silently */
          }
        }
      }, 180) // small delay: 120-300ms works well
    },
    [emblaApi]
  )

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins?.()?.autoScroll
    if (!autoScroll) return
    const fn = autoScroll.isPlaying() ? autoScroll.stop : autoScroll.play
    if (typeof fn === 'function') fn.call(autoScroll)
  }, [emblaApi])

  useEffect(() => {
    const autoScroll = emblaApi?.plugins?.()?.autoScroll
    if (!autoScroll) return

    setIsPlaying(Boolean(autoScroll.isPlaying && autoScroll.isPlaying()))
    const onPlay = () => setIsPlaying(true)
    const onStop = () => setIsPlaying(false)

    emblaApi.on?.('autoScroll:play', onPlay)
    emblaApi.on?.('autoScroll:stop', onStop)
    emblaApi.on?.('reInit', () =>
      setIsPlaying(Boolean(autoScroll.isPlaying && autoScroll.isPlaying()))
    )

    return () => {
      emblaApi.off?.('autoScroll:play', onPlay)
      emblaApi.off?.('autoScroll:stop', onStop)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const autoScroll = emblaApi?.plugins?.()?.autoScroll
    if (!autoScroll) return

    let restartTimer = null
    const RESTART_DELAY = 2000 // ms

    const scheduleRestart = () => {
      clearTimeout(restartTimer)
      restartTimer = setTimeout(() => {
        if (typeof autoScroll.play === 'function')
          autoScroll.play.call(autoScroll)
      }, RESTART_DELAY)
    }

    // When user starts interacting (drag/pointer/wheel) we clear any restart timer
    const onPointerDown = () => {
      clearTimeout(restartTimer)
      // plugin likely already stopped (if stopOnInteraction=true)
    }

    const onInteractionEnd = () => {
      // schedule restart after inactivity
      scheduleRestart()
    }

    // DOM events for direct pointer/wheel interactions
    const containerNode = emblaApi.containerNode()
    containerNode.addEventListener('pointerdown', onPointerDown)
    containerNode.addEventListener('pointerup', onInteractionEnd)
    containerNode.addEventListener('touchstart', onPointerDown)
    containerNode.addEventListener('touchend', onInteractionEnd)
    containerNode.addEventListener(
      'wheel',
      () => {
        clearTimeout(restartTimer)
        scheduleRestart()
      },
      { passive: true }
    )

    // Embla events (dragStart/dragEnd) — more accurate for embla interactions
    emblaApi.on?.('dragStart', onPointerDown)
    emblaApi.on?.('dragEnd', onInteractionEnd)
    emblaApi.on?.('pointerUp', onInteractionEnd)

    return () => {
      clearTimeout(restartTimer)
      containerNode.removeEventListener('pointerdown', onPointerDown)
      containerNode.removeEventListener('pointerup', onInteractionEnd)
      containerNode.removeEventListener('touchstart', onPointerDown)
      containerNode.removeEventListener('touchend', onInteractionEnd)
      containerNode.removeEventListener('wheel', scheduleRestart)
      emblaApi.off?.('dragStart', onPointerDown)
      emblaApi.off?.('dragEnd', onInteractionEnd)
      emblaApi.off?.('pointerUp', onInteractionEnd)
    }
  }, [emblaApi])
  // Robust pause-on-hover (replace your current hover effect with this)
  useEffect(() => {
    if (!emblaApi) return
    const autoScroll = emblaApi?.plugins?.()?.autoScroll
    if (!autoScroll) return

    // Detect if the device actually supports hover (better than checking touch only)
    const canHover =
      typeof window !== 'undefined' &&
      (window.matchMedia ? window.matchMedia('(hover: hover)').matches : true)
    if (!canHover) return // skip for devices without hover

    // Prefer the viewport node (more consistent); fallback to containerNode()
    const viewportNode = emblaRef?.current || emblaApi.containerNode()
    if (!viewportNode) return

    const handleEnter = () => {
      if (typeof autoScroll.stop === 'function') {
        try {
          autoScroll.stop.call(autoScroll)
        } catch (e) {}
      }
    }
    const handleLeave = () => {
      if (typeof autoScroll.play === 'function') {
        try {
          autoScroll.play.call(autoScroll)
        } catch (e) {}
      }
    }

    // Use pointerenter/leave for best consistency (doesn't bubble)
    viewportNode.addEventListener('pointerenter', handleEnter)
    viewportNode.addEventListener('pointerleave', handleLeave)

    // debug: uncomment to verify the node and hover detection in console
    // console.log('Hover effect attached to', viewportNode, 'canHover=', canHover)

    return () => {
      viewportNode.removeEventListener('pointerenter', handleEnter)
      viewportNode.removeEventListener('pointerleave', handleLeave)
    }
  }, [emblaApi, emblaRef])

  useEffect(() => {
    return () => {
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current)
        restartTimerRef.current = null
      }
    }
  }, [])
  const videoRefs = useRef([])

  useEffect(() => {
    // ensure refs array matches slides length and keep existing refs
    videoRefs.current = slides.map((_, i) => {
      const existing = videoRefs.current[i]
      return {
        before: existing?.before ?? React.createRef(),
        after: existing?.after ?? React.createRef(),
      }
    })
  }, [slides])

  // per-slide playing map
  const [playingMap, setPlayingMap] = useState(() =>
    new Array(slides.length).fill(false)
  )

  useEffect(() => {
    // keep playingMap in sync when slides change
    setPlayingMap((prev) => {
      const next = new Array(slides.length).fill(false)
      for (let i = 0; i < Math.min(prev.length, next.length); i++)
        next[i] = prev[i]
      return next
    })
  }, [slides.length])

  const setPlayingForIndex = (idx, val) =>
    setPlayingMap((prev) => {
      const copy = prev.slice()
      copy[idx] = val
      return copy
    })

  const syncAndPlayBoth = async (idx) => {
    const refs = videoRefs.current[idx]
    if (!refs) return
    const b = refs.before.current
    const a = refs.after.current
    if (!b || !a) return

    try {
      // try to align currentTime if possible (best-effort)
      try {
        const t = Math.max(b.currentTime || 0, a.currentTime || 0)
        b.currentTime = t
        a.currentTime = t
      } catch (e) {
        // ignore if not allowed yet
      }

      await Promise.allSettled([b.play?.(), a.play?.()])
      setPlayingForIndex(idx, true)
    } catch (err) {
      console.warn('Play both failed', err)
    }
  }

  const pauseBoth = (idx) => {
    const refs = videoRefs.current[idx]
    if (!refs) return
    refs.before.current?.pause?.()
    refs.after.current?.pause?.()
    setPlayingForIndex(idx, false)
  }

  const togglePlayFor = (idx) => {
    if (playingMap[idx]) pauseBoth(idx)
    else syncAndPlayBoth(idx)
  }

  if (!slides.length) return null

  return (
    <div className="embla">
      <div className="relative">
        {/* viewport */}
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex">
            {slides.map((item, idx) => {
  const refs = videoRefs.current[idx] || {}
  // This is the core lazy-loading check: only load video source if the slide is near/in view.
  const isLoaded = visibleSlides.includes(idx)

  return (
    <div
      className="embla__slide flex-shrink-0 p-0"
      key={item?.id ?? idx}
      style={{ minWidth: '300px' }}
    >
      <div className="flex-shrink-0 w-[300px] sm:w-[420px] md:w-[450px] bg-[#1e1e1e] rounded-2xl p-4 flex gap-3 mr-6 relative">
        
        {/* LEFT video (Before) */}
        <div className="relative w-1/2 overflow-hidden rounded-xl">
          <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-black text-xs font-medium shadow-md">
            <span>✦</span>
            <span>Before</span>
          </span>

          <VideoHLS
            ref={refs?.before}
            // Video Source: Only passed if the slide is considered 'loaded' (visible/near)
            src={isLoaded ? item?.before : undefined} 
            // Poster Image: Passed always to display the thumbnail immediately
            poster={item?.beforePoster} 
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* RIGHT video (After) */}
        <div className="relative w-1/2 overflow-hidden rounded-xl">
          <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfff00] text-black text-xs font-medium shadow-md">
            <span>✦</span>
            <span>After</span>
          </span>

          <VideoHLS
            ref={refs?.after}
            // Video Source: Only passed if the slide is considered 'loaded' (visible/near)
            src={isLoaded ? item?.after : undefined}
            // Poster Image: Passed always to display the thumbnail immediately
            poster={item?.afterPoster}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Overlay play/pause controlling BOTH videos in this slide */}
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()} // IMPORTANT: prevent embla drag start
          onClick={() => togglePlayFor(idx)}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 bg-[var(--color-primary)] bg-opacity-60 text-white rounded-full p-3 flex items-center justify-center pointer-events-auto"
          aria-pressed={Boolean(playingMap[idx])}
        >
          {playingMap[idx] ? (
            /* pause icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zm7 0a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            /* play icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 4.5v11l9-5.5-9-5.5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
})}
          </div>
        </div>

        {/* absolute left/right buttons — now positioned relative to the wrapper above */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20">
          <PrevButton
            onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
        </div>

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20">
          <NextButton
            onClick={() => onButtonAutoplayClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>
      </div>

      {/* small bottom play/pause */}
      {/* <div className="mt-4 flex justify-center">
    <button
      className="embla__play px-3 py-2 rounded bg-gray-800 text-white"
      onClick={toggleAutoplay}
      type="button"
    >
      {isPlaying ? 'Stop' : 'Start'}
    </button>
  </div> */}
    </div>
  )
}

export default EmblaCarousel
