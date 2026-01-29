'use client'
import { useState, useEffect, useRef } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { SwitchWithLabel } from './LabeledSwitch'
import { Info } from 'lucide-react'
import {
  motion,
  useMotionValue,
  animate,
  AnimatePresence,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// simple tooltip function inside same file
function TooltipIcon({ content }) {
  const [open, setOpen] = useState(false)

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        className="peer inline-flex h-4 w-4 items-center justify-center rounded-full text-xs"
        aria-label="Info"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
      >
        <Info />{' '}
      </button>

      <div
        className={`absolute right-1 top-full z-20 mt-1 w-36 rounded-md border bg-primary p-2 text-[11px] shadow
          ${open ? 'block' : 'hidden'} peer-hover:block peer-focus:block`}
        role="tooltip"
      >
        {content}
      </div>
    </span>
  )
}

function AnimatedNumber({ value, formatter }) {
  const motionValue = useMotionValue(value)
  const springValue = useSpring(motionValue, { stiffness: 200, damping: 20 })
  const displayValue = useTransform(springValue, (latest) =>
    formatter(Math.round(latest))
  )

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  return <motion.span>{displayValue}</motion.span>
}

export default function Card({
  title = 'Graphic + Video',
  prices = null, // ✅ default prices here
  button = true, // toggle controls
  price = '1773', // single price
  description = 'Ideal for Pros with daily needs. Hire a full time editor for a fraction of the cost.', // new prop
  style = '', // new prop for custom classes
  i = 0, // index for ordering
  className = '',
  // defaultLink = 'https://checkout.stripe.com/c/pay/default-link', // 🔑 add this
  ribbon = 'discount',
  firstFeature = 'Unlimited Graphic + Video Requests', // ✅ prop for first line
  getCheckoutLink,
}) {
  const [publishing, setPublishing] = useState(false)
  const [fastDelivery, setFastDelivery] = useState(false)
  const [activeRequest, setActiveRequest] = useState(2)
  const [showSuccess, setShowSuccess] = useState(false)
  const selectRef = useRef(null)
  const [openActiveRequest, setOpenActiveRequest] = useState(false)

  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/(?:^|;\s*)currency=([^;]*)/)
      if (match) setCurrency(match[1])
    }
  }, [])

  const isAICard = title?.trim().toLowerCase() === 'ai lab'

  // For AI Lab: only check activeRequest === 3 (ignore fastDelivery).
  // For other cards: require fastDelivery to be truthy and activeRequest >= 3.
  const showBestValue = isAICard
    ? activeRequest === 3
    : fastDelivery && activeRequest === 3

  // condition for showing ribbon
  // const showBestValue = activeRequest === 3 && fastDelivery
  // const basePrices = { 1: 1000, 2: 1773, 3: 2500 }

  const checkoutLinks = {
    1000: 'https://checkout.stripe.com/c/pay/cs_live_b1dQPZxKxSCgxKln4qNYkJHyAIyEtgb0fEtbtRJ7qStCsqBlLG4QYldEy8#fidkdWxOYHwnPyd1blppbHNgWjA0S2FrbnVBS3VhS398TXdmVTJ1TFJ0MjxJcmxvcWAzNFVqVGJUQ0dsd2l3fDdGRlBfSkJTS2oyN38xMmdQfU5jUV9RN0NORH01Z1RcVXBBcUtEdmNBXTddNTVGMW9BYUhONycpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9xd3BgeCUl',
    1773: 'https://checkout.stripe.com/c/pay/cs_live_b1dQPZxKxSCgxKln4qNYkJHyAIyEtgb0fEtbtRJ7qStCsqBlLG4QYldEy8#fidkdWxOYHwnPyd1blppbHNgWjA0S2FrbnVBS3VhS398TXdmVTJ1TFJ0MjxJcmxvcWAzNFVqVGJUQ0dsd2l3fDdGRlBfSkJTS2oyN38xMmdQfU5jUV9RN0NORH01Z1RcVXBBcUtEdmNBXTddNTVGMW9BYUhONycpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9xd3BgeCUl',
    2500: 'https://checkout.stripe.com/c/pay/cs_live_b1dQPZxKxSCgxKln4qNYkJHyAIyEtgb0fEtbtRJ7qStCsqBlLG4QYldEy8#fidkdWxOYHwnPyd1blppbHNgWjA0S2FrbnVBS3VhS398TXdmVTJ1TFJ0MjxJcmxvcWAzNFVqVGJUQ0dsd2l3fDdGRlBfSkJTS2oyN38xMmdQfU5jUV9RN0NORH01Z1RcVXBBcUtEdmNBXTddNTVGMW9BYUhONycpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9xd3BgeCUl',
    '1500-fast':
      'https://checkout.stripe.com/c/pay/cs_live_b1dQPZxKxSCgxKln4qNYkJHyAIyEtgb0fEtbtRJ7qStCsqBlLG4QYldEy8#fidkdWxOYHwnPyd1blppbHNgWjA0S2FrbnVBS3VhS398TXdmVTJ1TFJ0MjxJcmxvcWAzNFVqVGJUQ0dsd2l3fDdGRlBfSkJTS2oyN38xMmdQfU5jUV9RN0NORH01Z1RcVXBBcUtEdmNBXTddNTVGMW9BYUhONycpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9xd3BgeCUl',
    '2273-fast':
      'https://checkout.stripe.com/c/pay/cs_live_b1dQPZxKxSCgxKln4qNYkJHyAIyEtgb0fEtbtRJ7qStCsqBlLG4QYldEy8#fidkdWxOYHwnPyd1blppbHNgWjA0S2FrbnVBS3VhS398TXdmVTJ1TFJ0MjxJcmxvcWAzNFVqVGJUQ0dsd2l3fDdGRlBfSkJTS2oyN38xMmdQfU5jUV9RN0NORH01Z1RcVXBBcUtEdmNBXTddNTVGMW9BYUhONycpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9xd3BgeCUl',
    '3000-fast':
      'https://checkout.stripe.com/c/pay/cs_live_b1dQPZxKxSCgxKln4qNYkJHyAIyEtgb0fEtbtRJ7qStCsqBlLG4QYldEy8#fidkdWxOYHwnPyd1blppbHNgWjA0S2FrbnVBS3VhS398TXdmVTJ1TFJ0MjxJcmxvcWAzNFVqVGJUQ0dsd2l3fDdGRlBfSkJTS2oyN38xMmdQfU5jUV9RN0NORH01Z1RcVXBBcUtEdmNBXTddNTVGMW9BYUhONycpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9xd3BgeCUl',
  }
  const DEFAULT_FEATURES = [
    'Unlimited Revisions',
    'Upgrade or Downgrade Anytime',
    'Dedicated Project Manager',
    'Pause or Cancel Anytime',
    'Unlimited Brands',
    'No Contract',
    'Unlimited User Seats',
    'Monday to Friday Workday',
  ]

  // Use the same pricing as backend
  // const PRICES = {
  //   Graphic: {
  //     1: { base: { USD: 273, CAD: 373 }, fast: { USD: 473, CAD: 573 } },
  //     2: { base: { USD: 573, CAD: 773 }, fast: { USD: 673, CAD: 873 } },
  //     3: { base: { USD: 737, CAD: 973 }, fast: { USD: 773, CAD: 1073 } },
  //   },
  //   Video: {
  //     1: { base: { USD: 473, CAD: 573 }, fast: { USD: 773, CAD: 1073 } },
  //     2: { base: { USD: 673, CAD: 873 }, fast: { USD: 1173, CAD: 1573 } },
  //     3: { base: { USD: 873, CAD: 1173 }, fast: { USD: 1573, CAD: 2173 } },
  //   },
  //   Both: {
  //     1: { base: { USD: 637, CAD: 837 }, fast: { USD: 1037, CAD: 1337 } },
  //     2: { base: { USD: 1037, CAD: 1337 }, fast: { USD: 1537, CAD: 2037 } },
  //     3: { base: { USD: 1337, CAD: 1837 }, fast: { USD: 1937, CAD: 2737 } },
  //   },
  //   AI: {
  //     1: { base: { USD: 1773, CAD: 2473 } },
  //     2: { base: { USD: 2773, CAD: 3773 } },
  //     3: { base: { USD: 3773, CAD: 4973 } },
  //   },
  // }
