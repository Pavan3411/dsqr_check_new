'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check on initial load
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    // Listen for screen size changes
    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}
// --- Data Layer ---
const stats = [
  { value: '11,000+', label: 'Videos Edited' },
  { value: '54k+', label: 'Hours Saved' },
  { value: '22M+', label: 'Organic Views Generated' },
  { value: '4h/Day', label: 'Time Saved Per Client' },
]

const floatingIcons = [
  {
    src: '/images/pr.png',
    alt: 'Premiere Pro',
    size: 'w-10 sm:w-10 lg:w-12',
    animate: {
      mobile: { top: '18%', left: '15%' }, // Pushed down from the header
      tablet: { top: '6%', left: '30%' },
      desktop: { top: '6%', left: '30%' },
    },
  },
  {
    src: '/images/grok.png',
    alt: 'Grok',
    size: 'w-10 sm:w-10 lg:w-12',
    animate: {
      mobile: { top: '15%', left: '80%' }, // Pushed down
      tablet: { top: '5%', left: '64%' },
      desktop: { top: '5%', left: '64%' },
    },
  },
  {
    src: '/images/canva.png',
    alt: 'Canva',
    size: 'w-10 sm:w-10 lg:w-12',
    animate: {
      mobile: { top: '28%', left: '8%' }, // Adjusted for balance
      tablet: { top: '22%', left: '14%' },
      desktop: { top: '18%', left: '20%' },
    },
  },
  {
    src: '/images/mid.png',
    alt: 'Photoshop 2',
    size: 'w-10 sm:w-10 lg:w-12',
    animate: {
      mobile: { top: '38%', left: '13%' }, // Adjusted
      tablet: { top: '34%', left: '20%' },
      desktop: { top: '34%', left: '26%' },
    },
  },
  {
    src: '/images/ai.png',
    alt: 'Illustrator',
    size: 'w-10 sm:w-10 lg:w-12',
    animate: {
      mobile: { top: '25%', left: '85%' },
      tablet: { top: '13%', left: '85%' },
      desktop: { top: '13%', left: '75%' },
    },
  },
  {
    src: '/images/chatgpt.png',
    alt: 'ChatGPT',
    size: 'w-10 sm:w-10 lg:w-12',
    animate: {
      mobile: { top: '50%', left: '18%' },
      tablet: { top: '54%', left: '24%' },
      desktop: { top: '57%', left: '30%' },
    },
  },
  {
    src: '/images/lr.png',
    alt: 'Photoshop',
    size: 'w-10 sm:w-10 lg:w-12',
    animate: {
      mobile: { top: '38%', left: '88%' },
      tablet: { top: '30%', left: '78%' },
      desktop: { top: '30%', left: '73%' },
    },
  },
  {
    src: '/images/ae.png',
    alt: 'Photoshop',
    size: 'w-10 sm:w-10 lg:w-12',
    hideOnMobile: true,
    animate: {
      mobile: { top: '45%', left: '90%' },
      tablet: { top: '42%', left: '86%' },
      desktop: { top: '37%', left: '84%' },
    },
  },
  {
    src: '/images/au.png',
    alt: 'Audition',
    size: 'w-10 sm:w-10 lg:w-12',
    hideOnMobile: true,
    animate: {
      mobile: { top: '45%', left: '8%' },
      tablet: { top: '45%', left: '10%' },
      desktop: { top: '45%', left: '14%' },
    },
  },
  {
    src: '/images/id.png',
    alt: 'InDesign',
    size: 'w-10 sm:w-10 lg:w-12',
    hideOnMobile: true,
    animate: {
      mobile: { top: '63%', left: '8%' },
      tablet: { top: '63%', left: '14%' },
      desktop: { top: '63%', left: '16%' },
    },
  },
  {
    src: '/images/xd.png',
    alt: 'XD',
    size: 'w-10 sm:w-10 lg:w-12',
    animate: {
      mobile: { top: '65%', left: '15%' },
      tablet: { top: '74%', left: '24%' },
      desktop: { top: '74%', left: '26%' },
    },
  },
  {
    src: '/images/per.png',
    alt: 'Grok',
    size: 'w-10 sm:w-10 lg:w-12',
    animate: {
      mobile: { top: '52%', left: '82%' },
      tablet: { top: '50%', left: '74%' },
      desktop: { top: '52%', left: '70%' },
    },
  },
  {
    src: '/images/ps.png',
    alt: 'Photoshop 2',
    size: 'w-10 sm:w-10 lg:w-12',
    animate: {
      mobile: { top: '68%', left: '90%' },
      tablet: { top: '75%', left: '80%' },
      desktop: { top: '75%', left: '77%' },
    },
  },
  {
    src: '/images/nov.png',
    alt: 'Canva 2',
    size: 'w-10 sm:w-10 lg:w-12',
    hideOnMobile: true,
    animate: {
      mobile: { top: '88%', left: '85%' },
      tablet: { top: '65%', left: '89%' },
      desktop: { top: '65%', left: '87%' },
    },
  },
  {
    src: '/images/gem.png',
    alt: 'Grok',
    size: 'w-10 sm:w-10 lg:w-12',
    animate: {
      mobile: { top: '84%', left: '30%' }, // Extended to fill bottom space
      tablet: { top: '88%', left: '34%' },
      desktop: { top: '84%', left: '38%' },
    },
  },
  {
    src: '/images/un.png',
    alt: 'ChatGPT',
    size: 'w-10 sm:w-10 lg:w-12',
    animate: {
      mobile: { top: '81%', left: '75%' }, // Extended to fill bottom space
      tablet: { top: '87%', left: '70%' },
      desktop: { top: '83%', left: '67%' },
    },
  },
]
// --- Sub-Component for each "Living" Icon ---
function FloatingIcon({ src, alt, size, animate, hideOnMobile = false }) {
  // Call the hook to check if we're on a mobile screen
  const isMobile = useMediaQuery('(max-width: 639px)') // Use 639px to match Tailwind's 'sm' breakpoint
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1024px)')

  if (isMobile && hideOnMobile) {
    return null
  }

  // Conditionally choose the animation properties
  let animationProps
  if (isMobile) {
    animationProps = animate.mobile
  } else if (isTablet) {
    animationProps = animate.tablet
  } else {
    animationProps = animate.desktop
  }
  const itemVariants = {
    hidden: {
      top: '50%',
      left: '50%',
      x: '-50%',
      y: '-50%',
      opacity: 0,
      scale: 0.5,
    },
    // REFINED: This logic now correctly maintains the centering transform (`x` and `y`)
    // throughout the animation, ensuring a smooth path from center to any corner.
    visible: {
      ...animationProps,
      x: '-50%',
      y: '-50%',
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 15 },
    },
  }

  return (
    <motion.div className="absolute" variants={itemVariants}>
      <motion.div
        animate={{ y: ['-8px', '8px', '-8px'], x: ['-4px', '4px', '-4px'] }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <img
          src={src}
          alt={alt}
          width={80}
          height={80}
          className={`${
            size || 'w-12 sm:w-10 md:w-20'
          } h-auto object-contain rounded-lg shadow-xl`}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  )
}

