// components/PromotionModal.js

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { Download, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react' // 👈 Import new hooks
import Image from 'next/image'

export default function PromotionModal({ isOpen, onClose, images }) {
  // 👇 Get the emblaApi to control the carousel
  const [emblaRef, emblaApi] = useEmblaCarousel()

  // 👇 State to enable/disable the navigation buttons
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  // 👇 Functions to scroll the carousel
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )

  // 👇 Effect to update the button states when the carousel moves
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }

    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect() // Set initial state

    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  const handleDownload = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename || 'dsqr-promo-material.jpg'
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Could not download the image:', error)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-primary rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative" // 👈 Add relative positioning
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-200">
              <h3 className="text-lg font-semibold">Promotional Material</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>

            {/* Carousel */}
            <div className="p-4">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {images.map((image, index) => (
                    <div
                      className="relative flex-[0_0_100%] min-w-0 flex justify-center items-center h-[60vh]"
                      key={index}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        className="w-auto h-auto object-contain rounded-lg max-w-full max-h-full"
                        width={800}
                        height={600}
                        priority={false}
                      />
                      <button
                        onClick={() =>
                          handleDownload(image.src, image.filename)
                        }
                        className="absolute bottom-4 right-4 bg-[var(--color-primary)] text-black font-semibold px-4 py-2 rounded-full flex items-center gap-2 hover:brightness-95 transition"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 👇 PREV BUTTON */}
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white text-black 
           hover:bg-gray-100 rounded-full p-2 shadow-md 
           disabled:opacity-40 transition-all duration-300"
            >
              <ChevronLeft size={28} />
            </button>

            {/* 👇 NEXT BUTTON */}
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white text-black 
           hover:bg-gray-100 rounded-full p-2 shadow-md 
           disabled:opacity-40 transition-all duration-300"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
