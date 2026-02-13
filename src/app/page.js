'use client'
import StepsSection from '@/components/common/123'
import CalendarSection from '@/components/common/calendar'
import FAQ from '@/components/common/FAQ'
import TrustedBySection from '@/components/common/Logo'
import Membership from '@/components/common/Membership'
import SubscriptionSection from '@/components/common/new1'
import HeroGallery from '@/components/common/newGallery'
import Portfolio from '@/components/common/portfolio'
import ServicesOffered from '@/components/common/service'
import TestimonialSection from '@/components/common/Testimonial'
import WhySection from '@/components/common/why'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useScrollOnLoad from '@/components/hooks/useScrollOnLoad'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import ScrollingFooterBanner from '@/components/common/ScrollingFooterBanner'
import { useAnimatedBackground } from '@/components/hooks/useAnimatedBackground'

export const faqData = [
  {
    id: 1,
    question: 'What does DSQR Studio do?',
    answer: `We provide high-quality video editing, graphic design, and AI-powered content solutions for creators, entrepreneurs, businesses, and anyone looking to produce consistent, professional content.`,
  },
  {
    id: 2,
    question: 'Who do you typically work with?',
    answer: `We partner with content creators, coaches, agencies, real estate professionals, startups, businesses, entrepreneurs, and brands that need consistent, polished content.`,
  },
  {
    id: 3,
    question: 'Do I need to commit long-term?',
    answer: `No our plans are flexible month-to-month subscriptions, so you can scale up or down as your needs change.`,
  },
  {
    id: 4,
    question: 'How fast is your turnaround?',
    answer: `Most edits are completed within 24–48 hours, depending on complexity and volume.`,
  },
  {
    id: 5,
    question: 'Do you offer a trial?',
    answer: `Yes we offer a free trial ranging from 7 to 30 days, depending on availability and eligibility.\n\nDuring the trial, videos include a watermark. Once you subscribe, you'll get the final versions without the watermark.`,
  },
  {
    id: 6,
    question: 'What services does DSQR Studio provide?',
    answer: `We edit high-quality graphics and videos for social media reels, tutorials, speaker reels, real estate content, and more. Need extras? We offer add-ons like thumbnail design and publishing services to make your content pop.`,
  },
  {
    id: 7,
    question: 'What makes your video editing company different?',
    answer: `We're more than just editors we're your behind-the-scenes creative partner. We combine unlimited editing with a creative team that understands your brand, so every edit feels spot-on. Expect unlimited requests & revisions, a dedicated project manager, fast turnaround, and a wide range of services from reels to long-form, graphics, and AI workflows. It's like having your own in-house team, without the hiring headaches.`,
  },
]
const features = [
  { id: '1', text: 'YouTube Editing' },
  { id: '2', text: 'Reels' },
  { id: '3', text: 'Shorts' },
  { id: '4', text: 'TikToks' },
  { id: '5', text: 'Explainer Video' },
  { id: '6', text: 'Product Video' },
  { id: '7', text: 'Demo Videos' },
  { id: '8', text: 'Motion Graphics' },
  { id: '9', text: 'Animation' },
  { id: '10', text: 'Video Ads (Performance & Social)' },
  { id: '11', text: 'Subtitles, Captions, Titling & Transitions' },
  { id: '12', text: 'Voice-over Integration' },
  { id: '13', text: 'Longform Edits' },
  { id: '14', text: 'Intro/Outro Creation' },
  { id: '15', text: 'Podcast Edits' },
  { id: '16', text: 'Webinar Edits' },
  { id: '17', text: 'Digital Course Editing' },
  { id: '18', text: 'Multilingual Edits' },
  { id: '19', text: 'Montage Edits' },
  { id: '20', text: 'Training Videos' },
  { id: '21', text: 'Travel Vlogs' },
  { id: '22', text: 'House Showcase Videos' },
  { id: '23', text: 'Gym & Fitness Edits' },
  { id: '24', text: 'Car Edits' },
]

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  useScrollOnLoad('book-call') // 👈 works here
  const [open, setOpen] = useState(false)
  const [serviceVideos, setServiceVideos] = useState([])
  const startShowingBannerRef = useRef(null)
  const stopShowingBannerRef = useRef(null)
  const containerRef = useRef(null) // Ref for the whole page container
  const blackSectionStartRef = useRef(null) // Ref for the start of the black section
  const blackSectionEndRef = useRef(null) // Ref for the end of the black section
  const { backgroundColor, textColor } = useAnimatedBackground({
    startRef: blackSectionStartRef,
    endRef: blackSectionEndRef,
  })
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [loaded, setLoaded] = useState(false)

  const toggleMute = () => {
    if (!videoRef.current) return

    if (isMuted) {
      videoRef.current.muted = false
      videoRef.current.volume = 1 // ✅ Safari fix
      setIsMuted(false)
    } else {
      videoRef.current.muted = true
      videoRef.current.volume = 0
      setIsMuted(true)
    }
  }
 // Fetch service videos
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/media-items/category/services_offered?subsection=home-service-offered`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('Service API response:', data)
        if (data && Array.isArray(data.data)) {
          setServiceVideos(data.data)
          console.log('Service Videos:', data.data)
        }
      })
      .catch((err) => {
        console.error('Service API error:', err)
      })
  }, [])
  const router = useRouter()
  const handlePlan = () => {
    // If already on a page that has BookCall component
    if (document.getElementById('see-plan')) {
      document
        .getElementById('see-plan')
        ?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Otherwise navigate to /video and scroll after load
      router.push('/video?scroll=see-plan')
    }
  }
  useEffect(() => {
    // Load embed.js script once
    const script = document.createElement('script')
    script.src = 'https://app.youform.com/embed.js'
    script.async = true
    script.onload = () => {
      if (window.YouformEmbed?.init) window.YouformEmbed.init()
    }
    document.body.appendChild(script)
  }, [])
  return (
    <div ref={containerRef} className="relative bg-primary">
      {/* B. Add the fixed background element that will change color */}
      <motion.div
        style={{ backgroundColor }}
        className="fixed inset-0 w-full h-full z-0"
      />
      <motion.div style={{ color: textColor }} className="relative z-10">
        <SubscriptionSection />
        <div className="mt-[-28vh]">
          <TrustedBySection />
        </div>
        <div ref={startShowingBannerRef}>
          <Portfolio />
        </div>
        <div ref={blackSectionStartRef} className="bg-transparent">
          <ServicesOffered
            cdn={true}
//             verticalServices={[
//   {
//     cdnLink:
//       'https://vz-0822fa3c-02f.b-cdn.net/da36c394-f732-4bde-b1f3-4892029cc555/playlist.m3u8',
//     poster:
//       'https://vz-0822fa3c-02f.b-cdn.net/da36c394-f732-4bde-b1f3-4892029cc555/thumbnail.jpg',
//     title: 'AI Reel 1',
//   },
//   {
//     cdnLink:
//       'https://vz-0822fa3c-02f.b-cdn.net/faf37eba-c915-4dba-9e94-3b02a3f15e36/playlist.m3u8',
//     poster:
//       'https://vz-0822fa3c-02f.b-cdn.net/faf37eba-c915-4dba-9e94-3b02a3f15e36/thumbnail.jpg',
//     title: 'AI Reel 2',
//   },
//   {
//     cdnLink:
//       'https://vz-0822fa3c-02f.b-cdn.net/776da546-81c9-4653-bebc-f2aa3e86ceba/playlist.m3u8',
//     poster:
//       'https://vz-0822fa3c-02f.b-cdn.net/776da546-81c9-4653-bebc-f2aa3e86ceba/thumbnail.jpg',
//     title: 'AI Reel 3',
//   },
//   {
//     cdnLink:
//       'https://vz-0822fa3c-02f.b-cdn.net/bfeb3d10-dba8-46bf-923c-c4275d0ca361/playlist.m3u8',
//     poster:
//       'https://vz-0822fa3c-02f.b-cdn.net/bfeb3d10-dba8-46bf-923c-c4275d0ca361/thumbnail.jpg',
//     title: 'AI Reel 4',
//   },
//   {
//     cdnLink:
//       'https://vz-0822fa3c-02f.b-cdn.net/775e0f3e-481b-4d6d-bbc5-a0f6fc55813a/playlist.m3u8',
//     poster:
//       'https://vz-0822fa3c-02f.b-cdn.net/775e0f3e-481b-4d6d-bbc5-a0f6fc55813a/thumbnail.jpg',
//     title: 'AI Reel 5',
//   },
//   {
//     cdnLink:
//       'https://vz-0822fa3c-02f.b-cdn.net/389ef34f-623b-48b4-8c64-ce62be976483/playlist.m3u8',
//     poster:
//       'https://vz-0822fa3c-02f.b-cdn.net/389ef34f-623b-48b4-8c64-ce62be976483/thumbnail.jpg',
//     title: 'AI Reel 6',
//   },
//   {
//     cdnLink:
//       'https://vz-0822fa3c-02f.b-cdn.net/1dd24349-5a8c-4838-b71d-db4e362a79d3/playlist.m3u8',
//     poster:
//       'https://vz-0822fa3c-02f.b-cdn.net/1dd24349-5a8c-4838-b71d-db4e362a79d3/thumbnail.jpg',
//     title: 'AI Reel 7',
//   },
//   {
//     cdnLink:
//       'https://vz-0822fa3c-02f.b-cdn.net/da761ce2-d075-464d-9a88-38d6570e2ec4/playlist.m3u8',
//     poster:
//       'https://vz-0822fa3c-02f.b-cdn.net/da761ce2-d075-464d-9a88-38d6570e2ec4/thumbnail.jpg',
//     title: 'AI Reel 8',
//   },
//   {
//     cdnLink:
//       'https://vz-0822fa3c-02f.b-cdn.net/c688464c-302f-48d8-8140-48f7b4f091e0/playlist.m3u8',
//     poster:
//       'https://vz-0822fa3c-02f.b-cdn.net/c688464c-302f-48d8-8140-48f7b4f091e0/thumbnail.jpg',
//     title: 'AI Reel 9',
//   },
//   {
//     cdnLink:
//       'https://vz-0822fa3c-02f.b-cdn.net/d36a01ac-a81b-4565-b10b-58da7b0cf0b8/playlist.m3u8',
//     poster:
//       'https://vz-0822fa3c-02f.b-cdn.net/d36a01ac-a81b-4565-b10b-58da7b0cf0b8/thumbnail.jpg',
//     title: 'AI Reel 10',
//   },
// ]}
 verticalServices={serviceVideos.map(v => ({
              cdnLink: v.cdnLink || v.src || '',
              poster: v.poster || v.thumbnail || '',
              title: v.title || '',
            }))}
            horizontalServices={[]}
            heading={{
              title1: 'Everything You Need,',
              title2: 'In One',
              title3: 'Creative Studio',
            }}
            sectionLabel="Portfolio"
            subheading="Discover our crafted edits that shape simple footage into cinematic visuals."
          />
        </div>
        <div ref={blackSectionEndRef}>
          <WhySection />
        </div>
        <div className='' ref={stopShowingBannerRef}>
        <StepsSection /> </div>
        <HeroGallery />

        <TestimonialSection />

        {/* WRAP the component and attach the ref to the div */}
        <div>
          <Membership />
        </div>
        <FAQ faqData={faqData} />
        <CalendarSection />
        <ScrollingFooterBanner
          triggerRef={startShowingBannerRef}
          endRef={stopShowingBannerRef}
        />
      </motion.div>
    </div>
  )
}