//personal -----------------------------------------------------
  // const planTitle =
  //   title?.trim() === 'Graphic + Video' ? 'Both' : title?.trim().split(' ')[0] 
  // let currentPrice = 0
  // const planData = PRICES[planTitle]

  // if (planData) {
  //   const tier = planData[activeRequest]
  //   if (tier) {
  //     if (planTitle === 'AI') {
  //       currentPrice = tier.base[currency] || 0
  //     } else {
  //       const priceType = fastDelivery ? 'fast' : 'base'
  //       currentPrice = tier[priceType][currency] || 0
  //     }
  //   } else {
      
  //     const baseVal = Number(tier ?? price)
  //     currentPrice = fastDelivery ? baseVal + 500 : baseVal
  //   }
  // } else {
  //   currentPrice = Number(price)
  // }

  // --- NEW CHECKOUT FUNCTION ---
  // const handleCheckout = () => {
  //   if (activeRequest === '3+') return

  //   // Handle combined "Graphic + Video" as "Both"
  //   let deliveryType = 'base'
  //   if (planTitle !== 'AI' && fastDelivery) {
  //     deliveryType = 'fast'
  //   }

  //   const url = new URL('/checkout', window.location.origin)
  //   url.searchParams.set('plan', planTitle)
  //   url.searchParams.set('tier', String(activeRequest))
  //   url.searchParams.set('currency', currency)
  //   url.searchParams.set('delivery', deliveryType)

  //   window.location.href = url.toString()
  // }
  
  // --- END NEW CHECKOUT FUNCTION ---
