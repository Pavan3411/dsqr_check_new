'use client'
import { useState, useEffect, useRef } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './calendar-custom.css'
import FreeTrialForm from '@/components/common/FreeTrialForm'

const iconsData = [
  {
    id: 1,
    component: <img src="/images/w1.png" alt="icon1" className="w-20 h-20" />,
  },
  {
    id: 2,
    component: <img src="/images/w2.png" alt="icon2" className="w-20 h-20" />,
  },
  {
    id: 3,
    component: <img src="/images/w3.png" alt="icon3" className="w-20 h-20" />,
  },
  {
    id: 4,
    component: <img src="/images/w4.png" alt="icon4" className="w-20 h-20" />,
  },
  {
    id: 5,
    component: <img src="/images/w5.png" alt="icon5" className="w-20 h-20" />,
  },
  {
    id: 6,
    component: <img src="/images/w6.png" alt="icon6" className="w-20 h-20" />,
  },
  {
    id: 7,
    component: <img src="/images/w7.png" alt="icon7" className="w-20 h-20" />,
  },
  {
    id: 8,
    component: <img src="/images/w8.png" alt="icon8" className="w-20 h-20" />,
  },
]

function IconBubble({ x, y, angle, children }) {
  const style = {
    position: 'absolute',
    left: 0,
    top: 0,
    transform: `translate(${Math.round(x - 48)}px, ${Math.round(
      y - 48
    )}px) rotate(${(angle || 0) * (180 / Math.PI)}deg)`,
    width: 96,
    height: 96,
    pointerEvents: 'none',
    display: x === undefined ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  return (
    <div style={style} className="rounded-full shadow-xl" aria-hidden>
      <div
        style={{ width: 74, height: 74, borderRadius: 9999 }}
        className="bg-neutral-900 flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  )
}

export function FallingIcons({ containerHeight = 360, hideOnMobile = false }) {
  const containerRef = useRef(null)
  const engineRef = useRef(null)
  const worldRef = useRef(null)
  const bodiesRef = useRef([])
  const [iconPositions, setIconPositions] = useState([])
  const [inView, setInView] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // intersection observer to trigger animation only once
  useEffect(() => {
    if (!containerRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  // initialize matter engine using dynamic import (client-side only)
  useEffect(() => {
    let cancel = false
    let rafId = null

    async function init() {
      if (!inView || !containerRef.current) return
      // dynamic import ensures this runs only in client environments
      const Matter = await import('matter-js')

      if (cancel) return

      // create engine + world
      const engine = Matter.Engine.create()
      engine.gravity.y = 1
      engineRef.current = engine
      const world = engine.world
      worldRef.current = world

      const { width } = containerRef.current.getBoundingClientRect()
      const height =
        containerHeight ||
        containerRef.current.getBoundingClientRect().height ||
        360

      // walls
      const ground = Matter.Bodies.rectangle(
        width / 2,
        height + 650,
        width,
        900,
        { isStatic: true }
      )
      const leftWall = Matter.Bodies.rectangle(
        -200,
        height / 2,
        400,
        height * 2,
        { isStatic: true }
      )
      const rightWall = Matter.Bodies.rectangle(
        width + 200,
        height / 2,
        400,
        height * 2,
        { isStatic: true }
      )
      Matter.World.add(world, [ground, leftWall, rightWall])

      // create bodies (same radius for all, but randomized position & motion)
      const bodies = []
      bodiesRef.current = bodies

      // Loop through each icon and drop it with a delay
      iconsData.forEach((icon, i) => {
        setTimeout(() => {
          // Ensure the component hasn't been unmounted
          if (cancel || !worldRef.current) return

          const x = Math.random() * width
          const y = -100 - Math.random() * 200
          const radius = 48 // Or your new radius (e.g., 60)

          const body = Matter.Bodies.circle(x, y, radius, {
            restitution: 0.6,
            friction: 0.3,
            density: 0.01,
          })

          Matter.Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 4,
            y: 0,
          })
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2)

          // Add the new body to the world and our ref array
          Matter.World.add(world, body)
          bodies.push(body)
        }, i * 150) // Stagger each icon drop by 150ms
      })

      // animation loop
      const loop = () => {
        Matter.Engine.update(engine, 1000 / 60)
        const newPositions = bodiesRef.current.map((b, i) => ({
          id: iconsData[i].id,
          component: iconsData[i].component,
          x: b.position.x,
          y: b.position.y,
          angle: b.angle,
        }))
        setIconPositions(newPositions)
        rafId = requestAnimationFrame(loop)
      }
      loop()
    }

    init()

    return () => {
      cancel = true
      if (rafId) cancelAnimationFrame(rafId)
      if (engineRef.current) {
        try {
          // clear world safely
          engineRef.current.world.bodies = []
          engineRef.current = null
        } catch (e) {
          /* ignore */
        }
      }
    }
  }, [inView, containerHeight])

  useEffect(() => {
    if (!hideOnMobile) return // skip check if we don't want to hide on mobile
    const checkWidth = () => setIsVisible(window.innerWidth >= 1024)
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [hideOnMobile])

  if (hideOnMobile && !isVisible) return null // hide only if prop true and below 640

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {iconPositions.map((icon) => (
        <IconBubble key={icon.id} x={icon.x} y={icon.y} angle={icon.angle}>
          {icon.component}
        </IconBubble>
      ))}
    </div>
  )
}

/* ---------------- Calendar Section ---------------- */
export default function CalendarSection() {
  const [value, setValue] = useState(new Date())
  const [open, setOpen] = useState(false)

  return (
    <section
      id="book-call"
      className="scroll-target bg-[#100C08] text-white xl:py-16 xl:pb-0 py-6 pb-0 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto lg:px-8 px-4 flex flex-col md:flex-row md:items-start md:justify-between items-start justify-start gap-10">
        {/* Left content with falling icons */}
        <div className="relative max-w-xl space-y-4 animate-fadeIn">
          <FallingIcons hideOnMobile />
          <div className="relative z-10">
            <h2 className="md:text-5xl text-3xl font-semibold tracking-tight">
              Let’s Make Magic <br />
              <span className="font-instrument-italic font-extralight">
                Together
              </span>
            </h2>
            <p className="text-gray-100 xl:text-xl mt-4">
              No contracts, No delays just consistent, high-quality content when
              you need it.
            </p>
            <p className="text-gray-100 xl:text-xl">
              Schedule a Quick Demo Call, Your exclusive deals are just one
              click away.
            </p>
            <div className="flex gap-4 mt-6 text-sm xl:text-base">
              <div className="group inline-block">
                <button
                  className="relative overflow-hidden bg-[var(--color-primary)] hover:bg-[#cfee04] text-black font-medium px-6 py-2 rounded-full shadow-md cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <span className="relative z-10">Start Your Free Trial</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                <FreeTrialForm open={open} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </div>

        {/* Calendar/iframe right section (unchanged) */}
        <div className="rounded-3xl px-1 pb-1 shadow-lg animate-slideUp w-full">
          <div className="rounded-2xl pb-1 text-white w-full flex">
            <iframe
              src="https://connect.dsqrstudio.com/widget/booking/9uBRfyYTDCwgpb9q0yz0"
              style={{
                width: '100%',
                border: 'none',
                overflow: 'scroll',
                height: '620px',
                display: 'flex',
              }}
              scrolling="yes"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
