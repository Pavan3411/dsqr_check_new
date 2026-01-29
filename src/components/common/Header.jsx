'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'

function Dropdown({ label, items = [] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function onEsc(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  const isRich = items.some((it) => it.icon || it.sub)

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="hover:text-black flex items-center gap-1"
      >
        {label}
        <Image
          src="/icons/arrowBottom.svg"
          alt=""
          width={10}
          height={10}
          className="w-3 h-3"
        />
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 z-50 bg-primary border rounded-2xl shadow-xl ${
            isRich
              ? 'left-1/2 -translate-x-1/2 w-[360px] p-3'
              : 'left-0 w-44 py-1'
          }`}
        >
          {items.map((item, i) =>
            isRich ? (
              <Link
                key={i}
                href={item.href}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition"
                onClick={() => setOpen(false)}
              >
                <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Image src={item.icon} alt="" width={22} height={22} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.label}</p>
                  {item.sub && (
                    <p className="text-sm text-gray-500">{item.sub}</p>
                  )}
                </div>
              </Link>
            ) : (
              <Link
                key={i}
                href={item.href}
                className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { scrollY } = useScroll()
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const servicePaths = ['/video', '/graphics', '/ai-lab']
  const morePaths = ['/about-us', '/career', '/contact-us', '/affiliates']
  const handleBookCall = () => {
    if (document.getElementById('book-call')) {
      document
        .getElementById('book-call')
        ?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/video?scroll=book-call')
    }
  }

  // Simplified scroll listener
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious()
    const delta = latest - previous

    // Early return if scrolling up and already visible
    if (delta < 0 && !hidden) {
      return
    }

    if (latest < 50) {
      setHidden(false)
    } else if (delta > 0 && latest > 50) {
      // Scrolling down
      setHidden(true)
    } else if (delta < 0) {
      // Scrolling up
      setHidden(false)
    }
  })
  // Add this useEffect to control body scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to reset the style if the component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  // Add this useEffect to close menu on route change
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false)
    }
  }, [pathname])

  // Close menu if user clicks the same route again
  useEffect(() => {
    const handleLinkClick = (e) => {
      const link = e.target.closest('a')
      if (link && link.getAttribute('href') === pathname) {
        e.preventDefault()
        setMenuOpen(false)
      }
    }

    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-3 md:top-6 w-full ${
          hidden ? 'pointer-events-none' : 'pointer-events-auto'
        } z-50`}
        // ensure header sits above other elements
        // style={{ WebkitTransform: 'translateZ(0)' }}
      >
        <motion.div
          variants={{ visible: { y: 0 }, hidden: { y: '-150%' } }}
          animate={hidden ? 'hidden' : 'visible'}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className={`py-2 px-2 pr-4 bg-gray-100 rounded-full backdrop-blur-sm shadow-sm flex items-center justify-between max-w-5xl xl:mx-auto mx-4 ${
            hidden ? 'pointer-events-none' : ''
          }`}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={50}
                  height={50}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
            <div className="relative z-50">
              <Dropdown
                label="Services"
                items={[
                   {
                    label: 'Graphic Design',
                    href: '/graphics',
                    icon: '/icons/graphicIcon.svg',
                    sub: 'Creative visuals designed to stand out.',
                  },
                  {
                    label: 'Video Editing',
                    href: '/video',
                    icon: '/icons/videoIcon.svg',
                    sub: 'Turn clips into captivating stories.',
                  },
                  {
                    label: 'AI Lab',
                    href: '/ai-lab',
                    icon: '/icons/aiIcon.svg',
                    sub: 'Next-gen content powered by AI.',
                  },
                ]}
              />
            </div>
            <Link
              href="/our-work"
              className={`hover:text-black ${
                pathname === '/our-work' ? 'text-black' : ''
              }`}
            >
              Our Work
            </Link>

            <Link
              href="/why-us"
              className={`hover:text-black ${
                pathname === '/why-us' ? 'text-black' : ''
              }`}
            >
              Why Us
            </Link>

            <Link
              href="/pricing"
              className={`hover:text-black ${
                pathname === '/pricing' ? 'text-black' : ''
              }`}
            >
              Pricing
            </Link>

            <Dropdown
              label="More"
              items={[
                { label: 'About Us', href: '/about-us' },
                { label: 'Careers', href: '/career' },
                { label: 'Contact Us', href: '/contact-us' },
                { label: 'Affiliates', href: '/affiliates' },
              ]}
            />
          </nav>

          {/* Desktop Book a Call */}
          <div className="hidden md:block">
            <button
              className="bg-[var(--color-primary)] text-black px-4 py-2 rounded-full text-sm font-medium transition relative overflow-hidden group cursor-pointer"
              onClick={handleBookCall}
            >
              Book a call
              {/* Shiny effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(true)}>
              <Image src="/icons/menu.svg" alt="Menu" width={24} height={24} />
            </button>
          </div>
        </motion.div>
      </header>
      {/* Mobile Fullscreen Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 w-full h-full bg-primary z-50 transform transition-transform duration-300 flex flex-col ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ... mobile menu unchanged ... */}
        <div className="flex justify-between items-center p-4 border-b">
          <Link href="/">
            <div className="w-[40px] h-[40px] flex items-center justify-center">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                priority
              />
            </div>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-black text-3xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col divide-y text-lg font-medium">
            <div className="px-4 py-3">
              <button
                className="flex items-center justify-between w-full font-semibold"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <Image
                  src="/icons/arrowBottom.svg"
                  width={18}
                  height={18}
                  alt="arrow"
                  className={`transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              {servicesOpen && (
                <div className="flex flex-col mt-3 space-y-3 pl-2">
                  <Link
                    href="/graphics"
                    className={`flex items-start gap-3 ${
                      pathname === '/graphics'
                        ? 'text-[var(--color-primary)]'
                        : ''
                    }`}
                  >
                    <Image
                      src="/icons/graphicIcon.svg"
                      alt="icon"
                      width={20}
                      height={20}
                    />
                    <span>
                      <p className="font-medium text-sm">Graphic Design</p>
                      <p className="text-xs text-gray-500">
                       Creative visuals designed to stand out.
                      </p>
                    </span>
                  </Link>
                  <Link
                    href="/video"
                    className={`flex items-start gap-3 ${
                      pathname === '/video' ? 'text-[var(--color-primary)]' : ''
                    }`}
                  >
                    <Image
                      src="/icons/videoIcon.svg"
                      alt="icon"
                      width={20}
                      height={20}
                    />
                    <span>
                      <p className="font-medium text-sm">Video Editing</p>
                      <p className="text-xs text-gray-500">
                        Turn clips into captivating stories.
                      </p>
                    </span>
                  </Link>
                  <Link
                    href="/ai-lab"
                    className={`flex items-start gap-3 ${
                      pathname === '/ai-lab'
                        ? 'text-[var(--color-primary)]'
                        : ''
                    }`}
                  >
                    <Image
                      src="/icons/aiIcon.svg"
                      alt="icon"
                      width={20}
                      height={20}
                    />
                    <span>
                      <p className="font-medium text-sm">AI Lab</p>
                      <p className="text-xs text-gray-500">
                        Next-gen content powered by AI.
                      </p>
                    </span>
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/our-work"
              className={`px-4 py-3 ${
                pathname === '/our-work' ? 'text-[var(--color-primary)]' : ''
              }`}
            >
              Our Work
            </Link>

            <Link
              href="/why-us"
              className={`px-4 py-3 ${
                pathname === '/why-us' ? 'text-[var(--color-primary)]' : ''
              }`}
            >
              Why Us
            </Link>
            <Link
              href="/pricing"
              className={`px-4 py-3 ${
                pathname === '/pricing' ? 'text-[var(--color-primary)]' : ''
              }`}
            >
              Pricing
            </Link>

            <div className="px-4 py-3">
              <button
                className="flex items-center justify-between w-full font-semibold"
                onClick={() => setMoreOpen(!moreOpen)}
              >
                More
                <Image
                  src="/icons/arrowBottom.svg"
                  width={18}
                  height={18}
                  alt="arrow"
                  className={`transition-transform duration-200 ${
                    moreOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              {moreOpen && (
                <div className="flex flex-col mt-3 space-y-3 pl-2">
                  <Link
                    href="/about-us"
                    className={`${
                      pathname === '/about-us'
                        ? 'text-[var(--color-primary)]'
                        : ''
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/career"
                    className={`${
                      pathname === '/career'
                        ? 'text-[var(--color-primary)]'
                        : ''
                    }`}
                  >
                    Careers
                  </Link>
                  <Link
                    href="/contact-us"
                    className={`${
                      pathname === '/contact-us'
                        ? 'text-[var(--color-primary)]'
                        : ''
                    }`}
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/affiliates"
                    className={`${
                      pathname === '/affiliates'
                        ? 'text-[var(--color-primary)]'
                        : ''
                    }`}
                  >
                    Affiliates
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="p-4 space-y-3 border-t">
          <Link
            href="/pricing"
            className="block w-full text-center bg-[var(--color-primary)] text-black font-medium py-3 rounded-full"
          >
            See plans & Pricing
          </Link>
          <button
            onClick={async () => {
              setMenuOpen(false)
              // optional tiny delay so the menu starts to close before navigation/scroll
              await new Promise((r) => setTimeout(r, 80))
              handleBookCall()
            }}
            className="block w-full text-center border border-black text-black font-medium py-3 rounded-full"
          >
            Book a call
          </button>
        </div>
      </div>
    </>
  )
}
