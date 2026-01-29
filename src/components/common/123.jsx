'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const images = [
  'https://dsqrstudio.b-cdn.net/Home-page/123/061780c5664329f83d61fadcb765573947ebc977.png?w=800&format=webp&quality=75',
  'https://dsqrstudio.b-cdn.net/Home-page/123/2ee7eff48c6e6734d335428432f4a0965a50894e.png?w=800&format=webp&quality=75',
  'https://dsqrstudio.b-cdn.net/Home-page/123/5e8c962a01ee616271366e1acdba49859744fb21.png?w=800&format=webp&quality=75',
  'https://dsqrstudio.b-cdn.net/Home-page/123/64061c7faea6a130e4ec88d8a356e950e99bacf4.png?w=800&format=webp&quality=75',
  'https://dsqrstudio.b-cdn.net/Home-page/123/7c056c3328239e4c7d0cab746b62529a510e991f.png?w=800&format=webp&quality=75',
  'https://dsqrstudio.b-cdn.net/Home-page/123/aab63ab841a54061f2856c3e930de006656fe5d3.png?w=800&format=webp&quality=75',
  'https://dsqrstudio.b-cdn.net/Home-page/123/ac97621c8c5708204e4ae9633df1bf198ce82b8a.png?w=800&format=webp&quality=75',
]

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => {
      setMatches(media.matches)
    }
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

