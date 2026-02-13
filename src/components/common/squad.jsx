// // Static imageList export for About Us page
// export const imageList = [
//   'https://dsqrstudio.b-cdn.net/Team_photo/19.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/3%20(2).webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/4%20(1).webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/20.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/28.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/6%20(4).webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/7%20(1).webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/8%20(5).webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/9.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/10.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/12.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/13.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/14.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/15.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/18.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/11.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/5%20(1).webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/21.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/22.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/23.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/24.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/25.webp',
//   'https://dsqrstudio.b-cdn.net/Team_photo/26.webp',
// ]
// ;
'use client'
import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const API_CATEGORY = 'team_photos'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function Squad() {
  const [images, setImages] = useState([])

  useEffect(() => {
    console.log('Fetching squad images from API...')
    fetch(`${API_BASE_URL}/api/admin/media-items/category/${API_CATEGORY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched squad images:', data)
        if (data.success && Array.isArray(data.data)) {
          // Expecting data.data to be an array of { url, alt } or similar
          setImages(
            data.data.map((img, i) => ({
              src: img.url || img.src || '',
              alt: img.alt || `User Image ${i + 1}`,
            })),
          )
        } else {
          setImages([])
        }
      })
      .catch(() => setImages([]))
  }, [])

  const topRowImages = images
  const bottomRowImages = [...images].reverse()

  // This component contains the CSS for the animation.
  const AnimationStyles = () => (
    <style jsx global>{`
      body {
        font-family: 'Inter', sans-serif;
      }

      .wavy-scroller {
        width: 100%;
        overflow: hidden;
        // -webkit-mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
        // mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
        /* Increased vertical padding to ensure the larger animation is not clipped */
        padding-top: 70px;
        padding-bottom: 70px;
      }

      .scroller-inner {
        display: flex;
        width: fit-content;
      }

      .scroll-left {
        animation: scroll-left 120s linear infinite; /* Adjusted duration for more images */
      }

      .scroll-right {
        animation: scroll-right 120s linear infinite;
      }

      /* ✅ Mobile: apply delay so they don’t sync */
      @media (max-width: 768px) {
        .scroll-right {
          animation-delay: -45s; /* half duration, keeps them offset */
        }
      }

      /* ✅ Desktop: shift starting point instead of delay */
      @media (min-width: 769px) {
        .scroll-right {
          transform: translateX(-100%); /* start fully offset */
        }
      }
      .image-card {
        width: 6.5rem;
        height: 6.5rem;
        margin: 0 15px;
        border-radius: 24px;
        flex-shrink: 0;
        overflow: hidden;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.07);
      }
      @media (max-width: 768px) {
        .image-card {
          width: 6rem;
          height: 6rem;
        }
      }

      /* Apply up-starting animation to odd children */
      .image-card:nth-child(odd) {
        animation: wavy-motion-up 4s ease-in-out infinite;
      }

      /* Apply down-starting animation to even children */
      .image-card:nth-child(even) {
        animation: wavy-motion-down 4s ease-in-out infinite;
      }

      @keyframes scroll-left {
        from {
          transform: translateX(0%);
        }
        to {
          transform: translateX(-50%);
        }
      }

      @keyframes scroll-right {
        from {
          transform: translateX(-50%);
        }
        to {
          transform: translateX(0%);
        }
      }

      @keyframes wavy-motion-up {
        0%,
        100% {
          transform: translateY(-60px);
        }
        50% {
          transform: translateY(60px);
        }
      }

      @keyframes wavy-motion-down {
        0%,
        100% {
          transform: translateY(45px);
        }
        50% {
          transform: translateY(-45px);
        }
      }
    `}</style>
  )

  const textRef = useRef(null)
  const isInView = useInView(textRef, { once: true, margin: '-100px' })

  // Duplicate arrays for seamless loop
  const loopedTopImages = [...topRowImages, ...topRowImages]
  const loopedBottomImages = [...bottomRowImages, ...bottomRowImages]

  // Variants for the container to orchestrate the letter animations
  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.04, // Stagger effect for each letter
      },
    },
  }

  // Variants for each individual letter
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  // Variants for the slide-in-from-left animations
  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  }
  return (
    <>
      <AnimationStyles />
      <div className="flex flex-col items-center justify-center text-gray-800 overflow-x-hidden">
        <div className="max-w-7xl mx-auto py-4"></div>
        <div className="relative w-full max-w-screen mx-auto flex flex-col items-center py-8">
          {/* Top Scroller (Left) */}
          <div className="wavy-scroller">
            <div className="scroller-inner scroll-left">
              {loopedTopImages.map((image, index) => (
                <div className="image-card" key={`top-${index}`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Animated Text Block */}
          <motion.div
            ref={textRef}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center my-4 md:my-6 px-4 z-10"
          >
            {/* Small heading slides in */}
            <motion.p
              className="text-sm md:text-2xl font-medium text-gray-600"
              variants={slideInLeft}
            >
              Minds that make it happen
            </motion.p>

            {/* Main heading fades in letter-by-letter */}
            <motion.h2
              className="text-3xl md:text-6xl font-semibold my-2 tracking-tight"
              variants={sentenceVariants} // Orchestrates the children animation
            >
              {'Your '.split('').map((char, index) => (
                <motion.span key={`your-${index}`} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
              <em className="font-serif font-extralight italic">
                {'Creative'.split('').map((char, index) => (
                  <motion.span
                    key={`creative-${index}`}
                    variants={letterVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </em>
              {' Squad'.split('').map((char, index) => (
                <motion.span key={`squad-${index}`} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.h2>

            {/* Paragraph slides in with a delay */}
            <motion.p
              className="mt-2 text-gray-500 max-w-2xl mx-auto md:text-xl"
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 1, 0.5, 1],
                    delay: 0.8,
                  },
                },
              }}
            >
              From sketches to final exports, our team delivers work that's
              fast, flawless, and full of impact.
            </motion.p>
          </motion.div>

          {/* Bottom Scroller (Right) */}
          <div className="wavy-scroller">
            <div className="scroller-inner scroll-right">
              {loopedBottomImages.map((image, index) => (
                <div className="image-card" key={`bottom-${index}`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
