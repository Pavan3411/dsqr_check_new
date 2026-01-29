'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Confetti from 'react-confetti'

export default function SuccessPage() {
  const search = useSearchParams()
  const router = useRouter()
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  })
  const [countdown, setCountdown] = useState(5)
  const [showConfetti, setShowConfetti] = useState(false)

  const statusParam = search.get('redirect_status')
  const paymentIntentId = search.get('pi') || search.get('payment_intent') // support Stripe redirect param
  const sessionId = search.get('session_id') // Stripe Checkout Session flow

  // Get plan details from URL
  const planParam = search.get('plan')
  const tierParam = search.get('tier')
  const deliveryParam = search.get('delivery')
  const priceParam = search.get('price')
  const currencyParam = search.get('currency') || 'USD'

  const [validated, setValidated] = useState(false)
  const [status, setStatus] = useState('pending')
  const [validationError, setValidationError] = useState('')
  const [planDetails, setPlanDetails] = useState(null)

  const heading =
    status === 'succeeded'
      ? 'Payment Successful!'
      : status === 'processing'
      ? 'Payment Processing'
      : 'Validating Payment'
  const subText =
    status === 'succeeded'
      ? 'Thank you for your purchase! Excited to have you on-board 😊'
      : status === 'processing'
      ? "We're processing your payment now."
      : 'Hold tight while we verify your payment details.'

  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    // Trigger confetti only after validation confirms success
    if (status === 'succeeded') setShowConfetti(true)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [status])

  // Validate the payment intent or checkout session
  useEffect(() => {
    const validate = async () => {
      // Require at least one identifier
      if (!paymentIntentId && !sessionId) {
        setValidationError('Missing payment reference.')
        setStatus('invalid')
        return
      }

      // If redirect_status is succeeded, set status immediately to avoid loading state
      if (statusParam === 'succeeded') {
        setStatus('succeeded')
        setValidated(true)

        // Set plan details from URL params if available (fallback)
        if (planParam) {
          setPlanDetails({
            plan: planParam,
            tier: parseInt(tierParam || '1'),
            delivery: deliveryParam || 'base',
            amount: null, // Will be fetched from API
            currency: currencyParam,
          })
        }
      }

      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        let url, type
        if (paymentIntentId) {
          url = `${API_BASE}/api/checkout/verify-payment-intent?pi=${paymentIntentId}`
          type = 'pi'
        } else {
          url = `${API_BASE}/api/checkout/verify-checkout-session?session_id=${sessionId}`
          type = 'cs'
        }
        const res = await fetch(url)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Verification failed')
        if (!data.valid) {
          setStatus('invalid')
          setValidationError('Payment not completed.')
        } else {
          // Stripe PaymentIntent statuses: succeeded, processing, requires_action
          if (type === 'pi') {
            setStatus(data.status === 'succeeded' ? 'succeeded' : data.status)
            // Extract plan details from metadata (preferred source)
            if (data.metadata) {
              setPlanDetails({
                plan: data.metadata.plan || planParam,
                tier: parseInt(data.metadata.tier || tierParam || '1'),
                delivery: data.metadata.delivery || deliveryParam || 'base',
                amount: data.amount,
                currency: data.currency || currencyParam,
              })
            }
          } else {
            setStatus(
              data.payment_status === 'paid' ? 'succeeded' : data.payment_status
            )
          }
        }
      } catch (err) {
        // If already set to succeeded from URL param, don't override with error
        if (statusParam !== 'succeeded') {
          setValidationError(err.message)
          setStatus('invalid')
        }
      } finally {
        setValidated(true)
      }
    }
    validate()
  }, [
    paymentIntentId,
    sessionId,
    statusParam,
    planParam,
    tierParam,
    deliveryParam,
    currencyParam,
  ])

  // Removed countdown-based auto-redirect. Modal will only close on cross button click.

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden bg-gray-50">
      {/* Confetti - starts immediately */}
      {status === 'succeeded' && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          colors={['#cff000', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f']}
        />
      )}

      {/* Modal with enhanced shadow */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-6 sm:p-8 md:p-10 text-center relative z-10 animate-fade-in">
        {/* Success Icon */}
        <div className="mx-auto mb-6 h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-[#cff000] to-[#a3e635] flex items-center justify-center animate-scale-in shadow-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 sm:h-12 sm:w-12 text-gray-900"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900">
          {heading}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
          {subText}
        </p>

        {status === 'succeeded' && planDetails && (
          <div className="mb-6 p-4 bg-gradient-to-br from-[#cff000]/20 to-[#a3e635]/10 border-2 border-[#cff000] rounded-xl">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Order Summary
            </p>
            <div className="text-left space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Plan:</span>
                <span className="text-sm font-bold text-gray-900">
                  {planDetails.plan} - {planDetails.tier} Active Request
                  {planDetails.tier > 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Delivery:</span>
                <span className="text-sm font-bold text-gray-900">
                  {planDetails.delivery === 'fast'
                    ? 'Fast Delivery'
                    : 'Standard Delivery'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                <span className="text-base font-bold text-gray-900">
                  Total Paid:
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {planDetails.amount
                    ? `${planDetails.currency.toUpperCase()} ${(
                        planDetails.amount / 100
                      ).toFixed(2)}`
                    : 'Processing...'}
                </span>
              </div>
            </div>
          </div>
        )}

        {status === 'invalid' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-700 font-medium">
              {validationError || 'Invalid payment reference.'}
            </p>
            <button
              className="mt-4 px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={() => router.push('/pricing')}
            >
              Return to Pricing
            </button>
          </div>
        )}

        {status === 'succeeded' && (
          <>
            {/* What's next section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-5 mb-6 border border-gray-200 shadow-inner">
              <p className="text-sm font-semibold text-gray-900 mb-3">
                What&apos;s next?
              </p>
              <ul className="text-xs sm:text-sm text-left text-gray-700 space-y-2.5">
                <li className="flex items-start">
                  <span className="text-[#cff000] mr-2 mt-0.5 font-bold text-base">
                    ✓
                  </span>
                  <span>Check your inbox for payment confirmation receipt</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#cff000] mr-2 mt-0.5 font-bold text-base">
                    ✓
                  </span>
                  <span>Our team will contact you within 24hrs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#cff000] mr-2 mt-0.5 font-bold text-base">
                    ✓
                  </span>
                  <span>
                    You will be provided with your personalized dashboard
                  </span>
                </li>
              </ul>
            </div>
            {/* Countdown timer removed, replaced with close button */}
          </>
        )}

        {/* Cross button to close modal and redirect to home */}
        {status === 'succeeded' && (
          <button
            aria-label="Close"
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-4xl font-bold focus:outline-none"
            onClick={() => router.push('/')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        )}

        {/* Contact info */}
        <p className="text-xs text-gray-500">
          Need help? Contact us at{' '}
          <a
            href="mailto:hello@dsqrstudio.com"
            className=" hover:text-[#cff000] underline font-medium transition-colors"
          >
            hello@dsqrstudio.com
          </a>
        </p>
      </div>
    </div>
  )
}
