'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

const ChevronLeftSvg = ({ className = 'h-5 w-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 6L9 12L15 18"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
const ChevronRightSvg = ({ className = 'h-5 w-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 6L15 12L9 18"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const EmblaTestimonials = ({ slidesData = [], options = {} }) => {
  const slides = Array.isArray(slidesData) ? slidesData : []
  // --- Highlight helper: wraps matching phrases with brand-colored slanted bg ---
  const brandHighlight = (str, highlights = []) => {
    if (!str || !highlights?.length) return str
    // Build a safe regex from highlights
    const escapeReg = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${highlights.map(escapeReg).join('|')})`, 'gi')

    const parts = str.split(regex)
    return parts.map((part, i) => {
      const isMatch = highlights.some(
        (h) => h.toLowerCase() === part.toLowerCase()
      )
      if (!isMatch)
        return <React.Fragment key={`t-${i}`}>{part}</React.Fragment>
      return (
        <span
          key={`h-${i}`}
          className="bg-[#FAFFDA] px-1 py-0.5 rounded-sm skew-x-12 border-[0.5px] border-[#CFF000]"
          style={{ display: 'inline' }}
        >
          <span
            className="-skew-x-12 not-italic font-bold"
            style={{ display: 'inline' }}
          >
            {part}
          </span>
        </span>
      )
    })
  }

  // [[ ... ]] markup support, e.g. "... [[highlight this]] ..."
  const renderMarkedText = (str) => {
    if (typeof str !== 'string') return str
    const parts = []
    const regex = /\[\[(.+?)\]\]/g
    let lastIndex = 0
    let m
    let i = 0
    while ((m = regex.exec(str)) !== null) {
      const start = m.index
      const end = start + m[0].length
      if (start > lastIndex) parts.push(str.slice(lastIndex, start))
      parts.push(
        <span
          key={`mk-${i++}`}
          className="bg-[#FAFFDA] px-1 py-0.5 rounded-sm skew-x-12 border-[0.5px] border-[#CFF000]"
          style={{ display: 'inline' }}
        >
          <span
            className="-skew-x-12 not-italic font-bold"
            style={{ display: 'inline' }}
          >
            {m[1]}
          </span>
        </span>
      )
      lastIndex = end
    }
    if (lastIndex < str.length) parts.push(str.slice(lastIndex))
    return parts
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', ...options },
    [AutoScroll({ playOnInit: true, speed: 0.9 })]
  )

  // autoplay state & restart timer
  const restartTimerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // overflow / "more" logic
  const textRefs = useRef({})
  const [overflowMap, setOverflowMap] = useState({})
  const [expanded, setExpanded] = useState(new Set())

  // keep map length in sync
  useEffect(() => {
    // small delay to allow layout
    const id = setTimeout(() => {
      const newMap = {}
      slides.forEach((t, index) => {
        const key = `${t.id}-${index}`
        const el = textRefs.current[key]
        if (el) {
          newMap[key] = el.scrollHeight > el.clientHeight + 1
        } else {
          newMap[key] = false
        }
      })
      setOverflowMap(newMap)
    }, 50)

    return () => clearTimeout(id)
  }, [slides])

  const toggleMore = (key) => {
    setExpanded((prev) => {
      const copy = new Set(prev)
      const isClosing = copy.has(key)

      if (isClosing) {
        copy.delete(key)
        // Scroll to top when closing
        setTimeout(() => {
          const el = textRefs.current[key]
          if (el) el.scrollTop = 0
        }, 0)
      } else {
        copy.add(key)
      }
      return copy
    })
  }

  // Embla prev/next helpers: re-use plugin behavior to stop then restart
  const safeCall = (fn) => (typeof fn === 'function' ? fn() : undefined)

  const prevNext = {
    prev: () => emblaApi && emblaApi.scrollPrev && emblaApi.scrollPrev(),
    next: () => emblaApi && emblaApi.scrollNext && emblaApi.scrollNext(),
  }

  const onButtonAutoplayClick = useCallback(
    (navFn) => {
      const autoScroll = emblaApi?.plugins?.()?.autoScroll
      if (!autoScroll) {
        safeCall(navFn)
        return
      }

      const resetOrStop =
        autoScroll.options?.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop
      if (typeof resetOrStop === 'function') resetOrStop.call(autoScroll)

      safeCall(navFn)

      if (restartTimerRef.current) clearTimeout(restartTimerRef.current)
      restartTimerRef.current = setTimeout(() => {
        if (typeof autoScroll.play === 'function') {
          try {
            autoScroll.play.call(autoScroll)
          } catch (e) {}
        }
      }, 180)
    },
    [emblaApi]
  )

  // keep isPlaying in sync
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

  // restart-after-inactivity logic (drag/wheel interactions)
  useEffect(() => {
    if (!emblaApi) return
    const autoScroll = emblaApi?.plugins?.()?.autoScroll
    if (!autoScroll) return

    let restartTimer = null
    const RESTART_DELAY = 2000

    const scheduleRestart = () => {
      clearTimeout(restartTimer)
      restartTimer = setTimeout(() => {
        if (typeof autoScroll.play === 'function')
          autoScroll.play.call(autoScroll)
      }, RESTART_DELAY)
    }

    const onPointerDown = () => clearTimeout(restartTimer)
    const onInteractionEnd = () => scheduleRestart()

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

  // pause on hover (desktop)
  useEffect(() => {
    if (!emblaApi) return
    const autoScroll = emblaApi?.plugins?.()?.autoScroll
    if (!autoScroll) return
    const canHover =
      typeof window !== 'undefined' &&
      (window.matchMedia ? window.matchMedia('(hover: hover)').matches : true)
    if (!canHover) return
    const node = emblaApi.containerNode()
    if (!node) return
    const handleEnter = () =>
      autoScroll.stop && autoScroll.stop.call(autoScroll)
    const handleLeave = () =>
      autoScroll.play && autoScroll.play.call(autoScroll)
    node.addEventListener('pointerenter', handleEnter)
    node.addEventListener('pointerleave', handleLeave)
    return () => {
      node.removeEventListener('pointerenter', handleEnter)
      node.removeEventListener('pointerleave', handleLeave)
    }
  }, [emblaApi])

  // cleanup restart timer on unmount
  useEffect(
    () => () => {
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current)
        restartTimerRef.current = null
      }
    },
    []
  )

  if (!slides.length) return null

  return (
    <div className="embla">
      <div className="relative">
        {/* Left nav button (matches your classes) */}
        <button
          type="button"
          aria-label="Previous testimonials"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 
           hover:bg-gray-100 text-black 
           transition-all duration-300 rounded-full shadow-md p-2"
          onClick={() => onButtonAutoplayClick(prevNext.prev)}
        >
          <ChevronLeftSvg />
        </button>

        {/* Right nav button */}
        <button
          type="button"
          aria-label="Next testimonials"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 
           hover:bg-gray-100 text-black 
           transition-all duration-300 rounded-full shadow-md p-2"
          onClick={() => onButtonAutoplayClick(prevNext.next)}
        >
          <ChevronRightSvg />
        </button>

        {/* viewport */}
        <div className="embla__viewport overflow-hidden pb-7" ref={emblaRef}>
          <div className="embla__container flex gap-6 will-change-transform select-none items-stretch">
            {slides.map((t, index) => {
              const key = `${t.id}-${index}`
              const isOpen = expanded.has(key)
              const showMore = !!overflowMap[key]
              return (
                <div
                  key={key}
                  className="embla__slide flex flex-shrink-0 last:mr-6"
                  style={{ minWidth: '300px' }}
                >
                  <div
                    className="flex-shrink-0 max-w-[500px] md:w-[500px] w-[350px] 
                               bg-gray-100 rounded-2xl md:p-6 p-2 shadow-md 
                               border border-gray-200 text-[#0D0F11]"
                  >
                    <div className="flex justify-between gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={t.image || '/placeholder.svg'}
                          alt={t.name}
                          className="md:w-36 md:h-36 w-20 h-20 rounded-2xl object-cover"
                          loading="lazy"
                          decoding="async"
                          data-testimonial-img="1"
                        />
                      </div>

                      <div className="flex flex-col justify-between md:m-3 m-1 mt-0">
                        <div
                          ref={(el) => {
                            textRefs.current[key] = el
                          }}
                          className="text-gray-700 md:text-base text-sm font-medium 
                                     leading-relaxed mb-2 pr-2 md:h-[5.8rem] h-[5.5rem] whitespace-pre-line"
                          style={{
                            overflowY: isOpen ? 'auto' : 'hidden',
                            lineHeight: 1.5,
                          }}
                        >
                          {t?.text?.includes('[[')
                            ? renderMarkedText(t.text)
                            : Array.isArray(t.highlights) && t.highlights.length
                            ? brandHighlight(t.text, t.highlights)
                            : t.text}
                        </div>

                        {showMore && (
                          <button
                            onClick={() => toggleMore(key)}
                            className="self-start underline text-xs md:text-sm text-[#0D0F11]"
                          >
                            {isOpen ? 'less' : 'more'}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between mt-2 pt-4 border-t border-gray-100">
                      <div className="flex flex-col font-medium text-[#0D0F11]">
                        <h3 className="md:text-lg text-sm uppercase">
                          {t.name}
                        </h3>
                        <p className="text-[10px] md:text-xs">{t.company}</p>
                      </div>

                      <div className="flex justify-between gap-4">
                        {t.stats?.map((stat, statIndex) => (
                          <div
                            key={statIndex}
                            className="text-left pl-3 border-l border-gray-300"
                          >
                            <div className="md:text-xl text-sm text-gray-900 mb-1 font-light">
                              {stat.value}
                            </div>
                            <div className="md:text-[10px] text-[9px] text-gray-500 leading-tight">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaTestimonials
