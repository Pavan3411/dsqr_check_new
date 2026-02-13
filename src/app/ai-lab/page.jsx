'use client'

import AI1 from '@/components/common/ai1'
import CalendarSection from '@/components/common/calendar'
import Card from '@/components/common/Card'
import FAQ from '@/components/common/FAQ'
import TrustedBySection from '@/components/common/Logo'
import FeaturesSection from '@/components/common/plan'
import ServicesOffered from '@/components/common/service'
import TestimonialSection from '@/components/common/Testimonial'
import WhySection from '@/components/common/why'
import WorkProcess from '@/components/common/workProcess'
import { useCurrency } from '@/components/hooks/useCurrency'
import {
  mapApiPricingToStructure,
  buildCheckoutLink,
} from '@/components/constants/pricing'
import { useRef, useEffect, useState } from 'react'
import ScrollingFooterBanner from '../../components/common/ScrollingFooterBanner'
import { useAnimatedBackground } from '../../components/hooks/useAnimatedBackground'
import { motion } from 'framer-motion'

export const aiLabFaqData = [
  {
    id: 'ai-1',
    question: 'What is the AI Lab plan?',
    answer:
      'It’s designed for creators and businesses who want to scale content fast. Includes AI-powered strategies, automation tools, and AI workflows.',
  },
  {
    id: 'ai-2',
    question: 'Who is the AI Lab plan best for?',
    answer:
      'Perfect for creators, agencies, and businesses with high-volume needs who want to post more, stay on trend, and save time without building a large in-house team.',
  },
  {
    id: 'ai-3',
    question: 'What’s included in the AI Lab plan?',
    answer:
      'A dedicated project manager, unlimited AI-assisted video editing, thumbnail design, publishing support, and strategy sessions.',
  },
  {
    id: 'ai-4',
    question: 'What do you mean by AI-powered content?',
    answer:
      'We use AI to speed up content creation, repurpose long-form videos into shorts, and automate workflows.',
  },
  {
    id: 'ai-5',
    question: 'Do you use AI to edit videos?',
    answer:
      'We don’t replace editors with AI we enhance their work with it. Our editors still craft every video, but AI helps with repurposing, idea generation, and speeding up repetitive tasks.',
  },
  {
    id: 'ai-6',
    question: 'Is the AI content fully automated?',
    answer:
      'No. Our team combines AI efficiency with human creativity to ensure high-quality output.',
  },
  {
    id: 'ai-7',
    question: 'Can you help me repurpose my podcasts or webinars?',
    answer:
      'Yes, our AI workflows can turn long-form audio/video into engaging clips for social media.',
  },
  {
    id: 'ai-8',
    question: 'Do I need technical knowledge to use your AI services?',
    answer:
      'Not at all we handle the entire process and deliver ready-to-publish content.',
  },
]

const features = [
  { id: '1', text: 'AI Video Generation' },
  { id: '2', text: 'AI Image Generation' },
  { id: '3', text: 'AI-Generated Video Scripting' },
  { id: '4', text: 'AI Narration' },
  { id: '5', text: 'AI Voiceovers' },
  { id: '6', text: 'AI Dubbing' },
  { id: '7', text: 'AI Clone Creation' },
  { id: '8', text: 'AI-Powered Thumbnails' },
  { id: '9', text: 'Thumbnail Variants & A/B Testing' },
  { id: '10', text: 'AI-Driven B-Rolls' },
  { id: '11', text: 'AI-Generated Assets' },
  { id: '12', text: 'Content Strategy with AI' },
  { id: '13', text: 'Creative Ideation using AI' },
  { id: '14', text: 'AI-Driven Design Enhancements' },
  { id: '15', text: 'Automated Video Workflows' },
  { id: '16', text: 'Product placement' },
  { id: '17', text: 'Video Ad creation' },
  { id: '18', text: 'Ultra-realistic UGC ad creation' },
]

