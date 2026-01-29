"use client"
import { motion } from 'framer-motion'
const STEPS = [
  {
    id: '01',
    title: 'Submit Your Request',
    description:
      'Tell us what you need, and our team gets started right away.',
  },
  {
    id: '02',
    title: 'We Create Magic',
    description:
      'From concept to design, we craft visuals that bring your brand to life.',
  },
  {
    id: '03',
    title: 'From Draft to Done',
    description:
      'It’s done, dusted, and delivered. All that’s left is to hit publish.',
  },
]
// components/WorkProcess.js
export default function WorkProcess({ steps = STEPS }) {
  return (
    <section className="px-4 lg:px-8 md:py-16 py-6 max-w-7xl mx-auto">
      <div className="flex flex-col my-4">
        <div className="flex items-center gap-2 my-2">
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
          <span className="text-sm sm:text-base font-medium text-gray-400 uppercase tracking-wider">
            Our Work Process
          </span>{' '}
        </div>
        <span>
          {' '}
          <hr className="text-gray-900 border-gray-300" />
        </span>
      </div>
      {/* Section Label */}
      {/* <div className="flex items-center gap-2 mb-2">
        <span className="h-2 w-2 rounded-full bg-lime-500"></span>
        <span className="text-sm uppercase tracking-widest text-gray-600">
          Our Work Process
        </span>
      </div> */}

      {/* Heading */}
      <h2 className="text-3xl sm:text-5xl mb-2 flex flex-col tracking-tight">
        <span className="font-semibold">Bringing Your Creative Ideas</span>
        <span className="font-semibold mb-4">
          to Life,{' '}
          <em className="font-instrument-italic font-extralight">
            {' '}
            Is This Easy{' '}
          </em>
        </span>
      </h2>

      {/* Description */}
      <p className="text-gray-400 max-w-2xl md:text-lg mb-10">
        At DSQR Studio, we combine speed, creativity, and consistency to deliver
        content that fuels brand growth.
      </p>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-16 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 70 }}   // start hidden & below
            whileInView={{ opacity: 1, y: 0 }} // animate when in view
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1, // stagger effect
              ease: 'easeOut',
            }}
            className="bg-gray-100 rounded-xl text-center px-6 py-8 shadow-xl border border-gray-50"
          >
            <h3 className="text-4xl font-bold text-gray-800 mb-2">{step.id}</h3>
            <h4 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h4>
            <p className="text-gray-500 text-md">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