//personal -----------------------------------------------------

let currentPrice

  if (prices) {
    const tier = prices?.[activeRequest]
    if (tier && typeof tier === 'object') {
      // 👇 go one level deeper using currency
      const baseVal = Number(tier.base?.[currency] ?? 0)
      const fastVal = Number(tier.fast?.[currency] ?? baseVal)
      currentPrice = fastDelivery ? fastVal : baseVal
    } else {
      // fallback if prices is just numbers (legacy mode)
      const baseVal = Number(tier ?? price)
      currentPrice = fastDelivery ? baseVal + 500 : baseVal
    }
  } else {
    currentPrice = Number(price)
  }

  const checkoutLink = getCheckoutLink
    ? getCheckoutLink(activeRequest, fastDelivery)
    : defaultLink


  // Check for success from Stripe redirect
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.search.includes('session_id')
    ) {
      setShowSuccess(true)
      // Clear query params to avoid showing popup repeatedly
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])
  const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <div
      className={`flex flex-col md:flex-row-reverse gap-4 md:gap-4 p-7 shadow-2xl rounded-2xl border border-gray-300 max-w-[620px] bg-primary ${style} ${className}`}
    >
      {/* Right card */}
      <div className="relative bg-[var(--color-primary)] p-4 rounded-2xl flex flex-col gap-4 w-full md:w-[17rem] overflow-hidden">
        {ribbon === 'discount' && (
          <span className="text-gray-600 text-xs px-2 py-0.5 rounded-full absolute top-4 right-4"></span>
        )}

        <AnimatePresence>
          {showBestValue && (
            <motion.div
              key="best-value"
              initial={{ x: 80, y: -80, opacity: 0, rotate: 45 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 45 }}
              exit={{ x: 80, y: -80, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute md:top-14 top-13 md:-right-[10%] -right-[8%] bg-black text-white 
                         md:text-[9px] text-[8px] font-bold px-8 py-1 shadow-md"
              style={{ transformOrigin: 'top right' }}
            >
              BEST VALUE
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-black">{title}</h3>
          {/* <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            20% off
          </span> */}
        </div>

        {/* description now comes from prop */}
        <div>
          <p className="text-sm text-black/80">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Dropdown */}
          <Select
            open={openActiveRequest}
            onOpenChange={setOpenActiveRequest}
            value={String(activeRequest)}
            onValueChange={(value) =>
              setActiveRequest(value === '3+' ? '3+' : Number(value))
            }
          >
            <SelectTrigger className="h-10 w-[50px] border border-black rounded px-1 text-sm bg-primary cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="text-sm">
              {[1, 2, 3, '3+'].map((n) => (
                <SelectItem
                  key={n}
                  value={String(n)}
                  className="text-sm px-2 py-1"
                >
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Label that opens the dropdown */}
          <span
            className="text-sm font-bold text-black cursor-pointer select-none"
            onClick={() => setOpenActiveRequest(true)}
          >
            Active Request
          </span>

          <TooltipIcon content="We handle a set number of tasks at a time. Backlog tasks begin once an active task is submitted for review." />
        </div>
        {/* Active Request & Lightning Delivery only if button=true */}
        {button && (
          <>
            {activeRequest !== '3+' && (
              <div className="flex items-center gap-2">
                <SwitchWithLabel
                  label="Get Lightning Fast Delivery"
                  checked={fastDelivery}
                  onCheckedChange={setFastDelivery}
                />
                <TooltipIcon content="Get your tasks delivered lightning fast." />
              </div>
            )}
          </>
        )}

        {/* Price */}
        {/* <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-black">
            ${currentPrice.toLocaleString()}
          </p>
          <p className="text-xs text-black/90">Per month</p>
        </div> */}

        {/* Price */}
        {activeRequest === '3+' ? (
          <p className="text-2xl font-bold text-black">Custom</p>
        ) : (
          <div className="flex items-center gap-1">
            <span className="text-3xl font-bold text-black">{currency}</span>
            <p className="text-3xl font-bold text-black">
              <AnimatedNumber
                value={currentPrice}
                duration={1}
                formatter={(n) => n.toLocaleString()}
              />
            </p>
            <p className="text-xs text-black/90 flex leading-3 ">
              {' '}
              Per <br />
              month
            </p>
          </div>
        )}
        {/* Subscribe button */}
        {activeRequest === '3+' ? (
          <a
            href="/contact-us"
            className="bg-black text-[var(--color-primary)] rounded-full py-2 text-center text-lg font-medium hover:bg-black/80 transition block"
          >
            Contact Us
          </a>
        ) : (
          // <button
          //   onClick={handleCheckout} // 🔑 Call the new checkout function
          //   disabled={publishing} // Disable while processing
          //   className="bg-black text-[var(--color-primary)] rounded-full py-2 text-center text-lg font-medium hover:bg-black/80 transition block disabled:opacity-50 cursor-pointer"
          // >
          //               {publishing ? 'Processing...' : 'Subscribe'}         {' '}
          // </button>
          <a
            href={checkoutLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-[var(--color-primary)] rounded-full py-2 text-center text-lg font-medium hover:bg-black/80 transition block"
          >
            Subscribe
          </a>
        )}
      </div>

      {/* Left list */}
      <div className="space-y-4 w-full md:w-auto">
        <h3 className="text-lg font-semibold text-black">This includes:</h3>
        <ul className="space-y-2 text-[14px]">
          {/* First dynamic feature */}
          <li className="flex font-medium items-center gap-2">
            <img src="/images/checkBox.png" className="w-4 h-4 text-black" />
            <span className="text-black">{firstFeature}</span>
          </li>

          {/* Static default features */}
          {DEFAULT_FEATURES.map((item, idx) => (
            <li key={idx} className="flex font-medium items-center gap-2">
              <img src="/images/checkBox.png" className="w-4 h-4 text-black" />
              <span className="text-black">{item}</span>
            </li>
          ))}
        </ul>

        {/* <div className="flex items-center gap-2 mt-4">
          <Switch
            checked={publishing}
            onCheckedChange={setPublishing}
            className="shadow-inner"
          />
          <span className="text-black font-medium">Publishing Services</span>
        </div> */}
      </div>
    </div>
  )
}