const AI_WORKFLOW = [
  {
    id: '01',
    title: 'One Effortless Session',
    description:
      'Dedicate just a few minutes one polished 5-minute video and a 10-minute voice recording. Once a month. That’s all it takes.',
  },
  {
    id: '02',
    title: 'Your Signature AI Presence',
    description:
      'We sculpt an exact digital twin flawlessly mirroring your appearance, voice, and charisma. Always poised, always on-brand.',
  },
  {
    id: '03',
    title: 'Premium Content, Seamlessly Delivered',
    description:
      'From ideation to editing to distribution, we transform your brief session into high-impact short videos. Elegant. Automated. Exceptionally done.',
  },
]

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function Ai_Lap() {
  const currency = useCurrency()
  const containerRef = useRef(null) // Ref for the whole page container
  const blackSectionStartRef = useRef(null) // Ref for the start of the black section
  const blackSectionEndRef = useRef(null) // Ref for the end of the black section
  const startShowingBannerRef = useRef(null)
  const stopShowingBannerRef = useRef(null)
  const [marqueeImages, setMarqueeImages] = useState([])
  const { backgroundColor, textColor } = useAnimatedBackground({
    startRef: blackSectionStartRef,
    endRef: blackSectionEndRef,
  })
  const [verticalServices, setVerticalServices] = useState([])
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/media-items/ai/service-offered`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setVerticalServices(data.data)
        console.log('Fetched vertical services:', data.data)
      })
  }, [])
  useEffect(() => {
    console.log('Fetching marquee images from API...')
    fetch(
      `${API_BASE_URL}/api/admin/media-items/category/ai_lab?subsection=primary_graphics`,
      { credentials: 'include' },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('API response:', data)
        if (data.success && Array.isArray(data.data)) {
          setMarqueeImages(data.data)
          console.log('Fetched marquee images:', data.data)
        } else {
          setMarqueeImages([])
        }
      })
      .catch(() => setMarqueeImages([]))
      .finally(() => setLoading(false))
  }, [])
  const [pricing, setPricing] = useState(null)
  const [pricesObj, setPricesObj] = useState({})

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/pricing`)
      .then((res) => res.json())
      .then((data) => {
        let mapped = {}
        if (
          data &&
          data.data &&
          typeof data.data === 'object' &&
          !Array.isArray(data.data)
        ) {
          mapped = data.data
        } else if (data && Array.isArray(data.data)) {
          mapped = mapApiPricingToStructure(data.data)
        }
        function convertKeysToJS(obj) {
          if (typeof obj !== 'object' || obj === null) return obj
          if (Array.isArray(obj)) return obj.map(convertKeysToJS)
          const newObj = {}
          for (const key in obj) {
            const value = obj[key]
            let newKey = key
            if (!isNaN(key) && key.trim() !== '') {
              newKey = Number(key)
            } else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)) {
              newKey = key
            }
            newObj[newKey] = convertKeysToJS(value)
          }
          return newObj
        }
        if (Object.keys(mapped).length) {
          setPricesObj(convertKeysToJS(mapped))
        }
        setPricing(data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div ref={containerRef} className="relative bg-primary">
      {/* B. Add the fixed background element that will change color */}
      <motion.div
        style={{ backgroundColor }}
        className="fixed inset-0 w-full h-full z-0"
      />
      <motion.div style={{ color: textColor }} className="relative z-10">
        <div className="">
          <AI1 />
        </div>
        <div ref={startShowingBannerRef}>
          <TrustedBySection />
        </div>
        <div ref={blackSectionStartRef} className="bg-transparent">
          <ServicesOffered
            cdn={true} // ✅ added here as component-level prop
            verticalServices={verticalServices}
            // verticalServices={[
            //   {
            //     cdnLink:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/45bcb1b1-b54f-42d8-8783-5b2083c66e3e/playlist.m3u8',
            //     poster:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/45bcb1b1-b54f-42d8-8783-5b2083c66e3e/thumbnail.jpg',
            //     title: 'YouTube Video Editing',
            //   },
            //   {
            //     cdnLink:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/dbb44a81-5177-4286-bb69-627dd83c4bc2/playlist.m3u8',
            //     poster:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/dbb44a81-5177-4286-bb69-627dd83c4bc2/thumbnail.jpg',
            //     title: 'Reels / Shorts / TikToks',
            //   },
            //   {
            //     cdnLink:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/75b7e4d0-f50b-4b75-bef0-2787aaf29f95/playlist.m3u8',
            //     poster:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/75b7e4d0-f50b-4b75-bef0-2787aaf29f95/thumbnail.jpg',
            //     title: 'Explainer Videos',
            //   },
            //   {
            //     cdnLink:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/0075cedb-79f4-4875-a36a-f56d736d7da0/playlist.m3u8',
            //     poster:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/0075cedb-79f4-4875-a36a-f56d736d7da0/thumbnail.jpg',
            //     title: 'Reel Promotions',
            //   },
            //   {
            //     cdnLink:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/ff1bb0c6-4bfc-4231-9eb4-03c6840bc304/playlist.m3u8',
            //     poster:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/ff1bb0c6-4bfc-4231-9eb4-03c6840bc304/thumbnail.jpg',
            //     title: 'YouTube Video Editing',
            //   },
            //   {
            //     cdnLink:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/9ad0ae45-b949-4a1d-8dc5-8d18c06ede1e/playlist.m3u8',
            //     poster:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/9ad0ae45-b949-4a1d-8dc5-8d18c06ede1e/thumbnail.jpg',
            //     title: 'Reels / Shorts / TikToks',
            //   },
            //   {
            //     cdnLink:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/1929c641-e3af-4bb7-b40e-b94621c384b4/playlist.m3u8',
            //     poster:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/1929c641-e3af-4bb7-b40e-b94621c384b4/thumbnail.jpg',
            //     title: 'Reel Promotions',
            //   },
            //   {
            //     cdnLink:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/8faad0bf-f0a1-434e-b332-75bed6fa0b4c/playlist.m3u8',
            //     poster:
            //       'https://vz-f20fe40d-4ba.b-cdn.net/8faad0bf-f0a1-434e-b332-75bed6fa0b4c/thumbnail.jpg',
            //     title: 'Explainer Videos',
            //   },
            // ]}
            horizontalServices={[]}
            heading={{
              title1: 'Powering Growth with Smart,',
              title2: 'Scalable',
              title3: 'AI Solutions',
            }}
            sectionLabel="Types of AI Services"
            subheading="Discover our crafted edits that shape simple footage into cinematic visuals."
          />
        </div>
        <div ref={blackSectionEndRef}>
          <WhySection />
        </div>
        <WorkProcess steps={AI_WORKFLOW} />
        <FeaturesSection
          title1="Every Plan, Every Benefit,"
          title2="
    Every Time"
          subtitle="No matter which plan you choose, you get our full creative commitment."
          includedFeaturesTitle=" • List of services"
          features={features}
        />
        <TestimonialSection />
        <section
          ref={stopShowingBannerRef}
          id="see-pricing"
          className="scroll-target w-full px-6 md:px-12 lg:px-16 py-16 max-w-7xl mx-auto"
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
              <hr className="border-gray-300" />
            </div>
            <h2 className="text-black text-3xl md:text-5xl font-semibold mt-2 tracking-tight">
              Unstoppable
              <span className="font-instrument-italic font-extralight ml-3">
                AI,
              </span>{' '}
              <br />
              <span className="text-black">Unshakable Pricing</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl">
              Unlimited AI content. Smart automations. No setup fees, no limits
              - just results.
            </p>
          </div>
          <div className="flex justify-center">
            {/* Pricing Card */}
            <Card
              title="AI Lab"
              prices={pricesObj.AI}
              getCheckoutLink={(activeRequest, fastDelivery) =>
                buildCheckoutLink('AI', activeRequest, fastDelivery)
              }
              description="Ideal for entrepreneurs and businesses to outsource all content needs with AI-generated solutions."
              ribbon="value"
              firstFeature="Unlimited AI Creative Requests"
              button={false}
              defaultLink="https://buy.stripe.com/6oU28r6wA07WaHlbXh08g1j"
            />{' '}
          </div>
        </section>
        <FAQ faqData={aiLabFaqData} />
        <CalendarSection />
        <ScrollingFooterBanner
          triggerRef={startShowingBannerRef}
          endRef={stopShowingBannerRef}
        />
      </motion.div>
    </div>
  )
}
