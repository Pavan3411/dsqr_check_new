'use client'

import Image from 'next/image'
import { useState, useMemo, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { sections } from '../constants/featuredWorkData'
import { motion, AnimatePresence } from 'framer-motion'
import Hls from 'hls.js'
import { useSearchParams } from 'next/navigation' // 👈 1. IMPORT THIS

function GridItem({ item }) {
  const videoRef = useRef(null)
  const hlsRef = useRef(null)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    // Only run this logic when the video is supposed to be shown
    if (item.type !== 'video' || !showVideo) return

    const video = videoRef.current
    if (!video) return

    // Standard HLS setup for .m3u8 files
    if (item.src.includes('.m3u8') && Hls.isSupported()) {
      const hls = new Hls()
      hlsRef.current = hls
      hls.loadSource(item.src)
      hls.attachMedia(video)
    } else {
      // Fallback for regular MP4 files or Safari
      video.src = item.src
    }

    // Cleanup when the component is unmounted or hidden
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [item.src, item.type, showVideo]) // Effect runs when showVideo becomes true

  return (
    <div
      className="break-inside-avoid rounded-xl overflow-hidden relative group shadow-lg"
      style={{ marginBottom: 16 }}
    >
      {item.type === 'video' ? (
        <div className="relative overflow-hidden">
          {/* 1. The Poster Image (visible initially) */}
          {!showVideo && (
            <div
              className="relative cursor-pointer"
              onClick={() => setShowVideo(true)}
            >
              <img
                src={item.poster}
                alt={item.alt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Play button overlay that shows the poster behind it */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* This div creates the semi-transparent circular background */}
                <div className="bg-[var(--color-primary)] bg-opacity-50 rounded-full p-1 transition-transform group-hover:scale-110">
                  {/* A clearer SVG for the play icon. The outer circle is handled by the div. */}
                  <svg
                    className="w-10 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end pointer-events-none">
                <p className="text-white text-sm sm:text-base p-3 font-medium">
                  {item.alt}
                </p>
              </div>
            </div>
          )}

          {/* 2. The Video Player (visible after click) */}
          {showVideo && (
            <video
              ref={videoRef}
              poster={item.poster}
              controls // <-- THIS SHOWS THE BROWSER'S BUILT-IN CONTROLS
              autoPlay // <-- THIS MAKES IT PLAY ON CLICK
              muted // <-- Required for autoplay to work reliably
              playsInline
              className="w-full h-auto object-cover"
            />
          )}
        </div>
      ) : (
        // This part for regular images remains the same
        <div className="relative overflow-hidden">
          <img
            src={item.src || item.image}
            alt={item.alt || `Project ${item.id}`}
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
            <p className="text-white text-sm sm:text-base p-3 font-medium">
              {item.alt}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
export default function FeaturedProjects() {
  const [activeTab, setActiveTab] = useState('Videos')
  const [activeCategory, setActiveCategory] = useState(() => {
    // initial tab default (safety if sections not loaded yet)
    const firstCats = Object.keys(sections['Graphics']?.categories || {})
    return firstCats.length ? firstCats[0] : ''
  })
  const searchParams = useSearchParams() // 👈 2. USE THE HOOK

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const contentRef = useRef(null)

  // put this useRef above everything
  const restored = useRef(false)

  // 1️⃣ When mounting: restore from sessionStorage
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab')
    const categoryFromUrl = searchParams.get('category')

    // Update state if URL params exist
    if (tabFromUrl) {
      setActiveTab(tabFromUrl)
    }
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl)
    }

    // Scroll into view if the URL has params
    if (tabFromUrl || categoryFromUrl) {
      const el = document.getElementById('featured-projects')
      if (el) {
        // A short delay allows the UI to update before scrolling
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [searchParams])

  // 2️⃣ When activeTab changes: if there’s no valid category for that tab, set the first one
  useEffect(() => {
    const keys = Object.keys(sections[activeTab]?.categories || {})
    // if the current category is not in the new tab or we haven’t set anything yet
    if (!keys.includes(activeCategory)) {
      setActiveCategory(keys.length ? keys[0] : '')
    }
  }, [activeTab, activeCategory])

  // const categories = [
  //   "All",
  //   "Banner Graphics",
  //   "Brand Videos",
  //   "Social Media Post",
  //   "Thumbnail",
  //   "Pack Design",
  //   "Product Design",
  // ]
  // flattened list of all images for the current tab
  const allImagesForTab = useMemo(() => {
    const catObj = sections[activeTab]?.categories || {}
    return Object.values(catObj).flat()
  }, [activeTab])

  // images to display (filtered by selected subsection)
  const displayedImages = useMemo(() => {
    return sections[activeTab]?.categories?.[activeCategory] || []
  }, [activeTab, activeCategory])

  const filterTabs = ['Graphics', 'Videos', 'AI Lab']

  // list of categories (subsections) for the current active tab
  const currentCategories = useMemo(() => {
    return Object.keys(sections[activeTab]?.categories || {})
  }, [activeTab])

  const handleSelectCategory = (category) => {
    setActiveCategory(category)
    setIsDropdownOpen(false)

    // wait one frame so DOM/layout updates after React state change
    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
        // If you have a sticky header and want an offset, you can adjust with scrollBy:
        const headerOffset = 200
        const top =
          contentRef.current.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: top - headerOffset, behavior: 'smooth' })
      }
    })
  }

  return (
    <div id="featured-projects" className="min-h-screen px-4 lg:px-8">
      <div className="max-w-7xl px-4 lg:px-8 mx-auto">
        {/* Header */}
        <div className="my-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          <hr className="border-gray-700" />
        </div>

        {/* Title Section */}
        <div className="md:mb-8 mb-1 text-left">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Featured{' '}
            <span className="font-instrument-italic font-extralight">
              Projects
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto md:mx-0">
            A curated look at standout creations across industries and formats.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center z-[60] py-5 relative">
          <div className="relative flex flex-wrap sm:gap-3 justify-center items-center rounded-full bg-[#262626] p-2 text-xs sm:text-base max-w-96">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    if (contentRef.current) {
                      const top = contentRef.current.offsetTop
                      window.scrollTo({
                        top: top - 100, // offset
                        behavior: 'smooth',
                      })
                    }
                  }}
                  className="relative px-6 py-2 rounded-full font-medium transition-colors"
                >
                  {/* Highlight background that slides between tabs */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-[var(--color-primary)] rounded-full pointer-events-none"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive
                        ? 'text-gray-900'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {tab}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div
          ref={contentRef}
          className="relative z-20 flex flex-col lg:flex-row gap-8 items-start md:mt-8"
        >
          {/* --- 1. DESKTOP-ONLY SIDEBAR --- */}
          {/* This sidebar is only rendered and visible on large screens */}
          <div className="hidden lg:block w-64 flex-shrink-0 sticky top-24">
            <div className="bg-[#262626] p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-6 underline underline-offset-8">
                Our Work
              </h2>
              <nav className="space-y-3">
                {currentCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleSelectCategory(category)}
                    className={`block w-full text-left py-1 text-base md:text-lg transition-colors ${
                      category === activeCategory
                        ? 'text-[var(--color-primary)] font-medium'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* --- 2. MAIN CONTENT AREA (GRID & MOBILE DROPDOWN) --- */}
          {/* This container holds the content for both mobile and desktop */}
          <div className="w-full flex-1">
            {/* Mobile Dropdown (Now it can be sticky) */}
            <div className="lg:hidden w-full z-50 py-4 relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex justify-between items-center bg-[#262626] px-4 py-3 rounded-lg text-white text-base"
              >
                <span>{activeCategory || 'Select Category'}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="mt-2 bg-[#1f1f1f] rounded-lg shadow-lg overflow-hidden absolute w-full">
                  {currentCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleSelectCategory(category)}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        category === activeCategory
                          ? 'text-[var(--color-primary)] font-medium'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Image Grid */}
            <div className="w-full pt-4 lg:pt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="w-full"
                >
                  <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {displayedImages.map((item) => (
                      <GridItem key={item.id} item={item} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Empty state */}
              {displayedImages.length === 0 && (
                <div className="text-center text-gray-400 mt-12 w-full">
                  <p className="text-lg">No projects found.</p>
                  <p className="text-sm mt-2">
                    Please select a different category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
