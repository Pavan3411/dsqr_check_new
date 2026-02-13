'use client'
import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const MAIN_IMAGE_INDEX = 7

// --- Sub-component to handle hooks per item safely ---
const GalleryItem = ({ 
  i, src, columns, scrollYProgress, startSpread, endSpread, 
  colScales, rowScales, rowOffsets, isHidden 
}) => {
  const col = i % columns
  const row = Math.floor(i / columns)

  // We use MAIN_IMAGE_INDEX here for the stagger effect
  const distance = Math.abs(i - MAIN_IMAGE_INDEX)
  const staggerDelay = distance * 0.03
  const itemStartSpread = startSpread + staggerDelay
  const itemEndSpread = endSpread + staggerDelay

  const finalItemScale = (colScales[col] || 1) * (rowScales[row] || 1)
  const finalOffsetY = rowOffsets[row] || 0

  const itemScale = useTransform(
    scrollYProgress,
    [itemStartSpread, itemEndSpread],
    [0.3, finalItemScale]
  )

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
      className="aspect-[3/4]"
      style={{
        y: itemY,
        scale: itemScale,
        borderRadius: 16,
        overflow: 'hidden',
        transformOrigin: 'center center',
        position: 'relative',
        opacity: tileOpacity,
        // Instead of conditional class, we use visibility to keep the grid gap consistent
        visibility: isHidden ? 'hidden' : 'visible' 
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
}

// --- Main App Component ---
export default function App() {
  const [columns, setColumns] = useState(5)
  const [images, setImages] = useState([])
  const [colScales, setColScales] = useState([0.75, 0.9, 1, 0.9, 0.75])
  const [rowScales, setRowScales] = useState([0.85, 1, 0.85])
  const [rowOffsets, setRowOffsets] = useState([-40, 0, 40])
  const [gridWidth, setGridWidth] = useState('55%')
  const [scrollHeight, setScrollHeight] = useState('180vh')
  const [mainImageSize, setMainImageSize] = useState({ initial: '75%', final: '16%' })
  const [aspectRatioRange, setAspectRatioRange] = useState([16 / 8, 9 / 12])

  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    fetch(`${API_BASE_URL}/api/admin/media-items/category/home-page?subsection=gallery-section`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setImages(data.data.map((img) => img.url || img.src || ''))
        } else {
          setImages([])
        }
      })
      .catch(() => setImages([]))
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setGridWidth('95%')
        setColumns(3)
        setColScales([0.85, 0.95, 0.85])
        setRowScales([0.75, 0.85, 0.95, 0.85, 0.75])
        setMainImageSize({ initial: '90%', final: '40%' })
        setRowOffsets([-20, 0, 20])
        setAspectRatioRange([9 / 12, 9 / 14])
      } else if (window.innerWidth < 1024) {
        setGridWidth('80%')
        setColumns(5)
        setColScales([0.75, 0.9, 1, 0.9, 0.75])
        setRowScales([0.85, 1, 0.85])
        setScrollHeight('150vh')
        setMainImageSize({ initial: '85%', final: '22%' })
        setRowOffsets([-30, 0, 30])
        setAspectRatioRange([16 / 10, 9 / 14])
      } else {
        setGridWidth('55%')
        setScrollHeight('160vh')
        setColumns(5)
        setColScales([0.75, 0.9, 1, 0.9, 0.75])
        setRowScales([0.85, 1, 0.85])
        setMainImageSize({ initial: '75%', final: '16%' })
        setRowOffsets([-40, 0, 40])
        setAspectRatioRange([16 / 8, 9 / 12])
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const startSpread = 0.1
  const endSpread = 0.7

  const gridGap = useTransform(scrollYProgress, [startSpread, endSpread], ['0px', '4px'])
  const gridScale = useTransform(scrollYProgress, [startSpread, endSpread], [0.5, 1])
  const gridOpacity = useTransform(scrollYProgress, [startSpread * 0.5, endSpread], [0, 1])

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

  return (
    <div className="min-h-screen bg-primary font-sans">
      <div ref={scrollRef} className="relative" style={{ height: scrollHeight }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ scale: gridScale, opacity: gridOpacity }}
            >
              <motion.div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                  width: gridWidth,
                  gap: gridGap,
                  display: 'grid',
                }}
              >
                {images.map((src, i) => (
                  <GalleryItem
                    key={i}
                    i={i}
                    src={src}
                    columns={columns}
                    scrollYProgress={scrollYProgress}
                    startSpread={startSpread}
                    endSpread={endSpread}
                    colScales={colScales}
                    rowScales={rowScales}
                    rowOffsets={rowOffsets}
                    isHidden={i === MAIN_IMAGE_INDEX}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Main Hero Image */}
            {images[MAIN_IMAGE_INDEX] && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
                style={{
                  width: mainImageWidth,
                  aspectRatio: mainImageAspectRatio,
                }}
              >
                <img
                  src={images[MAIN_IMAGE_INDEX]}
                  alt="main"
                  className="w-full h-full object-cover object-top rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}