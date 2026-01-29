'use client'

import CalendarSection from '@/components/common/calendar'
import Card from '@/components/common/Card'
import FAQ from '@/components/common/FAQ'
import GraphicSection from '@/components/common/graphic1'
import TrustedBySection from '@/components/common/Logo'
import FeaturesSection from '@/components/common/plan'
import ServicesOffered from '@/components/common/service'
import TestimonialSection from '@/components/common/Testimonial'
import WhySection from '@/components/common/why'
import WorkProcess from '@/components/common/workProcess'
import { PRICES, buildCheckoutLink } from '@/components/constants/pricing'
import { useRef } from 'react'
import ScrollingFooterBanner from '../../components/common/ScrollingFooterBanner'
import { useAnimatedBackground } from '../../components/hooks/useAnimatedBackground'
import { motion } from 'framer-motion'

export const graphicsFaqData = [
  {
    id: 'graphics-1',
    question: 'What types of graphics can you design?',
    answer:
      'We create social media posts, ads, thumbnails, infographics, carousels, presentation slides, and more.',
  },
  {
    id: 'graphics-2',
    question: 'Can you design in my brand’s style?',
    answer:
      'Of course! Share your brand guidelines, preferred colors, or reference designs, and we’ll tailor everything to match your identity.',
  },
  {
    id: 'graphics-3',
    question: 'How does the subscription work?',
    answer:
      'You pay a fixed monthly fee for unlimited design requests and revisions. The number of completed designs depends on complexity, but you can queue as many as you like.',
  },
  {
    id: 'graphics-4',
    question: 'Can I submit unlimited design requests?',
    answer:
      'Yes. You can submit as many requests as you want we’ll handle them one by one based on your plan.',
  },
  {
    id: 'graphics-5',
    question: 'What is an active request in design?',
    answer:
      'An active request is the design we’re currently working on. Once it’s done, we move on to the next one in your queue.',
  },
  {
    id: 'graphics-6',
    question: 'How do I send my ideas or content?',
    answer:
      'You’ll get a shared workspace to upload text, images, or inspiration. You can also share links or files directly through your Dashboard.',
  },
  {
    id: 'graphics-7',
    question: 'How fast is the turnaround time?',
    answer:
      'Turnaround time depends on the style, length, and complexity of your project. That said, we always aim to deliver as quickly as possible while maintaining our reputation for high-quality, polished designs.',
  },
  {
    id: 'graphics-8',
    question: 'Do you offer Lightning Fast Delivery for designs too?',
    answer:
      'Yes, with Lightning Fast Delivery your requests are prioritized and delivered faster. Without it, we’ll follow our standard turnaround time.',
  },
  {
    id: 'graphics-9',
    question: 'Do you also handle resizing for different platforms?',
    answer:
      'Definitely we’ll adapt your designs for Instagram, YouTube, LinkedIn, or any platform you need.',
  },
]

const features = [
  { id: '1', text: 'Social Media Graphics' },
  { id: '2', text: 'Carousels' },
  { id: '3', text: 'Ad Creatives (Static)' },
  { id: '4', text: 'Ad Creatives (Animated)' },
  { id: '5', text: 'Brand Kits & Assets' },
  { id: '6', text: 'Website Graphics' },
  { id: '7', text: 'App Graphics' },
  { id: '8', text: 'Thumbnails' },
  { id: '9', text: 'Slide Decks' },
  { id: '10', text: 'Presentations' },
  { id: '11', text: 'eBooks' },
  { id: '12', text: 'Whitepapers' },
  { id: '13', text: 'PDFs' },
  { id: '14', text: 'Infographics' },
  { id: '15', text: 'Brochures' },
  { id: '16', text: 'Flyers' },
  { id: '17', text: 'Posters' },
  { id: '18', text: 'Merchandise Design' },
  { id: '19', text: 'Packaging Design' },
  { id: '20', text: 'Custom Icons' },
]

