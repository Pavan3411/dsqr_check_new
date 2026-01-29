'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const footerRef = useRef(null)
  const router = useRouter()

  const goToBrolls = () => {
    router.push('/our-work', {
      state: { tab: 'AI Lab', category: 'AI-Powered Video' },
    })
  }

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/submitForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          sheetName: 'Subscribe', // 👈 writes to Subscribe tab
        }),
      })

      if (res.ok) {
        setSuccess(true)
        setEmail('')
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const container = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.12,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  const links = {
    Explore: [
      { text: 'Home', href: '/' },
      { text: 'Video Editing', href: '/video' },
      { text: 'Graphic Design', href: '/graphics' },
      { text: 'AI Content', href: 'ai-lab' },
      { text: 'Our Work', href: 'our-work' }, // Example anchor link
      { text: 'Pricing', href: 'pricing' }, // Example anchor link
    ],
    Company: [
      { text: 'Why Us', href: '/why-us' },
      { text: 'About Us', href: '/about-us' },
      { text: 'Careers', href: '/career' },
      { text: 'Affiliates', href: '/affiliates' },
      { text: 'Contact Us', href: '/contact-us' },
      {
        text: 'Terms & Conditions',
        href: '/terms-of-service',
      },
      { text: 'Privacy Policy', href: '/privacy-policy' },
    ],
    'What We Do': [
      {
        text: 'Graphic Design',
        href: '/our-work',
        tab: 'Graphics',
        category: 'Ad creatives', // your real category name in sections["Graphics"]
      },
      {
        text: 'Long-Form Edits',
        href: '/our-work',
        tab: 'Videos',
        category: 'Long form edits', // your real category name
      },
      {
        text: 'Podcast Intro',
        href: '/our-work',
        tab: 'Videos',
        category: 'Podcast Intro',
      },
      {
        text: 'Text Based',
        href: '/our-work',
        tab: 'Videos',
        category: 'Text Based',
      },
      {
        text: 'Thumbnail Design',
        href: '/our-work',
        tab: 'Graphics',
        category: 'Blog thumbnails',
      },
      {
        text: 'Talking Head Video',
        href: '/our-work',
        tab: 'Videos',
        category: 'Talking Heads',
      },
      {
        text: 'AI Powered Content',
        href: '/our-work',
        tab: 'AI Lab',
        category: 'AI-Powered Video',
      },
    ],
  }
  const pathname = usePathname()
  const handleFooterClick = (link) => {
    // Check if the link has tab and category data
    if (link.tab && link.category) {
      // Create a URL with search parameters
      const params = new URLSearchParams()
      params.set('tab', link.tab)
      params.set('category', link.category)

      // Always navigate to the new URL. This will trigger the update.
      router.push(`/our-work?${params.toString()}`)
      return
    }

    // Fallback for all other regular links
    if (link.href) {
      router.push(link.href)
    }
  }

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[var(--color-primary)] font-figtree"
    >
      <div className="bg-primary rounded-b-[36px] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 md:gap-24 py-8 px-4 lg:px-8">
            {/* Left Column */}
            <motion.div
              className="lg:w-1/3"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="space-y-6" variants={item}>
                <div className="flex items-center gap-4">
                  <Link href="/" >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center">
                    <Image
                      src="/images/logo.svg"
                      alt="Logo"
                      width={56}
                      height={56}
                    />
                  </div></Link>
                  <span className="text-2xl md:text-3xl font-semibold text-black tracking-tight font-sans">
                    DSQR Studio
                  </span>
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold mb-2">
                    Subscribe
                  </h4>
                  <p className="text-sm md:text-base text-gray-500">
                    Subscribe to receive updates, creative tips, and special
                    offers.
                  </p>
                  <form
                    onSubmit={handleSubscribe}
                    className="flex items-center mt-4 max-w-md"
                  >
                    <Input
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-gray-100 placeholder-gray-400 px-4 py-2 text-sm md:text-base rounded-full border border-transparent focus:outline-none"
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="ml-3 bg-[var(--color-primary)] hover:brightness-95 px-4 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 text-black hover:text-white cursor-pointer"
                    >
                      {loading ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  </form>
                  {success && (
                    <p className="text-green-600 text-sm mt-2">
                      ✅ Subscribed successfully!
                    </p>
                  )}
                </div>
                <div className="space-y-3 mt-2 text-sm md:text-base text-gray-700">
                  <motion.div
                    className="flex items-center gap-3"
                    variants={item}
                  >
                    <img src="/icons/location.svg" alt="" className="w-4 h-4" />
                    <span>Hamilton, Ontario, Canada</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center text-sm md:text-base gap-3"
                    variants={item}
                  >
                    <img
                      src="/icons/mail.svg"
                      alt="Email"
                      className="w-4 h-4"
                    />
                    <a
                      href="mailto:hello@dsqrstudio.com"
                      className="hover:underline"
                    >
                      hello@dsqrstudio.com
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            {/* (same as before, unchanged) */}
            <motion.div
              className="lg:w-2/3"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Desktop Grid */}
              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-3 gap-8 md:gap-12 md:justify-between">
                {Object.entries(links).map(([title, items], i) => (
                  <div key={title + i}>
                    <h4 className="text-lg font-semibold mb-4 text-black">
                      {title}
                    </h4>

                    <motion.ul
                      className="space-y-3 text-sm md:text-base text-gray-600 md:space-y-2 font-medium"
                      variants={container}
                    >
                      {items.map((link, idx) => (
                        <li
                          key={`${title}-${link.text}-${idx}`}
                          className="list-none"
                        >
                          {/* If the link has tab/category we want the special handler, otherwise just navigate */}
                          <button
                            type="button"
                            onClick={() => handleFooterClick(link)}
                            className="block text-left hover:text-black transition-colors duration-300 cursor-pointer"
                          >
                            {link.text}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  </div>
                ))}
              </div>

              {/* Mobile Accordion */}
              <div className="md:hidden space-y-4 border-t sm:border-none border-gray-200">
                <Accordion type="multiple" className="space-y-0">
                  {Object.entries(links).map(([title, items], i) => (
                    <div
                      key={i}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <AccordionItem value={title} defaultOpen={false}>
                        <AccordionTrigger className="text-lg font-semibold">
                          {title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 text-base text-gray-600 font-medium">
                            {items.map((link, j) => (
                              <li
                                key={j}
                                className="truncate"
                                title={link.text}
                              >
                                <button
                                  onClick={() => handleFooterClick(link)}
                                  className="block w-full text-left hover:text-black transition-colors duration-300"
                                >
                                  {link.text}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <div className="px-4 lg:px-8">
            <motion.div
              className="md:border-t md:border-gray-200 my-3 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 "
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="text-sm md:text-base text-gray-500"
                variants={item}
              >
                © 2025 DSQR Studio. All rights reserved. | Built with{' '}
                <span aria-hidden>❤️</span> by DSQR Studio
              </motion.div>
              <div className="flex items-center justify-start md:justify-end gap-4">
                {[
                  {
                    name: 'Instagram',
                    url: 'https://www.instagram.com/dsqrstudio/',
                  },
                  {
                    name: 'facebook',
                    url: 'https://www.facebook.com/profile.php?id=61551801632939',
                  },
                  {
                    name: 'LinkedIn',
                    url: 'https://www.linkedin.com/company/dsqr-studio-inc/',
                  },
                ].map((icon, i) => (
                  <motion.a
                    key={i}
                    href={icon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 transition-transform hover:scale-110"
                    variants={item}
                  >
                    <img src={`/icons/${icon.name}.svg`} alt={icon.name} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <motion.div
        className="bg-[var(--color-primary)] text-black py-3 text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 font-sans ">
          <Link href="/pricing">
            <motion.span
              className="block text-2xl md:text-3xl font-semibold tracking-tight"
              variants={item}
            >
              Get Started Now →
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </footer>
  )
}