// --- Main Animation Component ---
export default function CreativeSuiteAnimation() {
  const targetRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  const statsTransforms = stats.map((_, i) => {
    const start = 0.15 + i * 0.18
    const end = start + 0.18
    const opacity = useTransform(
      scrollYProgress,
      [start, (start + end) / 2],
      [0, 1]
    )
    const y = useTransform(scrollYProgress, [start, (start + end) / 2], [50, 0])
    return { opacity, y }
  })

  // REFINED: Removed stagger effect for a simultaneous burst.
  const entryContainerVariants = {
    hidden: {},
    visible: {},
  }

  const headlineVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.1 },
    },
  }

  return (
    <>
      {/* <div className="h-screen flex items-center justify-center bg-primary">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Scroll Down to Begin</h1>
                    <p className="text-lg text-gray-600 mt-2">Discover our creative process.</p>
                </div>
            </div> */}

      <div
        ref={targetRef}
        className="relative bg-primary lg:h-[300vh] h-[200vh] px-2 mt-5"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
            <motion.div
              className="w-full h-full"
              variants={entryContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.div
                variants={headlineVariants}
                className="absolute top-16 sm:top-24 left-0 right-0 z-20 text-center mb-2"
              >
                <p className="text-sm sm:text-base md:text-xl uppercase tracking-wider text-gray-800 font-semibold">
                  WE LET OUR WORK SPEAK FOR ITSELF
                </p>
              </motion.div>

              {floatingIcons.map((icon, i) => (
                <FloatingIcon key={i} {...icon} />
              ))}
            </motion.div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              <div className="grid gap-16 sm:gap-5">
                {stats.map((item, i) => (
                  <motion.div
                    key={i}
                    style={{
                      opacity: statsTransforms[i].opacity,
                      y: statsTransforms[i].y,
                    }}
                    className="text-center"
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                      {item.value}
                    </h2>
                    <p className="mt-1 sm:mt-2 text-gray-700 text-sm sm:text-base md:text-lg">
                      {item.label}
                    </p>
                    <hr className="border-gray-300 mt-2 sm:mt-3 max-w-[200px] mx-auto" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