const AnimatedSection = () => {
  const [clipPath, setClipPath] = useState('inset(-100vmax)')
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 80,
  })

  const isMobile = useMediaQuery('(max-width: 768px)')

  // const desktopHeadlineOpacity = useTransform(
  //   scrollYProgressSpring,
  //   [0, 0.6],
  //   [1, 0]
  // )
  // const desktopHeadlineY = useTransform(
  //   scrollYProgressSpring,
  //   [0, 0.6],
  //   [0, -100]
  // )

  // const headlineOpacity = isMobile ? 1 : desktopHeadlineOpacity
  // const headlineY = isMobile ? 0 : desktopHeadlineY

  const number1Opacity = useTransform(
    scrollYProgressSpring,
    [0, 0.25, 0.35],
    [1, 1, 0]
  )
  const number2Opacity = useTransform(
    scrollYProgressSpring,
    [0.25, 0.35, 0.5, 0.6],
    [0, 1, 1, 0]
  )
  const number3Opacity = useTransform(
    scrollYProgressSpring,
    [0.5, 0.6, 1],
    [0, 1, 1]
  )

  const number1Y = useTransform(scrollYProgressSpring, [0.25, 0.35], [0, -50])
  const number2Y = useTransform(
    scrollYProgressSpring,
    [0.25, 0.35, 0.5, 0.6],
    [50, 0, 0, -50]
  )
  const number3Y = useTransform(scrollYProgressSpring, [0.5, 0.6], [50, 0])
  const color1 = useTransform(
    scrollYProgress,
    [0.15, 0.3],
    ['rgb(0 0 0)', 'rgb(0 0 0)']
  )

  const color2 = useTransform(
    scrollYProgressSpring,
    [0.3, 0.5, 0.7],
    ['rgb(0 0 0)', 'rgb(0 0 0)', 'rgb(0 0 0)']
  )

  const color3 = useTransform(
    scrollYProgressSpring,
    [0.7, 0.85, 1],
    ['rgb(0 0 0)', 'rgb(0 0 0)', 'rgb(0 0 0)']
  )

  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1366
  const viewportHeight =
    typeof window !== 'undefined' ? window.innerHeight : 900

  const VIEWPORT_HEIGHT_750 = 750
  const VIEWPORT_HEIGHT_850 = 850
  const VIEWPORT_HEIGHT_DEFAULT = 900 // Your existing default for > 850

  const adjustedViewportHeight =
    viewportHeight <= 750
      ? VIEWPORT_HEIGHT_750
      : viewportHeight <= 850
      ? VIEWPORT_HEIGHT_850
      : VIEWPORT_HEIGHT_DEFAULT
      
  const headerUiOpacity = useTransform(
    scrollYProgressSpring,
    [0.81, 0.88],
    [0, 1]
  )
  const headerUiY = useTransform(scrollYProgressSpring, [0.81, 0.88], [40, 0])

  const headerClipPath = useTransform(
    scrollYProgressSpring,
    [0.81, 0.88],
    [
      'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      'polygon(80% 0%, 85% 40%, 100% 40%, 100% 100%, 0 100%, 0% 60%, 0 0)',
    ]
  )

  const finalScale = isMobile ? 0.5 : 0.62
  const finalImageWidth = 220 * finalScale
  const finalImageHeight = 300 * finalScale
  const gridGap = isMobile ? 4 : 12
  const gridCols = 3
  const gridRows = 2

  const containerWidth = gridCols * finalImageWidth + (gridCols - 1) * gridGap
  const containerHeight = isMobile
    ? finalImageHeight + gridGap + finalImageHeight * 0.6
    : finalImageHeight + gridGap + finalImageHeight * 0.7

  const finalRightOffset = isMobile ? 18 : 270
  const offsetFromHeight = Math.round(viewportHeight * 0.14)

  const bottomOffsetVh = (offsetFromHeight / viewportHeight) * 100

  const extraLiftVh =
    viewportHeight < 700
      ? -2
      : viewportHeight < 800
      ? 3
      : viewportHeight < 900
      ? 2
      : 0
  const mobileVerticalLiftVh = isMobile ? 8 : 0

  const finalBottomOffsetVh =
    bottomOffsetVh + extraLiftVh + mobileVerticalLiftVh

  const containerTop = useTransform(
    scrollYProgressSpring,
    [0, 0.5, 0.8],
    [
      '50%',
      '50%',
      `calc(100vh - ${containerHeight}px - ${finalBottomOffsetVh}vh)`,
    ]
  )

  const containerLeft = useTransform(
    scrollYProgressSpring,
    [0, 0.5, 0.8],
    ['50%', '50%', `calc(100% - ${containerWidth}px - ${finalRightOffset}px)`]
  )
  const containerTranslateX = useTransform(
    scrollYProgressSpring,
    [0, 0.5, 0.8],
    ['-50%', '-50%', '0%']
  )
  const containerTranslateY = useTransform(
    scrollYProgressSpring,
    [0, 0.5, 0.8],
    ['-50%', '-50%', '0%']
  )

  const containerBackgroundColor = useTransform(
    scrollYProgressSpring,
    [0.81, 0.88],
    ['rgba(0, 0, 0, 0)', 'rgb(0, 0, 0)']
  )

  const desktopEarlyScale = !isMobile && viewportWidth > 1024 ? 1.15 : 1.0

  const shortHeightFactor = viewportHeight < 800 ? 0.85 : 1.0

  const imageTransforms = images.map((_, i) => {
    const finalStackedY = (i - (images.length - 1) / 2) * -8
    const finalStackedRotate = (i - (images.length - 1) / 2) * -6

    const mobileSpreadFactorX = isMobile ? 120 : 120

    const spreadFinalX = (i - (images.length - 1) / 2) * mobileSpreadFactorX
    const mobileSpreadOffsetY = isMobile ? 70 : 0

    const spreadFinalY =
      (i - (images.length - 1) / 2) * 60 + mobileSpreadOffsetY
    let gridFinalX = 0
    let gridFinalY = 0

    const startX = -containerWidth / 2 + finalImageWidth / 2
    const startY = -containerHeight / 2 + finalImageHeight / 2

    const gridPositions = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
    ]

    if (i !== 2) {
      let gridIndex = i > 2 ? i - 1 : i
      const pos = gridPositions[gridIndex]
      gridFinalX = startX + pos.col * (finalImageWidth + gridGap)
      gridFinalY = startY + pos.row * (finalImageHeight + gridGap)
    } else {
      gridFinalX = startX + 1 * (finalImageWidth + gridGap)
      gridFinalY = startY - 50
    }
    const y = useTransform(
      scrollYProgressSpring,
      [0.15, 0.4, 0.5, 0.8],
      [finalStackedY, spreadFinalY, spreadFinalY, gridFinalY]
    )
    const x = useTransform(
      scrollYProgressSpring,
      [0.15, 0.4, 0.5, 0.8],
      [0, spreadFinalX, spreadFinalX, gridFinalX]
    )

    const rotate = useTransform(
      scrollYProgressSpring,
      [0.15, 0.4, 0.8],
      [finalStackedRotate, 0, 0]
    )

    const scale = useTransform(
      scrollYProgressSpring,
      [0, 0.15, 0.4, 0.8],
      [
        desktopEarlyScale * shortHeightFactor,
        desktopEarlyScale * shortHeightFactor,
        1,
        finalScale,
      ]
    )

    const opacity = useTransform(
      scrollYProgressSpring,
      [0.5, 0.6],
      [1, i === 2 ? 0 : 1]
    )
    return { y, x, rotate, scale, opacity }
  })

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest >= 0.8) {
        setClipPath('inset(-100vmax 0 0 -100vmax)')
      } else {
        setClipPath('inset(-100vmax)')
      }
    })
  }, [scrollYProgress])

  const initialImageWidth = isMobile ? 160 : 200
  const initialImageHeight = isMobile ? 224 : 280
  const [activeSpan, setActiveSpan] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgressSpring.onChange((v) => {
      if (v < 0.33) setActiveSpan(0)
      else if (v < 0.66) setActiveSpan(1)
      else setActiveSpan(2)
    })
    return () => unsubscribe && unsubscribe()
  }, [scrollYProgressSpring])

  return (
    <main className="min-h-screen">
      <div className="flex flex-col mb-4 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            How It Works
          </span>
        </div>
        <span>
          <hr className="text-gray-900 border-gray-700" />
        </span>
      </div>
      <div
        ref={targetRef}
        className="h-[300vh] relative max-w-[1400px] mx-auto my-2"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            className={`absolute z-0 transform -translate-y-1/2 ${
              isMobile ? 'top-[14%] right-[32%]' : 'top-[32%] left-56 '
            }`}
          >
            <motion.p
              style={{
                opacity: number1Opacity,
                y: number1Y,
                position: 'absolute',
              }}
              className="text-[10rem] md:text-[20rem] font-bold text-neutral-300 leading-none"
            >
              1
            </motion.p>
            <motion.p
              style={{
                opacity: number2Opacity,
                y: number2Y,
                position: 'absolute',
              }}
              className="text-[10rem] md:text-[20rem] font-bold text-neutral-300 leading-none"
            >
              2
            </motion.p>
            <motion.p
              style={{
                opacity: number3Opacity,
                y: number3Y,
                position: 'absolute',
              }}
              className="text-[10rem] md:text-[20rem] font-bold text-neutral-300 leading-none"
            >
              3
            </motion.p>
          </div>
          <div className="sticky top-[2%] z-20">
            <motion.div className="text-center px-4">
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
                Bringing Your Creative Ideas
                <br />
                to Life is{' '}
                <span className="font-instrument-italic font-light">
                  {' '}
                  this Easy{' '}
                </span>
              </h1>
            </motion.div>
          </div>

          <motion.div
            className="absolute z-10"
            style={{
              top: containerTop,
              left: containerLeft,
              translateX: containerTranslateX,
              translateY: containerTranslateY,
              width: `${containerWidth}px`,
              height: `${containerHeight}px`,
              clipPath: clipPath,
              backgroundColor: containerBackgroundColor,
              padding: '16px',
            }}
          >
            <motion.div
              style={{
                opacity: headerUiOpacity,
                y: headerUiY,
                backfaceVisibility: 'hidden',
              }}
              className="absolute -top-[5.2rem] left-0 w-full h-[64px] font-sans"
            >
              <div className="relative overflow-hidden bg-gray-200 rounded-t-2xl">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    flexShrink: 0,
                    padding: '16px',
                    paddingTop: '6px',
                    paddingBottom: '6px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 'medium',
                      color: 'black',
                    }}
                  >
                    Business
                  </span>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 12px',
                      border: 'none',
                      backgroundColor: 'gray',
                      borderRadius: '9999px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      color: 'white',
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
                        fill="white"
                      />
                    </svg>
                    Create
                  </button>
                </div>

                <motion.div
                  style={{ clipPath: headerClipPath }}
                  className="bg-black p-3 rounded-t-3xl -z-10"
                >
                  <span className=" text-white font-medium">Personal</span>
                </motion.div>
              </div>
            </motion.div>

            {images.map((src, i) => {
              const { x, y, rotate, scale, opacity } = imageTransforms[i]
              return (
                <div
                  key={src}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: `${initialImageWidth}px`,
                    height: `${initialImageHeight}px`,
                  }}
                >
                  <motion.div
                  className="shadow-2xl rounded-2xl"
                    style={{
                      width: '100%',
                      height: '100%',
                      x,
                      y,
                      rotate,
                      scale,
                      zIndex: images.length - i + 20,
                      opacity,
                      transformOrigin: 'center center',
                      backfaceVisibility: 'hidden',
                      willChange: 'transform, opacity',
                      translateZ: 0,
                    }}
                  >
                    <img
                      src={src}
                      alt={`creative work ${i + 1}`}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </motion.div>
                </div>
              )
            })}
            {/* </div> */}
          </motion.div>

          <div className={`absolute left-0 right-0 text-center text-2xl sm:text-3xl md:text-4xl max-w-6xl mx-auto px-4 z-10 ${
    viewportHeight > 850 ? 'bottom-[60px] sm:bottom-5' : 'sm:bottom-2 bottom-[60px]'
  }`}>
            <p className="font-semibold tracking-tight font-figtree relative inline-block overflow-visible">
              {[
                { text: 'Submit your request,', color: color1 },
                { text: 'and we’ll create magic –', color: color2 },
                { text: 'taking it from draft to done.', color: color3 },
              ].map((item, i) => {
                const isActive = activeSpan === i
                return (
                  <span
                    key={i}
                    className="relative inline-block px-2"
                    aria-hidden={false}
                    role="text"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="highlight"
                        style={{
                          position: 'absolute',
                          left: -6,
                          right: -6,
                          top: -4,
                          bottom: -4,
                        }}
                        className="bg-[var(--color-primary)] rounded-md -z-10 pointer-events-none"
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <motion.span
                      className="relative inline-block"
                      style={
                        isActive ? { color: '#ffffff' } : { color: item.color }
                      }
                    >
                      {item.text}
                    </motion.span>
                  </span>
                )
              })}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AnimatedSection