export default function Graphics() {
  const containerRef = useRef(null) // Ref for the whole page container
  const blackSectionStartRef = useRef(null) // Ref for the start of the black section
  const blackSectionEndRef = useRef(null) // Ref for the end of the black section
  const startShowingBannerRef = useRef(null)
  const stopShowingBannerRef = useRef(null)
  const { backgroundColor, textColor } = useAnimatedBackground({
    startRef: blackSectionStartRef,
    endRef: blackSectionEndRef,
  })
  return (
    <div ref={containerRef} className="relative bg-primary">
      {/* B. Add the fixed background element that will change color */}
      <motion.div
        style={{ backgroundColor }}
        className="fixed inset-0 w-full h-full z-0"
      />
      <motion.div style={{ color: textColor }} className="relative z-10">
        <div className="min-h-screen">
          <GraphicSection />
          <div ref={startShowingBannerRef}>
            <TrustedBySection />
          </div>
          <div ref={blackSectionStartRef} className="bg-transparent">
            <ServicesOffered
              verticalServices={[
                {
                  img: 'https://dsqrstudio.b-cdn.net/Graphics/graphic-service/1%20(1).webp',
                  title: 'Vertical Service 1',
                },
                {
                  img: 'https://dsqrstudio.b-cdn.net/Graphics/graphic-service/1%20(2).webp',
                  title: 'Vertical Service 2',
                },
                {
                  img: 'https://dsqrstudio.b-cdn.net/Graphics/graphic-service/1.webp',
                  title: 'Vertical Service 3',
                },
                {
                  img: 'https://dsqrstudio.b-cdn.net/Graphics/graphic-service/3.webp',
                  title: 'Vertical Service 4',
                },
                {
                  img: 'https://dsqrstudio.b-cdn.net/Graphics/graphic-service/6%20(1).webp',
                  title: 'Vertical Service 5',
                },
                {
                  img: 'https://dsqrstudio.b-cdn.net/Graphics/graphic-service/6%20(2).webp',
                  title: 'Vertical Service 6',
                },
                {
                  img: 'https://dsqrstudio.b-cdn.net/Graphics/graphic-service/6.webp',
                  title: 'Vertical Service 7',
                },
                {
                  img: 'https://dsqrstudio.b-cdn.net/Graphics/graphic-service/8%20(1).webp',
                  title: 'Vertical Service 8',
                },
                {
                  img: 'https://dsqrstudio.b-cdn.net/Graphics/graphic-service/8%20(2).webp',
                  title: 'Vertical Service 9',
                },
                {
                  img: 'https://dsqrstudio.b-cdn.net/Graphics/graphic-service/8%20(3).webp',
                  title: 'Vertical Service 10',
                },
                {
                  img: 'https://dsqrstudio.b-cdn.net/Graphics/graphic-service/8.webp',
                  title: 'Vertical Service 11',
                },
              ]}
              horizontalServices={[]}
              heading={{
                title1: 'A Glimpse into our',
                title2: 'Visual',
                title3: 'Identity Work',
              }}
              sectionLabel="Types of Design Work"
              subheading="Discover our crafted edits that shape simple footage into cinematic visuals."
            />
          </div>
          <div ref={blackSectionEndRef}>
            <WhySection />
          </div>
          <WorkProcess />

          <FeaturesSection
            title1="Designs That Speak"
            title2="
          Louder"
            subtitle="Scroll-stopping visuals that boost your brand, spark engagement, and 
leave a lasting impact."
            includedFeaturesTitle=" • List of services"
            features={features}
          />

          <TestimonialSection />
          <section
            ref={stopShowingBannerRef}
            id="see-price"
            className="scroll-target px-4 lg:px-8 md:py-12 py-6 max-w-7xl mx-auto"
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
                Endless
                <span className="font-instrument-italic font-extralight ml-2">
                  Designs
                </span>{' '}
                <br />
                <span className="text-black">One Clear Price</span>
              </h2>
              <p className="mt-4 text-gray-600 max-w-xl text-base xl:text-[17px]">
                Get unlimited creative support for one flat monthly fee.
                Predictable, scalable, and hassle-free.
              </p>
            </div>
            <div className="flex justify-center">
              {/* Pricing Card */}
              <Card
                title="Graphic"
                prices={PRICES.Graphic}
                description="Perfect for agencies, marketers & startups with ongoing design needs, from ads and carousels to social posts & more."
                ribbon="value"
                firstFeature="Unlimited Graphic Requests"
                getCheckoutLink={(activeRequest, fastDelivery) =>
                  buildCheckoutLink('Graphic', activeRequest, fastDelivery)
                }
              />{' '}
            </div>
          </section>
          <FAQ faqData={graphicsFaqData} />
          <CalendarSection />
          <ScrollingFooterBanner
            triggerRef={startShowingBannerRef}
            endRef={stopShowingBannerRef}
          />
        </div>
      </motion.div>
    </div>
  )
}
