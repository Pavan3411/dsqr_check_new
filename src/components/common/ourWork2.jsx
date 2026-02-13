'use client'

import Image from 'next/image'
import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Hls from 'hls.js'
import { useSearchParams } from 'next/navigation'

// 1. Structure for the Sidebar/Menu Navigation
const FEATURED_PROJECTS_STRUCTURE = {
  Graphics: [
    'Ad creatives',
    'Ai generated graphics',
    'App graphic',
    'Blog thumbnails',
    'Brand Kits & Assets',
    'Custom Icons',
    'Ebook graphics for website',
    'Infographics',
    'Pdfs',
    'Presentations',
    'Slide decks',
    'Social media graphics',
    'Web graphic',
  ],
  Videos: [
    'Montage style',
    'Spanish Videos',
    'Animation AI videos',
    'Gym & Fitness',
    'Text Based',
    'Talking Heads',
    'Product Showcase',
    'Podcast Intro',
    'Long form edits',
    'Digital Course VSL',
  ],
  'AI Lab': [
    'Ai Assets',
    'AI generated images',
    'Product Placement',
    'AI B-rolls',
    'AI Voiceover',
    'AI Clone Creation',
    'AI-Powered Video',
    'AI Videos Ad Creation',
    'AI UGC Ads/Content',
  ],
}

function GridItem({ item }) {
  const videoRef = useRef(null)
  const hlsRef = useRef(null)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if (item.type !== 'video' || !showVideo) return

    const video = videoRef.current
    if (!video) return

    if (item.src.includes('.m3u8') && Hls.isSupported()) {
      const hls = new Hls()
      hlsRef.current = hls
      hls.loadSource(item.src)
      hls.attachMedia(video)
    } else {
      video.src = item.src
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [item.src, item.type, showVideo])

  return (
    <div
      className="break-inside-avoid rounded-xl overflow-hidden relative group shadow-lg"
      style={{ marginBottom: 16 }}
    >
      {item.type === 'video' ? (
        <div className="relative overflow-hidden">
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
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[var(--color-primary)] bg-opacity-50 rounded-full p-1 transition-transform group-hover:scale-110">
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

          {showVideo && (
            <video
              ref={videoRef}
              poster={item.poster}
              controls
              autoPlay
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
          )}
        </div>
      ) : (
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
  const [activeCategory, setActiveCategory] = useState('Montage style')
  const [displayedImages, setDisplayedImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const searchParams = useSearchParams()
  const contentRef = useRef(null)

  // 2. Map Frontend Tab Names to Backend Category Slugs
  const getBackendCategory = useCallback((tab) => {
    if (tab === 'Videos') return 'test'
    if (tab === 'Graphics') return 'graphics'
    if (tab === 'AI Lab') return 'ai_lab'
    return tab.toLowerCase()
  }, [])

// 3. Dynamic Fetching Logic
useEffect(() => {
  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const category = getBackendCategory(activeTab);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/media-items/category/${category}?subsection=${encodeURIComponent(activeCategory)}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const jsonResponse = await response.json(); // Rename this for clarity

      // UPDATE THIS LINE: Access the nested .data array from your response
      const items = (jsonResponse && jsonResponse.success && Array.isArray(jsonResponse.data)) 
        ? jsonResponse.data 
        : [];

      // MAP DATA TO MATCH YOUR OLD STRUCTURE
      const formattedData = items.map((item) => ({
        ...item,
        id: item._id || item.id,
        // Since your API already returns 'src' and 'poster', we just ensure fallbacks
        src: item.src || item.url || '',
        poster: item.poster || item.thumbnailUrl || '',
        type: item.type || (activeTab === 'Graphics' ? 'image' : 'video'),
        alt: item.alt || item.title || activeCategory
      }));

      setDisplayedImages(formattedData);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setDisplayedImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (activeTab && activeCategory) {
    fetchMedia();
  }
}, [activeTab, activeCategory, getBackendCategory]);

  // 4. URL Parameter Handling & Initial Sync
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab')
    const categoryFromUrl = searchParams.get('category')

    if (tabFromUrl && FEATURED_PROJECTS_STRUCTURE[tabFromUrl]) {
      setActiveTab(tabFromUrl)
    }
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl)
    }

    if (tabFromUrl || categoryFromUrl) {
      const el = document.getElementById('featured-projects')
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [searchParams])

  // 5. Category Syncing when Tab changes
  useEffect(() => {
    const availableCategories = FEATURED_PROJECTS_STRUCTURE[activeTab] || []
    if (!availableCategories.includes(activeCategory)) {
      setActiveCategory(availableCategories[0] || '')
    }
  }, [activeTab])

  const filterTabs = ['Graphics', 'Videos', 'AI Lab']

  const currentCategories = useMemo(() => {
    return FEATURED_PROJECTS_STRUCTURE[activeTab] || []
  }, [activeTab])

  const handleSelectCategory = (category) => {
    setActiveCategory(category)
    setIsDropdownOpen(false)

    requestAnimationFrame(() => {
      if (contentRef.current) {
        const headerOffset = 200
        const top = contentRef.current.getBoundingClientRect().top + window.scrollY
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
                        top: top - 100,
                        behavior: 'smooth',
                      })
                    }
                  }}
                  className="relative px-6 py-2 rounded-full font-medium transition-colors"
                >
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
          {/* Sidebar */}
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

          {/* Main Content */}
          <div className="w-full flex-1">
            {/* Mobile Dropdown */}
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
                <div className="mt-2 bg-[#1f1f1f] rounded-lg shadow-lg overflow-hidden absolute w-full z-[70]">
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
                {isLoading ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="flex justify-center py-20"
                  >
                    <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                  </motion.div>
                ) : (
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
                        <GridItem key={item.id || item._id} item={item} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isLoading && displayedImages.length === 0 && (
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