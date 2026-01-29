// components/WhyOurWork.jsx
'use client'

import Image from "next/image"

export default function WhyOurWork() {
  const cards = [
    {
      title: '11,000+ Videos Delivered',
      desc: 'We’ve created high-performing content for clients across industries consistently, creatively, and at scale.',
    },
    {
      title: 'Lightning-Fast Turnaround',
      desc: 'Most requests are delivered within 1–2 business days perfect for brands that move fast.',
    },
    {
      title: 'Unlimited Revisions',
      desc: 'We tweak until it’s perfect. No limits. No extra charges.',
    },
    {
      title: 'AI + Human Power',
      desc: 'Leverage the speed of AI with the touch of experienced editors and designers.',
    },
    {
      title:  (
    <>
      We Can <br />Do It All!
    </>
  ),
      desc: 'From New Year to Christmas, we get it done, Every season, every challenge - handled. All year long, we can do it!',
      bg: '/images/workBg.webp',
    },
    {
      title: 'Trusted by 300+ Brands',
      desc: 'From startups to influencers to global teams they rely on DSQR Studio to scale their content production.',
    },
  ]

  return (
    <section className="py-4 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Small label */}
      <div className="flex flex-col my-1">
        <div className="flex items-center gap-2 my-2">
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Benefits
          </span>
        </div>
        <span>
          <hr className="text-gray-900 border-gray-300" />
        </span>
      </div>

      {/* Heading */}
      <h2 className="md:text-5xl text-3xl font-semibold tracking-tight mt-7">
        Why Our Work
        <br />
        <span className="font-instrument-italic font-light">
          Delivers Results
        </span>
      </h2>

      {/* Subtitle */}
      <p className="text-gray-400 mt-3 text-base  md:text-lg max-w-lg">
        At DSQR Studio, we combine speed, creativity, and consistency to deliver
        content that fuels brand growth.
      </p>

      {/* Cards grid */}
         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center px-4 mt-10 max-w-7xl mx-auto">
        {cards.map((card, i) =>
          card.bg ? (
            // ✅ Special background card
            <div
              key={i}
              className="relative rounded-xl p-6 flex flex-col items-center justify-center text-center md:h-64 max-w-sm overflow-hidden shadow-xl"
            >
              <Image
                src={card.bg}
                alt="Why our work background"
                fill
                className="object-cover opacity-100"
              />
              <div className="relative z-10 text-black">
                <h3 className="text-2xl md:text-3xl font-bold">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-[#666666] mt-2">
                  {card.desc}
                </p>
              </div>
            </div>
          ) : (
            // ✅ Normal text card
            <div
              key={i}
              className="bg-[#F9F9F9] rounded-xl p-6 flex flex-col items-center justify-center text-center md:h-64 max-w-sm shadow-xl"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                {card.title}
              </h3>
              <p className="text-[#666666] text-sm md:text-base mt-2">
                {card.desc}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  )
}
