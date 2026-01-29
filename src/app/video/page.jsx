'use client'
import CalendarSection from '@/components/common/calendar'
import Card from '@/components/common/Card'
import FAQ from '@/components/common/FAQ'
import TrustedBySection from '@/components/common/Logo'
import FeaturesSection from '@/components/common/plan'
import ServicesOffered from '@/components/common/service'
import TestimonialSection from '@/components/common/Testimonial'
import WhySection from '@/components/common/why'
import WorkProcess from '@/components/common/workProcess'
import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import useScrollOnLoad from '@/components/hooks/useScrollOnLoad'
import Link from 'next/link'
import { PRICES, buildCheckoutLink } from '@/components/constants/pricing'
import FreeTrialForm from '@/components/common/FreeTrialForm'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import ScrollingFooterBanner from '../../components/common/ScrollingFooterBanner'
import { useAnimatedBackground } from '../../components/hooks/useAnimatedBackground'

export const videoFaqData = [
  {
    id: 'video-1',
    question: 'How does the subscription work?',
    answer:
      'You pay one flat monthly rate for unlimited video requests and revisions of any style and length. Our team works on your videos based on the number of active requests you have in your plan.',
  },
  {
    id: 'video-2',
    question: 'What is an active request?',
    answer:
      'An active request is a video we’re currently working on for you. If your plan includes 1 active request, we’ll work on one video at a time. Once it’s completed, we move to the next in your queue. If your plan allows 2 or 3 active requests, we’ll work on 2 or 3 videos simultaneously and then immediately start on the next set once those are finished.',
  },
  {
    id: 'video-3',
    question: 'How fast is your turnaround time?',
    answer:
      'We move fast, most projects are completed within 1–2 business days, depending on style, length, and complexity.',
  },
  {
    id: 'video-4',
    question: 'Can I request unlimited edits?',
    answer:
      'Yes, you can submit unlimited requests. We’ll work on them depending on the number of active requests you have in your plan.',
  },
  {
    id: 'video-5',
    question:
      'What’s the difference between standard delivery and Lightning Fast Delivery?',
    answer:
      'With Lightning Fast Delivery, your videos are prioritized in our editing queue, meaning you’ll receive your completed videos much faster than the standard turnaround time. This option is perfect if you’re working with tight deadlines or need a higher frequency of content. Without Lightning Fast Delivery, your videos will still be delivered reliably and with the same high quality, but they’ll follow the standard turnaround time based on your plan and the complexity of the edits.',
  },
  {
    id: 'video-6',
    question:
      'Can I create both long-form and short-form content in the same plan?',
    answer:
      'Absolutely! You can request both under the same subscription just note that complex edits may take a little longer.',
  },
  {
    id: 'video-7',
    question: 'What kind of videos can you edit?',
    answer:
      'We handle reels, tutorials, speaker highlights, real estate videos, YouTube content, VSLs, Motion, Animation, and more.',
  },
  {
    id: 'video-8',
    question: 'How do I send my raw footage?',
    answer:
      'You can share your files by uploading them to any cloud platform like Google Drive, Dropbox, or WeTransfer and share the public link through your personalized Dashboard.',
  },
  {
    id: 'video-9',
    question: 'Can you match a specific editing style?',
    answer:
      'For sure! Just send us a reference video, creator style, or your brand guidelines, and we’ll make sure the final product matches your vision.',
  },
  {
    id: 'video-10',
    question: 'Do you handle subtitles, transitions, and effects?',
    answer:
      'Absolutely and we can do even more. We specialize in making your videos engaging with subtitles, animations, and polished cuts.',
  },
  {
    id: 'video-11',
    question: 'Do you offer trial edits?',
    answer:
      'Yes! You can try our services free for a limited period, based on the respective time offerings. This way, you can experience our editing capabilities, turnaround time, communication, and overall service quality.',
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
  const [isMuted, setIsMuted] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const startShowingBannerRef = useRef(null)
  const stopShowingBannerRef = useRef(null)
  const router = useRouter()
  const containerRef = useRef(null) // Ref for the whole page container
  const blackSectionStartRef = useRef(null) // Ref for the start of the black section
  const blackSectionEndRef = useRef(null) // Ref for the end of the black section
  const { backgroundColor, textColor } = useAnimatedBackground({
    startRef: blackSectionStartRef,
    endRef: blackSectionEndRef,
  })
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
  return (
    <div ref={containerRef} className="relative bg-primary">
      {/* B. Add the fixed background element that will change color */}
      <motion.div
        style={{ backgroundColor }}
        className="fixed inset-0 w-full h-full z-0"
      />
      <motion.div style={{ color: textColor }} className="relative z-10">
        <section className="w-full px-6 md:px-12 lg:px-20 md:py-16 py-8 text-center">
          {/* Heading */}
          <div className="relative max-w-4xl mx-auto">
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl mt-4 md:mt-0 text-center font-semibold tracking-tight text-gray-900 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Unlimited{' '}
              <span className="font-instrument-italic font-extralight">
                Video Editing
              </span>{' '}
              <br />
              <span className="text-black">At Flat Monthly Fees.</span>
            </motion.h1>
            {/* Floating Tag - Left */}
            <motion.span
              className="absolute top-10 md:left-[0%] lg:-left-[5%] -rotate-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white 
            text-xs sm:text-sm xl:text-lg  px-3 py-2 rounded-full shadow-md hidden md:block"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              @Unlimited
              <span
                className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-0 h-0 
             border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-orange-500"
              ></span>
            </motion.span>

            {/* Floating Tag - Right */}
            <motion.span
              className="absolute top-10 md:right-[0%] lg:-right-[5%] rotate-12 bg-black text-white text-xs md:text-sm xl:text-lg px-3 py-2 rounded-full shadow-md hidden md:block"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 12 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              @Video
              <span
                className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-0 h-0 
            border-l-[6px] border-l-transparent 
            border-r-[6px] border-r-transparent 
            border-t-[6px] border-t-black"
              ></span>
            </motion.span>
          </div>
          <div className="hidden md:block">
            {/* Subheading */}
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center px-4 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Scale your content without limits. No contracts, no headaches, just
              seamless creative execution.
            </motion.p>
            {/* CTA Buttons */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="group inline-block">
                <button
                  className="relative overflow-hidden bg-[var(--color-primary)] hover:bg-[#cfee04] text-black font-medium px-6 py-2 rounded-full shadow-md cursor-pointer text-sm sm:text-base"
                  onClick={() => setOpen(true)}
                >
                  <span className="relative z-10">Start Your Free Trial</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                <FreeTrialForm open={open} setOpen={setOpen} />
              </div>
              <button
                onClick={() => handlePlan()}
                className="border text-black px-5 sm:px-6 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition text-sm sm:text-base cursor-pointer"
              >
                See Plans
              </button>
            </motion.div>

            {/* Feature List */}
            <motion.div
              className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6 font-medium text-sm sm:text-base md:text-lg text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {[
                'Start in minutes',
                'Pause, cancel, or scale anytime.',
                'No contract',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={16} className="text-black" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
          {/* Video Section */}
          <motion.div
            className="relative w-full max-w-6xl mx-auto mt-6 overflow-hidden rounded-xl aspect-video shadow-2xl"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <iframe
              // ref={iframeRef}
              src="https://iframe.mediadelivery.net/embed/497756/9887b1a4-34ac-4c06-9e6a-27dcc25ed83c?autoplay=true&muted=true&loop=true&playsinline=true&preload=true"
              loading="lazy"
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
              className="w-full h-full border-0"
              title="DSQR Studio autoplay"
            />
          </motion.div>

          <div className="block md:hidden mt-8 text-center">
            {/* Subheading */}
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center px-4 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {' '}
              Scale your content without limits. No contracts, no headaches, just
              seamless creative execution.
            </motion.p>
            {/* CTA Buttons */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="group inline-block">
                <button
                  className="relative w-52 sm:w-auto overflow-hidden bg-[var(--color-primary)] hover:bg-[#cfee04] text-black font-medium px-6 py-2 rounded-full shadow-md cursor-pointer text-sm sm:text-base"
                  onClick={() => setOpen(true)}
                >
                  <span className="relative z-10">Start Your Free Trial</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                <FreeTrialForm open={open} setOpen={setOpen} />
              </div>
              <button
                onClick={() => handlePlan()}
                className="border w-52 sm:w-auto px-5 sm:px-6 py-2 rounded-full font-semibold hover:text-white transition text-sm sm:text-base cursor-pointer"
              >
                See Plans
              </button>
            </motion.div>

            {/* Feature List */}
            <motion.div
              className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6 font-medium text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {[
                'Start in minutes',
                'No contract',
                'Pause, cancel, or scale anytime.',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={16} className="" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </section>
        <div ref={startShowingBannerRef}>
          <TrustedBySection />
        </div>
        <div ref={blackSectionStartRef} className="bg-transparent">
          <ServicesOffered
            heading={{
              title1: 'A Glimpse into our',
              title2: 'Visual',
              title3: 'Storytelling',
            }}
            sectionLabel="Types of videos"
            subheading="Explore high-impact videos crafted for every platform, goal, and industry."
            verticalServices={[
              {
                cdnLink:
                  'https://vz-f20fe40d-4ba.b-cdn.net/22888882-30fd-44d8-82e5-f4372cbb756f/playlist.m3u8',
                poster:
                  'https://vz-f20fe40d-4ba.b-cdn.net/22888882-30fd-44d8-82e5-f4372cbb756f/thumbnail.jpg',
                title: 'YouTube Video Editing',
              },
              {
                cdnLink:
                  'https://vz-f20fe40d-4ba.b-cdn.net/0c2bd13b-a922-4955-bc51-9ceeff9eab3d/playlist.m3u8',
                poster:
                  'https://vz-f20fe40d-4ba.b-cdn.net/0c2bd13b-a922-4955-bc51-9ceeff9eab3d/thumbnail.jpg',
                title: 'Reels / Shorts / TikToks',
              },
              {
                cdnLink:
                  'https://vz-f20fe40d-4ba.b-cdn.net/d2941540-ba11-4456-a1ea-3daa0fb3aaeb/playlist.m3u8',
                poster:
                  'https://vz-f20fe40d-4ba.b-cdn.net/d2941540-ba11-4456-a1ea-3daa0fb3aaeb/thumbnail.jpg',
                title: 'Explainer Videos',
              },
              {
                cdnLink:
                  'https://vz-f20fe40d-4ba.b-cdn.net/1e93f1cf-9da5-4eeb-b58a-f54917276278/playlist.m3u8',
                poster:
                  'https://vz-f20fe40d-4ba.b-cdn.net/1e93f1cf-9da5-4eeb-b58a-f54917276278/thumbnail.jpg',
                title: 'Reel Promotions',
              },
              {
                cdnLink:
                  'https://vz-f20fe40d-4ba.b-cdn.net/d55bb308-0001-4e46-a89e-e26f9d43c43c/playlist.m3u8',
                poster:
                  'https://vz-f20fe40d-4ba.b-cdn.net/d55bb308-0001-4e46-a89e-e26f9d43c43c/thumbnail.jpg',
                title: 'YouTube Video Editing',
              },
              {
                cdnLink:
                  'https://vz-f20fe40d-4ba.b-cdn.net/5652979e-fdf2-44fc-9744-345727504dcf/playlist.m3u8',
                poster:
                  'https://vz-f20fe40d-4ba.b-cdn.net/5652979e-fdf2-44fc-9744-345727504dcf/thumbnail.jpg',
                title: 'Reels / Shorts / TikToks',
              },
              {
                cdnLink:
                  'https://vz-f20fe40d-4ba.b-cdn.net/fd3e7f79-5475-4ffa-96eb-f5071978d152/playlist.m3u8',
                poster:
                  'https://vz-f20fe40d-4ba.b-cdn.net/fd3e7f79-5475-4ffa-96eb-f5071978d152/thumbnail.jpg',
                title: 'Explainer Videos',
              },
              {
                cdnLink:
                  'https://vz-f20fe40d-4ba.b-cdn.net/4d027d07-3139-4168-880b-af7be1de60f7/playlist.m3u8',
                poster:
                  'https://vz-f20fe40d-4ba.b-cdn.net/4d027d07-3139-4168-880b-af7be1de60f7/thumbnail.jpg',
                title: 'Reel Promotions',
              },
              {
                cdnLink:
                  'https://vz-f20fe40d-4ba.b-cdn.net/46388757-1b6d-4df7-a6b5-f0131c5a3a20/playlist.m3u8',
                poster:
                  'https://vz-f20fe40d-4ba.b-cdn.net/46388757-1b6d-4df7-a6b5-f0131c5a3a20/thumbnail.jpg',
                title: 'Explainer Videos',
              },
              {
                cdnLink:
                  'https://vz-f20fe40d-4ba.b-cdn.net/373ee54f-1231-4f27-84db-9f1c4ad5ff17/playlist.m3u8',
                poster:
                  'https://vz-f20fe40d-4ba.b-cdn.net/373ee54f-1231-4f27-84db-9f1c4ad5ff17/thumbnail.jpg',
                title: 'Reel Promotions',
              },
            ]}
            horizontalServices={[]}
            cdn={true}
          />
        </div>
        <div ref={blackSectionEndRef}>
          <WhySection />
        </div>
        <WorkProcess />
        <FeaturesSection
          title1="Stories that Move,"
          title2="
Frames that Sell"
          subtitle="From YouTube to ads, we craft videos that engage 
audiences, build trust, and drive real results."
          includedFeaturesTitle=" • List of services"
          features={features}
        />
        <TestimonialSection />
        <section
          ref={stopShowingBannerRef}
          id="see-plan"
          className="scroll-target w-full px-4 lg:px-8 py-10 max-w-7xl mx-auto"
        >
          {/* Heading */}
          <div className="text-left mb-10">
            <div className="flex flex-col mb-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  MEMBERSHIP
                </span>
              </div>
              <hr className="text-gray-900 border-gray-300" />
            </div>
            <h2 className="text-3xl text-black md:text-5xl font-semibold mt-2 tracking-tight">
              Unlimited{' '}
              <span className="font-instrument-italic font-extralight">
                Videos
              </span>{' '}
              <br />
              <span className="text-black">One Smart Price.</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl">
              Get pro-quality edits, motion graphics, and ads all under one flat
              monthly plan. No hidden costs.
            </p>
          </div>
          <div className="flex justify-center">
            {/* Pricing Card */}
            <Card
              title="Video Editing"
              prices={PRICES.Video} // 👈 full pricing tiers
              description="Tailored for agencies, creators & brands who outsource video editing, from reels and long-form edits to ads, promos & more."
              ribbon="value"
              firstFeature="Unlimited Video Requests"
              getCheckoutLink={(activeRequest, fastDelivery) =>
                buildCheckoutLink('Video', activeRequest, fastDelivery)
              }
            />{' '}
          </div>
        </section>
        <FAQ faqData={videoFaqData} />
        <CalendarSection />
        <ScrollingFooterBanner
          triggerRef={startShowingBannerRef}
          endRef={stopShowingBannerRef}
        />
      </motion.div>
    </div>
  )
}
