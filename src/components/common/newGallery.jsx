'use client'
import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const images = [
  '/images/rr1.png',
  '/images/rr2.png',
  '/images/rr3.png',
  '/images/rr4.png',
  '/images/rr5.png',
  '/images/rr6.png',
  '/images/rr7.png',
  '/images/mainy.png',
  '/images/rr8.png',
  '/images/rr9.png',
  '/images/rr10.png',
  '/images/rr11.png',
  '/images/rr12.png',
  '/images/rr13.png',
  '/images/rr14.png',
]

const MAIN_IMAGE_INDEX = 7
export default function App() {
  const [columns, setColumns] = useState(5)
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  // State for responsive values
  const [gridWidth, setGridWidth] = useState('55%')
  const [scrollHeight, setScrollHeight] = useState('180vh')
  const [mainImageSize, setMainImageSize] = useState({
    initial: '75%',
    final: '16%',
  })
  // NEW: State for the hero image's aspect ratio animation
  const [aspectRatioRange, setAspectRatioRange] = useState([16 / 8, 9 / 12])

  // Effect to handle all responsive changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile
        setGridWidth('95%')
        setColumns(3) // <-- ADD THIS LINE
        // CHANGED: Smaller values for smaller images
        setColScales([0.85, 0.95, 0.85])
        setRowScales([0.75, 0.85, 0.95, 0.85, 0.75])
        setRowOffsets([-10, -5, 0, 5, 10]) // <-- MUCH smaller offsets for a tighter grid
        setMainImageSize({ initial: '90%', final: '40%' })
        setRowOffsets([-20, 0, 20])
        // NEW: Set a portrait aspect ratio for mobile
        setAspectRatioRange([9 / 12, 9 / 14])
      } else if (window.innerWidth < 1024) {
        // Tablet
        setGridWidth('80%')
        setColumns(5) // <-- ADD THIS LINE
        setColScales([0.75, 0.9, 1, 0.9, 0.75]) // <-- Back to 5 values
        setRowScales([0.85, 1, 0.85]) // <-- Back to 3 values
        setRowOffsets([-30, 0, 30]) // <-- Back to 3 values
        setScrollHeight('150vh') // CHANGED: Medium scroll height for tablet
        setMainImageSize({ initial: '85%', final: '22%' })
        setRowOffsets([-30, 0, 30])
        // NEW: Set an intermediate aspect ratio for tablet
        setAspectRatioRange([16 / 10, 9 / 14])
      } else {
        // Desktop
        setGridWidth('55%')
        setScrollHeight('160vh')
        setColumns(5) // <-- ADD THIS LINE
        setColScales([0.75, 0.9, 1, 0.9, 0.75]) // <-- Back to 5 values
        setRowScales([0.85, 1, 0.85]) // <-- Back to 3 values
        setRowOffsets([-40, 0, 40]) // <-- Back to 3 values
        setMainImageSize({ initial: '75%', final: '16%' })
        setRowOffsets([-40, 0, 40])
        // NEW: Set the original landscape-style aspect ratio for desktop
        setAspectRatioRange([16 / 8, 9 / 12])
      }
    }

    handleResize() // Set initial values
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty dependency array ensures this runs once on mount and cleans up

  // CHANGED: Widen the animation window to use more of the scroll height
  const startSpread = 0.1 // Start animation after 10% scroll
  const endSpread = 0.7 // End animation at 90% scroll

  const gridGap = useTransform(
    scrollYProgress,
    [startSpread, endSpread],
    ['0px', '4px']
  )
  // CHANGED: Stretched the hero image animation to match the new duration
  const mainImageWidth = useTransform(
    scrollYProgress,
    [0, endSpread],
    [mainImageSize.initial, mainImageSize.final]
  )
  const mainImageAspectRatio = useTransform(
    scrollYProgress,
    [0, endSpread],
    aspectRatioRange
  )

  const gridScale = useTransform(
    scrollYProgress,
    [startSpread, endSpread],
    [0.5, 1]
  )
  const gridOpacity = useTransform(
    scrollYProgress,
    [startSpread * 0.5, endSpread],
    [0, 1]
  )
  const [colScales, setColScales] = useState([0.75, 0.9, 1, 0.9, 0.75])
  const [rowScales, setRowScales] = useState([0.85, 1, 0.85])
  // We also need to convert rowOffsets from the useEffect into a state variable here
  const [rowOffsets, setRowOffsets] = useState([-40, 0, 40])

  return (
    <div className="min-h-screen bg-primary font-sans">
      {/* The `style` attribute on this div now uses the responsive scrollHeight state */}
      <div
        ref={scrollRef}
        className="relative"
        style={{ height: scrollHeight }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ scale: gridScale, opacity: gridOpacity }}
            >
              {/* This `style` attribute now uses the responsive gridWidth state */}
              <motion.div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                  width: gridWidth,
                  gap: gridGap,
                  display: 'grid',
                }}
              >
                {images.map((src, i) => {
                  const col = i % columns
                  const row = Math.floor(i / columns)
                  const hidden = i === MAIN_IMAGE_INDEX

                  const distance = Math.abs(i - MAIN_IMAGE_INDEX)
                  const staggerDelay = distance * 0.03
                  const itemStartSpread = startSpread + staggerDelay
                  const itemEndSpread = endSpread + staggerDelay

                  const finalItemScale =
                    (colScales[col] || 1) * (rowScales[row] || 1)
                  const itemScale = useTransform(
                    scrollYProgress,
                    [itemStartSpread, itemEndSpread],
                    [0.3, finalItemScale]
                  )

                  // The responsive rowOffsets state is used here
                  const finalOffsetY = rowOffsets[row] || 0
                  const itemY = useTransform(
                    scrollYProgress,
                    [itemStartSpread, itemEndSpread],
                    [0, finalOffsetY]
                  )

                  const overlayOpacity = useTransform(
                    scrollYProgress,
                    [itemStartSpread, itemEndSpread],
                    [0.9, 0]
                  )
                  const tileOpacity = useTransform(
                    scrollYProgress,
                    [itemStartSpread, itemEndSpread],
                    [0, 1]
                  )

                  return (
                    <motion.div
                      key={i}
                      className={`${
                        hidden ? 'opacity-0' : 'opacity-100'
                      } aspect-[3/4]`}
                      style={{
                        y: itemY,
                        scale: itemScale,
                        borderRadius: 16,
                        overflow: 'hidden',
                        transformOrigin: 'center center',
                        position: 'relative',
                        opacity: tileOpacity,
                      }}
                    >
                      <img
                        src={src}
                        alt={`tile-${i}`}
                        className="w-full h-full object-cover block"
                      />
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0,0,0,1)',
                          pointerEvents: 'none',
                          opacity: overlayOpacity,
                        }}
                      />
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* Main Hero Image */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
              style={{
                width: mainImageWidth,
                aspectRatio: mainImageAspectRatio, // This now uses the responsive animation
              }}
            >
              <img
                src={images[MAIN_IMAGE_INDEX]}
                alt="main"
                className="w-full h-full object-cover object-top rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
