'use client'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

// Default data
const defaultFeatures = [
  { id: '1', text: 'Unlimited Requests & Revisions' },
  { id: '2', text: 'Dedicated Project Manager' },
  { id: '3', text: 'Cancel Anytime' },
  { id: '4', text: 'Fast Turnaround (1-2 Days)' },
  { id: '5', text: 'Source File Ownership' },
  { id: '6', text: 'Unlimited Formats & Sizes' },
  { id: '7', text: 'Personalized Workflow Dashboard' },
  { id: '8', text: 'Weekly Content Volume Scaled' },
  { id: '9', text: 'Stock Assets (Audio & Visuals)' },
  { id: '10', text: 'On-Brand Consistency, Every Time' },
]

export default function FeaturesSection({
  features = defaultFeatures,
  className = '',
  showHeader = true,
  headerBadgeText = 'All Plans include',
  title1 = 'Every Plan. Every Benefit',
  title2 = 'Every Time',
  subtitle = 'No matter which plan you choose, you get our full creative commitment.',
  includedFeaturesTitle = '• Included Features',
}) {
  return (
    <div
      className={className + ' md:py-12 lg:px-8 px-4 py-6 max-w-7xl mx-auto'}
    >
      {/* Header Section - Conditional */}
      {showHeader && (
        <div className="mb-8">
          {/* Header Badge */}
          <div className="flex flex-col my-4">
            <div className="flex items-center gap-2 my-4">
              <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                {headerBadgeText}
              </span>
            </div>
            <hr className="text-gray-900 border-gray-300" />
          </div>

          {/* Title and Subtitle */}
          <div className="text-start">
            {/* Replace this in your component */}
            <h2 className="md:text-5xl text-3xl font-semibold text-gray-900 mb-4 max-w-lg tracking-tight">
              <span className="text-gray-900">{title1}</span>{' '}
              <span className="font-instrument-italic font-extralight">
                {title2}
              </span>
            </h2>

            <p className="text-[#666666] md:text-lg">{subtitle}</p>
          </div>
        </div>
      )}

      {/* Features Card */}
      <div className="bg-primary rounded-2xl p-8 shadow-xl border max-w-4xl mx-auto relative mt-16">
        <motion.span
          className="absolute bg-black md:right-[8%] md:-top-[16%] right-[2%] top-[-5%] text-white text-[13px] sm:text-sm px-3 py-1 md:py-2 rounded-full rotate-3 shadow-lg font-medium"
          initial={{ opacity: 0, y: -30, scale: 0.8 }} // start above
          whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 12 }} // drop in
          viewport={{ once: true, amount: 0.6 }} // trigger when 60% visible
          transition={{
            type: 'spring',
            stiffness: 120, // much softer bounce
            damping: 15, // smoother settling
          }}
        >
          @features
          <span
            className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-0 h-0 
              border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent 
              border-t-[8px] border-t-black"
          ></span>
        </motion.span>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 60 }} // start hidden, lower
          whileInView={{ opacity: 1, y: 0 }} // animate when in view
          viewport={{ once: true, amount: 0.2 }} // trigger when 20% visible
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {includedFeaturesTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <img
                    src="/icons/check.svg"
                    className="w-3 h-3 text-[var(--color-primary)]"
                  />
                </div>
                <span className="text-gray-900 font-medium">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
