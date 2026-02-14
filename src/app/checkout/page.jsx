// 'use client'

// import React, { useEffect, useMemo, useState, useCallback } from 'react'
// import { loadStripe } from '@stripe/stripe-js'
// // import Drawer from '@mui/material/Drawer';
// // import { Box } from '@mui/material';
// import {
//   Elements,
//   PaymentElement,
//   AddressElement,
//   useElements,
//   useStripe,
// } from '@stripe/react-stripe-js'
// import { useSearchParams, useRouter } from 'next/navigation'
// // import {
// //   getExpectedPrice,
// //   formatMoney,
// //   AUTHORITATIVE_PRICES,
// // } from '@/lib/pricing'
// // import { useRouter } from 'next/navigation'
// import Image from 'next/image'
// import useEmblaCarousel from 'embla-carousel-react'
// import Autoplay from 'embla-carousel-autoplay'
// import { Info } from 'lucide-react'
// import Drawer from '@mui/material/Drawer'
// import Box from '@mui/material/Box'
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogClose,
// } from '@/components/ui/dialog'

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
// )

// // Tooltip component matching Card.jsx pattern
// function TooltipIcon({ content, position = 'center' }) {
//   const [open, setOpen] = useState(false)

//   const positionClasses =
//     position === 'right'
//       ? 'left-full ml-1 top-1/2 -translate-y-1/2'
//       : 'left-1/2 -translate-x-1/2 top-full mt-1'

//   return (
//     <span className="relative inline-flex items-center">
//       <button
//         type="button"
//         className="peer inline-flex h-4 w-4 items-center justify-center rounded-full text-xs"
//         aria-label="Info"
//         onClick={() => setOpen((o) => !o)}
//         onBlur={() => setOpen(false)}
//       >
//         <Info className="w-3 h-3 text-gray-400" />
//       </button>

//       <div
//         className={`absolute ${positionClasses} z-[9999] min-w-[140px] max-w-[260px] rounded-md border bg-white p-2 text-[12px] leading-snug shadow-lg
//           ${
//             open ? 'block' : 'hidden'
//           } peer-hover:block peer-focus:block tooltip-content`}
//         role="tooltip"
//         style={{
//           whiteSpace: 'pre-line',
//           wordBreak: 'break-word',
//           overflowWrap: 'break-word',
//           maxHeight: '160px',
//           overflowY: 'auto',
//           boxSizing: 'border-box',
//           padding: '8px 12px',
//         }}
//       >
//         {content}
//       </div>
//     </span>
//   )
// }

// // Testimonials shown on checkout — sourced from the site's real testimonials
// const TESTIMONIALS = [
//   {
//     id: 1,
//     name: 'Joshua Jacopetti',
//     role: 'Home Health',
//     image: '/images/Joshua.jpg',
//     quote:
//       "Fantastic service. Deliver on what they say they will. First video knocked it out. I've had other companies and the review is always a pain. GREAT JOB",
//   },
//   {
//     id: 2,
//     name: 'Terry Manzi',
//     role: 'Three Entertainment Group',
//     image: '/images/Terry.png',
//     quote: 'Fantastic service. Deliver on what they say they will.',
//   },
//   {
//     id: 3,
//     name: 'SAMIN',
//     role: 'Bookedin AI',
//     image: '/images/Samin.jpg',
//     quote:
//       'Been great working with these guys, always super fast and does what I want quickly.',
//   },
//   {
//     id: 4,
//     name: 'PAVEL',
//     role: 'The Forbidden Fruit',
//     image: '/images/Pavel.jpg',
//     quote:
//       'Great experience working with the team. Love the edits and attention to detail. Quality was top-notch, would recommend.',
//   },
// ]

// // Default recommendations fallback (used if Stripe returns none)
// const DEFAULT_RECOMMENDATIONS = [
//   {
//     id: 'fallback-1',
//     title: 'Double your output',
//     activeReq: 2,
//     price: 200,
//     features: ['Fast Delivery', 'Graphic design'],
//   },
//   {
//     id: 'fallback-2',
//     title: 'Triple your productivity',
//     activeReq: 3,
//     price: 400,
//     features: ['Fast Delivery', 'Video editing'],
//   },
// ]

// function CheckoutForm({
//   returnUrl,
//   onTaxUpdate,
//   plan,
//   selectedTier,
//   selectedDelivery,
//   currency,
//   promoApplied,
//   promoData,
//   loading,
//   setLoading,
// }) {
//   const [error, setError] = useState('')
//   const [email, setEmail] = useState('')
//   const [phone, setPhone] = useState('')
//   const [name, setName] = useState('')
//   const [isBusiness, setIsBusiness] = useState(false)
//   const [businessName, setBusinessName] = useState('')
//   const [gstNumber, setGstNumber] = useState('')
//   const [agreedToTerms, setAgreedToTerms] = useState(false)
//   // clientSecret is set after PaymentIntent creation and must persist for payment confirmation
//   const [clientSecret, setClientSecret] = useState('')

//   // Fetch tax when address is entered
//   useEffect(() => {
//     if (!stripe || !elements || !clientSecret) return

//     const addressElement = elements.getElement('address')
//     if (!addressElement) return

//     const handleAddressChange = async (event) => {
//       if (event.complete && event.value?.address) {
//         try {
//           console.log('📍 Address entered:', event.value.address)

//           // Extract PaymentIntent ID from client secret
//           const paymentIntentId = clientSecret.split('_secret_')[0]

//           // Call backend to calculate tax
//           const response = await fetch(
//             `${
//               process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
//             }/api/checkout/update-payment-intent`,
//             {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({
//                 paymentIntentId,
//                 billingDetails: {
//                   name: event.value.name,
//                   address: event.value.address,
//                 },
//               }),
//             }
//           )

//           if (response.ok) {
//             const data = await response.json()
//             const taxAmount = data.tax || 0
//             const taxStatus = data.taxStatus || 'not_calculated'

//             console.log('💰 Tax calculated:', {
//               subtotal: data.amount / 100,
//               tax: taxAmount / 100,
//               total: data.total / 100,
//               currency: data.currency,
//               status: taxStatus,
//             })

//             if (onTaxUpdate) {
//               onTaxUpdate(taxAmount, taxStatus)
//             }
//           } else {
//             console.error('Failed to calculate tax:', await response.text())
//           }
//         } catch (error) {
//           console.error('Error calculating tax:', error)
//         }
//       }
//     }

//     addressElement.on('change', handleAddressChange)

//     // Cleanup
//     return () => {
//       addressElement.off('change', handleAddressChange)
//     }
//   }, [stripe, elements, clientSecret, onTaxUpdate])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!stripe || !elements) return

//     // Validate required fields
//     if (!email) {
//       setError('Please provide your email address.')
//       return
//     }

//     // Validate terms agreement
//     if (!agreedToTerms) {
//       setError('Please agree to the Terms of Service and Privacy Policy.')
//       return
//     }

//     setSubmitting(true)
//     setError('')

//     try {
//       setLoading(true)
//       // Create PaymentIntent only now
//       const response = await fetch(
//         `${
//           process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
//         }/api/checkout/create-payment-intent`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             plan,
//             tier: selectedTier,
//             delivery: selectedDelivery,
//             currency,
//             promoApplied,
//             promoData,
//             email,
//             phone,
//             name,
//             isBusiness,
//             businessName,
//             gstNumber,
//           }),
//         }
//       )
//       let data
//       try {
//         data = await response.json()
//       } catch (err) {
//         setError('Invalid server response. Please try again.')
//         setSubmitting(false)
//         setLoading(false)
//         return
//       }
//       if (!response.ok) {
//         console.error('PaymentIntent creation failed:', data)
//         setError(
//           data?.error ||
//             data?.message ||
//             'Failed to create payment. Please try again.'
//         )
//         setSubmitting(false)
//         setLoading(false)
//         return
//       }
//       if (!data.clientSecret) {
//         console.error('No clientSecret in PaymentIntent response:', data)
//         setError(
//           data?.error ||
//             data?.message ||
//             'No client secret returned. Please try again.'
//         )
//         setSubmitting(false)
//         setLoading(false)
//         return
//       }
//       setClientSecret(data.clientSecret)
//       setLoading(false)

//       // Now proceed with payment
//       // Wait for clientSecret state to update
//       setTimeout(async () => {
//         // Get billing address from AddressElement
//         const addressElement = elements.getElement('address')
//         if (!addressElement) {
//           setError('Address element not found. Please refresh the page.')
//           setSubmitting(false)
//           return
//         }
//         const { complete, value: addressValue } =
//           await addressElement.getValue()
//         if (!complete) {
//           setError('Please complete your billing address.')
//           setSubmitting(false)
//           return
//         }
//         const { error: submitError } = await elements.submit()
//         if (submitError) {
//           setError(submitError.message)
//           setSubmitting(false)
//           return
//         }
//         const { error: confirmError, paymentIntent } =
//           await stripe.confirmPayment({
//             elements,
//             confirmParams: {
//               payment_method_data: {
//                 billing_details: {
//                   name: name,
//                   email: email,
//                   phone: phone || undefined,
//                   address: addressValue.address,
//                 },
//               },
//             },
//             redirect: 'if_required',
//           })
//         if (confirmError) {
//           if (confirmError.payment_intent?.status === 'succeeded') {
//             const succeededIntent = confirmError.payment_intent
//             try {
//               const response = await fetch(
//                 `${process.env.NEXT_PUBLIC_API_URL}/api/checkout/complete-payment`,
//                 {
//                   method: 'POST',
//                   headers: { 'Content-Type': 'application/json' },
//                   body: JSON.stringify({
//                     paymentIntentId: succeededIntent.id,
//                     businessDetails: isBusiness
//                       ? {
//                           businessName: businessName || undefined,
//                           gstNumber: gstNumber || undefined,
//                         }
//                       : undefined,
//                     agreedToTerms: agreedToTerms,
//                   }),
//                 }
//               )
//               const result = await response.json()
//               if (!response.ok) {
//                 console.error('Complete payment error:', result)
//               }
//               const status = succeededIntent.status || 'processing'
//               const url = `${returnUrl}?pi=${succeededIntent.id}&redirect_status=${status}&plan=${plan}&tier=${selectedTier}&delivery=${selectedDelivery}`
//               router.replace(url)
//             } catch (err) {
//               console.error('Error completing payment:', err)
//               const status = succeededIntent.status || 'processing'
//               const url = `${returnUrl}?pi=${succeededIntent.id}&redirect_status=${status}&plan=${plan}&tier=${selectedTier}&delivery=${selectedDelivery}`
//               router.replace(url)
//             }
//           } else {
//             setError(
//               confirmError.message || 'Payment failed. Please try again.'
//             )
//             setSubmitting(false)
//           }
//         } else if (paymentIntent?.id && paymentIntent?.status === 'succeeded') {
//           try {
//             const response = await fetch(
//               `${process.env.NEXT_PUBLIC_API_URL}/api/checkout/complete-payment`,
//               {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                   paymentIntentId: paymentIntent.id,
//                   businessDetails: isBusiness
//                     ? {
//                         businessName: businessName || undefined,
//                         gstNumber: gstNumber || undefined,
//                       }
//                     : undefined,
//                   agreedToTerms: agreedToTerms,
//                 }),
//               }
//             )
//             const result = await response.json()
//             if (!response.ok) {
//               console.error('Complete payment error:', result)
//             }
//             const status = paymentIntent.status || 'processing'
//             const url = `${returnUrl}?pi=${paymentIntent.id}&redirect_status=${status}&plan=${plan}&tier=${selectedTier}&delivery=${selectedDelivery}`
//             router.replace(url)
//           } catch (err) {
//             console.error('Error completing payment:', err)
//             const status = paymentIntent.status || 'processing'
//             const url = `${returnUrl}?pi=${paymentIntent.id}&redirect_status=${status}&plan=${plan}&tier=${selectedTier}&delivery=${selectedDelivery}`
//             router.replace(url)
//           }
//         } else {
//           router.replace(returnUrl)
//         }
//       }, 0)
//     } catch (err) {
//       console.error('Payment error:', err)
//       setError('An unexpected error occurred. Please try again.')
//       setSubmitting(false)
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="w-full space-y-4">
//       {/* Contact Information */}
//       <div className="space-y-3">
//         <h3 className="text-sm font-semibold text-gray-900">
//           Contact information
//         </h3>

//         {/* Email */}
//         <div>
//           {/* <label className="block text-sm text-gray-700 mb-1.5">
//             Email address
//           </label> */}
//           <input
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all"
//           />
//         </div>

//         {/* Phone */}
//         <div>
//           {/* <label className="block text-sm text-gray-700 mb-1.5">
//             Phone number
//           </label> */}
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Contact Number"
//             className="w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all"
//           />
//         </div>
//       </div>

//       {/* Payment Method - Card Details Only */}
//       <div className="space-y-2">
//         <h3 className="text-sm font-semibold text-gray-900">Payment method</h3>
//         <PaymentElement
//           options={{
//             layout: 'tabs',
//             fields: {
//               billingDetails: 'never',
//             },
//           }}
//         />
//       </div>

//       {/* Billing Address */}
//       <div className="space-y-2">
//         <h3 className="text-sm font-semibold text-gray-900">Billing address</h3>
//         <div className="address-element-wrapper">
//           <AddressElement
//             options={{
//               mode: 'billing',
//               fields: {
//                 name: 'never',
//               },
//             }}
//           />
//         </div>
//         <style jsx>{`
//           .address-element-wrapper :global([name*='name']),
//           .address-element-wrapper :global(.FieldLabel:has(+ [name*='name'])),
//           .address-element-wrapper :global(.FormFieldGroup--name) {
//             display: none !important;
//           }
//         `}</style>
//       </div>

//       {/* Business Checkbox */}
//       <div className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           id="isBusiness"
//           checked={isBusiness}
//           onChange={(e) => setIsBusiness(e.target.checked)}
//           className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//         />
//         <label htmlFor="isBusiness" className="text-sm text-gray-700">
//           I'm purchasing as a business
//         </label>
//       </div>

//       {/* GST Information - expandable section when business is selected */}
//       <div
//         className="grid ease-in-out overflow-hidden"
//         style={{
//           gridTemplateRows: isBusiness ? '1fr' : '0fr',
//           transition: 'grid-template-rows 0.3s ease-in-out',
//         }}
//       >
//         <div className="min-h-0">
//           <div className="space-y-4 pt-2">
//             <div className="flex items-center gap-2">
//               <h4 className="text-sm font-medium text-gray-900">
//                 GSTIN information
//               </h4>
//               <TooltipIcon
//                 content="Goods and Services Tax Identification Number for business purchases"
//                 position="right"
//               />
//             </div>

//             {/* Business Name */}
//             <div>
//               <label className="block text-sm text-gray-700 mb-1.5">
//                 Business name
//               </label>
//               <input
//                 type="text"
//                 value={businessName}
//                 onChange={(e) => setBusinessName(e.target.value)}
//                 placeholder="Your company name"
//                 className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all"
//               />
//             </div>

//             {/* GST Number */}
//             <div>
//               <label className="block text-sm text-gray-700 mb-1.5">
//                 GST Number
//               </label>
//               <div className="flex gap-2">
//                 <select className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] bg-white transition-all min-w-[120px]">
//                   <option value="IN">🇮🇳 IN GST</option>
//                 </select>
//                 <input
//                   type="text"
//                   value={gstNumber}
//                   onChange={(e) => setGstNumber(e.target.value)}
//                   placeholder="22AAAAA0000A1Z5"
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* {error && (
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
//           <svg
//             className="w-5 h-5 flex-shrink-0 mt-0.5"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span>{error}</span>
//         </div>
//       )} */}

//       {/* Terms and Conditions Agreement */}
//       <div className="flex items-start gap-2">
//         <input
//           type="checkbox"
//           id="agreeToTerms"
//           checked={agreedToTerms}
//           onChange={(e) => setAgreedToTerms(e.target.checked)}
//           className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//         />
//         <label
//           htmlFor="agreeToTerms"
//           className="text-sm text-gray-600 leading-tight"
//         >
//           I agree to DSQR Studio Inc.'s{' '}
//           <a
//             href="/terms-of-service"
//             className="text-blue-600 underline hover:text-blue-800"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Terms of Service
//           </a>{' '}
//           and{' '}
//           <a
//             href="/privacy-policy"
//             className="text-blue-600 underline hover:text-blue-800"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Privacy Policy
//           </a>
//         </label>
//       </div>

//       {/* Consent error message below consent */}
//       {error && error.toLowerCase().includes('agree') && (
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2 mt-2">
//           <svg
//             className="w-5 h-5 flex-shrink-0 mt-0.5"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span>{error}</span>
//         </div>
//       )}

//       <button
//         type="submit"
//         disabled={!stripe || submitting}
//         className="w-full py-4 rounded-lg font-semibold text-base disabled:opacity-50 transition-colors duration-200"
//         style={{
//           backgroundColor: submitting ? '#a8e600' : '#BFFF00',
//           color: '#000000',
//         }}
//         onMouseEnter={(e) => {
//           if (!submitting) e.currentTarget.style.backgroundColor = '#a8e600'
//         }}
//         onMouseLeave={(e) => {
//           if (!submitting) e.currentTarget.style.backgroundColor = '#BFFF00'
//         }}
//       >
//         {submitting ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//                 fill="none"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               />
//             </svg>
//             Subscribing...
//           </span>
//         ) : (
//           'Subscribe'
//         )}
//       </button>

//       {/* Subscription authorization text */}
//       <div className="mt-3 text-center text-gray-500 text-sm">
//         <div className="mb-2">
//           By subscribing, you authorize DSQR Studio Inc. to charge you
//           <br />
//           according to the terms until you cancel.
//         </div>
//         <Dialog>
//           <div className="mb-2 flex justify-center">
//             <DialogTrigger asChild>
//               <button
//                 type="button"
//                 className="inline-flex items-center group focus:outline-none"
//               >
//                 {/* Provided SVG */}
//                 <svg
//                   className="mr-1 text-gray-400"
//                   focusable="false"
//                   width="14"
//                   height="14"
//                   viewBox="0 0 14 14"
//                   fill="none"
//                 >
//                   <path
//                     d="M13.5488 8.66895C13.5488 5.94824 11.7168 4.06836 8.61328 4.06836H4.32031L2.74121 4.14355L3.9375 3.13184L5.67383 1.43652C5.81055 1.30664 5.89941 1.13574 5.89941 0.910156C5.89941 0.479492 5.59863 0.171875 5.1543 0.171875C4.96289 0.171875 4.75098 0.260742 4.60059 0.404297L0.683594 4.2666C0.526367 4.41699 0.444336 4.62207 0.444336 4.83398C0.444336 5.03906 0.526367 5.24414 0.683594 5.39453L4.60059 9.25684C4.75098 9.40039 4.96289 9.48926 5.1543 9.48926C5.59863 9.48926 5.89941 9.18164 5.89941 8.75098C5.89941 8.52539 5.81055 8.36133 5.67383 8.22461L3.9375 6.5293L2.74121 5.52441L4.32031 5.59277H8.64746C10.835 5.59277 12.0449 6.83691 12.0449 8.61426C12.0449 10.3916 10.835 11.6904 8.64746 11.6904H7.04785C6.59668 11.6904 6.27539 12.0322 6.27539 12.4492C6.27539 12.8662 6.59668 13.208 7.05469 13.208H8.70215C11.751 13.208 13.5488 11.4102 13.5488 8.66895Z"
//                     fill="currentColor"
//                   ></path>
//                 </svg>
//                 <span className="underline decoration-dotted cursor-pointer group-hover:text-gray-800">
//                   Eligible for a refund
//                 </span>
//               </button>
//             </DialogTrigger>
//           </div>
//           <div className="flex flex-wrap justify-center items-center gap-2 mt-2 text-gray-400 text-[13px]">
//             <span className="flex items-center gap-1">
//               Powered by
//               <span className="inline-block align-middle">
//                 <svg
//                   className="InlineSVG Icon BJN199Au__PoweredByStripe-icon Icon--md"
//                   focusable="false"
//                   width="33"
//                   height="15"
//                   role="img"
//                   aria-labelledby="stripe-title"
//                   style={{ color: '#6b7280', fill: '#6b7280' }}
//                 >
//                   <title id="stripe-title">Stripe</title>
//                   <g fillRule="evenodd" fill="#6b7280">
//                     <path d="M32.956 7.925c0-2.313-1.12-4.138-3.261-4.138-2.15 0-3.451 1.825-3.451 4.12 0 2.719 1.535 4.092 3.74 4.092 1.075 0 1.888-.244 2.502-.587V9.605c-.614.307-1.319.497-2.213.497-.876 0-1.653-.307-1.753-1.373h4.418c0-.118.018-.588.018-.804zm-4.463-.859c0-1.02.624-1.445 1.193-1.445.55 0 1.138.424 1.138 1.445h-2.33zM22.756 3.787c-.885 0-1.454.415-1.77.704l-.118-.56H18.88v10.535l2.259-.48.009-2.556c.325.235.804.57 1.6.57 1.616 0 3.089-1.302 3.089-4.166-.01-2.62-1.5-4.047-3.08-4.047zm-.542 6.225c-.533 0-.85-.19-1.066-.425l-.009-3.352c.235-.262.56-.443 1.075-.443.822 0 1.391.922 1.391 2.105 0 1.211-.56 2.115-1.39 2.115zM18.04 2.766V.932l-2.268.479v1.843zM15.772 3.94h2.268v7.905h-2.268zM13.342 4.609l-.144-.669h-1.952v7.906h2.259V6.488c.533-.696 1.436-.57 1.716-.47V3.94c-.289-.108-1.346-.307-1.879.669zM8.825 1.98l-2.205.47-.009 7.236c0 1.337 1.003 2.322 2.34 2.322.741 0 1.283-.135 1.581-.298V9.876c-.289.117-1.716.533-1.716-.804V5.865h1.716V3.94H8.816l.009-1.96zM2.718 6.235c0-.352.289-.488.767-.488.687 0 1.554.208 2.241.578V4.202a5.958 5.958 0 0 0-2.24-.415c-1.835 0-3.054.957-3.054 2.557 0 2.493 3.433 2.096 3.433 3.17 0 .416-.361.552-.867.552-.75 0-1.708-.307-2.467-.723v2.15c.84.362 1.69.515 2.467.515 1.879 0 3.17-.93 3.17-2.548-.008-2.692-3.45-2.213-3.45-3.225z"></path>
//                   </g>
//                 </svg>
//               </span>
//             </span>
//             <span className="mx-1">|</span>
//             <a
//               href="https://stripe.com/in/legal/consumer"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:underline"
//             >
//               Terms
//             </a>
//             <span className="mx-1">|</span>
//             <a
//               href="https://stripe.com/in/privacy"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:underline"
//             >
//               Privacy
//             </a>
//             <span className="mx-1">|</span>
//             <DialogTrigger asChild>
//               <button
//                 type="button"
//                 className="hover:underline text-inherit bg-transparent border-none p-0 m-0 cursor-pointer"
//               >
//                 Refunds
//               </button>
//             </DialogTrigger>
//           </div>
//           <DialogContent className="max-w-md mx-auto">
//             <DialogHeader>
//               <DialogTitle>Refund Policy</DialogTitle>
//             </DialogHeader>
//             <DialogDescription>
//               You are eligible for a refund as per our policy. (You can update
//               this text as needed.)
//             </DialogDescription>
//             <DialogClose asChild>
//               <button className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
//                 Close
//               </button>
//             </DialogClose>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </form>
//   )
// }

// export default function CheckoutPage() {
//   const search = useSearchParams()
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [taxAmount, setTaxAmount] = useState(0)
//   const [taxCalculated, setTaxCalculated] = useState(false)
//   const promoInputRef = React.useRef(null)

//   // Testimonial carousel with autoplay
//   const [testimonialRef, testimonialEmbla] = useEmblaCarousel(
//     {
//       loop: true,
//       dragFree: false,
//       duration: 30, // Smooth transition duration in frames (30 frames = ~500ms)
//     },
//     [Autoplay({ delay: 5000, stopOnInteraction: false })]
//   )
//   const [testimonialIndex, setTestimonialIndex] = useState(0)

//   // Recommendations carousel
//   const [recommendationsRef, recommendationsEmbla] = useEmblaCarousel({
//     loop: false,
//     align: 'start',
//   })
//   const [canScrollPrev, setCanScrollPrev] = useState(false)
//   const [canScrollNext, setCanScrollNext] = useState(false)
//   const [recommendations, setRecommendations] = useState(
//     DEFAULT_RECOMMENDATIONS
//   )

//   // Track testimonial active index
//   useEffect(() => {
//     if (!testimonialEmbla) return

//     const onSelect = () => {
//       setTestimonialIndex(testimonialEmbla.selectedScrollSnap())
//     }

//     testimonialEmbla.on('select', onSelect)
//     onSelect()

//     return () => {
//       testimonialEmbla.off('select', onSelect)
//     }
//   }, [testimonialEmbla])

//   // Gather details from URL with currency detection from cookie
//   const plan = search.get('plan')
//   const tierParam = Number(search.get('tier') || '1')
//   const deliveryParam = search.get('delivery') || 'base'

//   // Get currency from cookie (like Card.jsx does)
//   const [currency, setCurrency] = useState('USD')

//   // Editable left-panel state - declare before useEffects that depend on them
//   const [selectedTier, setSelectedTier] = useState(tierParam)
//   const [selectedDelivery, setSelectedDelivery] = useState(deliveryParam)
//   const [showPromoCode, setShowPromoCode] = useState(false)
//   const [promoCode, setPromoCode] = useState('')
//   const [promoApplied, setPromoApplied] = useState(false)
//   const [promoError, setPromoError] = useState('')
//   const [promoData, setPromoData] = useState(null)
//   const [showDetails, setShowDetails] = useState(false)
//   // Mobile details drawer state
//   const [showMobileDrawer, setShowMobileDrawer] = useState(false)

//   // Tax status state
//   const [taxStatus, setTaxStatus] = useState('not_calculated')

//   // Only set initial state from URL params on first mount
//   // Remove effect that overwrites user changes after load

//   React.useEffect(() => {
//     if (typeof document !== 'undefined') {
//       const match = document.cookie.match(/(?:^|;\s*)currency=([^;]*)/)
//       if (match) {
//         setCurrency(match[1])
//       } else {
//         // Fallback to URL param if no cookie
//         const urlCurrency = search.get('currency')
//         if (urlCurrency) setCurrency(urlCurrency.toUpperCase())
//       }
//     }
//   }, [search])

//   // Generate recommendations locally based on current selection
//   useEffect(() => {
//     const generateRecommendations = () => {
//       if (!plan || !selectedTier || !currency || !selectedDelivery) return []

//       // If tier 3 is selected, don't show any recommendations
//       // For AI plan, only allow fast delivery in recommendations
//       const recDelivery = plan === 'AI' ? 'fast' : selectedDelivery

//       // For Graphic/Video at tier 3, primary rec is Both plan at tier 3
//       if ((plan === 'Graphic' || plan === 'Video') && selectedTier === 3) {
//         const targetPrice = getExpectedPrice(
//           'Both',
//           3,
//           selectedDelivery,
//           currency
//         )
//         const currentPrice = getExpectedPrice(
//           plan,
//           3,
//           selectedDelivery,
//           currency
//         )
//         if (targetPrice && currentPrice) {
//           const additionalAmount = targetPrice - currentPrice
//           const serviceText =
//             plan === 'Graphic' ? 'Add video editing' : 'Add graphic design'
//           return [
//             {
//               id: `primary-Both-3`,
//               title: serviceText,
//               additionalAmount,
//               activeReq: 3,
//               targetPlan: 'Both',
//               targetTier: 3,
//               targetDelivery: selectedDelivery,
//               isPrimary: true,
//             },
//           ]
//         }
//         return []
//       }

//       const recommendations = []
//       const currentPrice = getExpectedPrice(
//         plan,
//         selectedTier,
//         selectedDelivery,
//         currency
//       )

//       // PRIMARY RECOMMENDATION: Upgrade tier (if not at tier 3)
//       if (selectedTier < 3) {
//         const nextTier = selectedTier + 1
//         const targetPrice = getExpectedPrice(
//           plan,
//           nextTier,
//           recDelivery,
//           currency
//         )

//         if (targetPrice && currentPrice) {
//           const additionalAmount = targetPrice - currentPrice
//           const tierText =
//             nextTier === 2 ? 'Double your output' : 'Get 3 active requests'

//           recommendations.push({
//             id: `primary-${plan}-${nextTier}`,
//             title: tierText,
//             additionalAmount,
//             activeReq: nextTier,
//             targetPlan: plan,
//             targetTier: nextTier,
//             targetDelivery: recDelivery,
//             isPrimary: true,
//           })
//         }
//       }

//       // SECONDARY RECOMMENDATION: Add opposite service to convert to Both plan (only for Graphic or Video)
//       if (plan === 'Graphic' || plan === 'Video') {
//         const targetPrice = getExpectedPrice(
//           'Both',
//           selectedTier,
//           selectedDelivery,
//           currency
//         )

//         if (targetPrice && currentPrice) {
//           const additionalAmount = targetPrice - currentPrice
//           const serviceText =
//             plan === 'Graphic' ? 'Add video editing' : 'Add graphic design'

//           recommendations.push({
//             id: `secondary-Both-${selectedTier}`,
//             title: serviceText,
//             additionalAmount,
//             activeReq: selectedTier,
//             targetPlan: 'Both',
//             targetTier: selectedTier,
//             targetDelivery: selectedDelivery,
//             isPrimary: false,
//           })
//         }
//       }

//       return recommendations
//     }

//     const recs = generateRecommendations()
//     setRecommendations(recs)
//   }, [plan, selectedTier, currency, selectedDelivery])

//   // Track recommendations scroll ability
//   useEffect(() => {
//     if (!recommendationsEmbla) return

//     const onSelect = () => {
//       setCanScrollPrev(recommendationsEmbla.canScrollPrev())
//       setCanScrollNext(recommendationsEmbla.canScrollNext())
//     }

//     recommendationsEmbla.on('select', onSelect)
//     recommendationsEmbla.on('reInit', onSelect)
//     onSelect()

//     return () => {
//       recommendationsEmbla.off('select', onSelect)
//       recommendationsEmbla.off('reInit', onSelect)
//     }
//   }, [recommendationsEmbla])

//   // Enforce Fast Delivery for AI plan (non-toggleable)
//   useEffect(() => {
//     if (plan === 'AI' && selectedDelivery !== 'fast') {
//       setSelectedDelivery('fast')
//     }
//   }, [plan])

//   // Focus input when promo code section opens
//   React.useEffect(() => {
//     if (showPromoCode && promoInputRef.current) {
//       promoInputRef.current.focus()
//     }
//   }, [showPromoCode])

//   // Removed options and clientSecret usage from CheckoutPage

//   // Removed auto-fetching clientSecret on mount/order change

//   // Removed pendingClientSecret effect

//   const returnUrl = `${
//     process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
//   }/success`

//   // Handle promo code validation (toggle Apply/Remove)
//   const handleApplyPromo = async () => {
//     // Remove if already applied
//     if (promoApplied) {
//       setPromoApplied(false)
//       setPromoData(null)
//       setPromoCode('')
//       setPromoError('')
//       return
//     }

//     const code = promoCode.trim().toUpperCase()
//     if (!code) {
//       setPromoError('Please enter a promo code')
//       return
//     }

//     try {
//       const API_BASE =
//         process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
//       const res = await fetch(`${API_BASE}/api/checkout/validate-promo`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ code, currency }),
//       })
//       const data = await res.json()
//       if (!res.ok || !data.valid || data.applicable === false) {
//         const message = data?.error || 'Code is invalid'
//         setPromoError(message)
//         setPromoApplied(false)
//         setPromoData(null)
//         return
//       }
//       setPromoApplied(true)
//       setPromoData(data)
//       setPromoError('')
//     } catch (err) {
//       console.error(err)
//       setPromoError('Code is invalid')
//       setPromoApplied(false)
//       setPromoData(null)
//     }
//   }

//   // Handle updating order when user clicks a recommendation
//   const handleUpdateOrder = (recommendation) => {
//     if (!recommendation) return

//     // Update the local state and URL for instant UI update
//     const newPlan = recommendation.targetPlan || plan
//     const newTier = recommendation.targetTier || selectedTier
//     const newDelivery = recommendation.targetDelivery || selectedDelivery

//     setSelectedTier(newTier)
//     setSelectedDelivery(newDelivery)
//     // Update URL params for plan, tier, delivery
//     const params = new URLSearchParams(window.location.search)
//     if (newPlan) params.set('plan', newPlan)
//     params.set('tier', String(newTier))
//     params.set('delivery', newDelivery)
//     window.history.replaceState(
//       {},
//       '',
//       `${window.location.pathname}?${params.toString()}`
//     )
//     // If plan is also dynamic in state, setPlan(newPlan) here if needed
//   }

//   // Derived pricing for display using authoritative prices
//   const basePrice = getExpectedPrice(plan, selectedTier, 'base', currency)
//   const fastPrice = getExpectedPrice(plan, selectedTier, 'fast', currency)
//   const isAI = plan === 'AI'
//   const showFast = !isAI && fastPrice && basePrice
//   const total = getExpectedPrice(plan, selectedTier, selectedDelivery, currency)

//   // Calculate discount (70% for test promo code SPCVFY3G)
//   // Handler for tax updates from CheckoutForm
//   const handleTaxUpdate = (tax, status) => {
//     setTaxAmount(tax)
//     setTaxStatus(status)
//   }

//   const percentOff =
//     promoApplied && promoData?.percentOff ? promoData.percentOff / 100 : 0
//   const fixedOff =
//     promoApplied && promoData?.amountOff ? promoData.amountOff / 100 : 0
//   let discountAmount = (total || basePrice || 0) * percentOff + fixedOff
//   // Guard: don't allow discount to exceed price
//   const maxDiscountBase = total || basePrice || 0
//   if (discountAmount > maxDiscountBase) discountAmount = maxDiscountBase
//   const finalTotal = (total || basePrice || 0) - discountAmount

//   // Local money helpers to render as `US$123` or `CA$123` (no space)
//   const currencyPrefix =
//     (currency || 'USD').toUpperCase() === 'CAD' ? 'CA$' : 'US$'
//   const numberOnly = (amt) =>
//     new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(
//       amt || 0
//     )
//   const moneyPrefixed = (amt) => `${currencyPrefix}${numberOnly(amt)}`

//   return (
//     <>
//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//           html {
//             overflow-y: scroll;
//           }
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(20px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//           .animate-fadeInUp {
//             animation: fadeInUp 0.5s ease-out forwards;
//           }
//           @keyframes expandDown {
//             from {
//               opacity: 0;
//               transform: translateY(-20px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//           .animate-expandDown {
//             animation: expandDown 0.5s ease-out forwards;
//           }
//         `,
//         }}
//       />
//       <div className="min-h-screen py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-5xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//             {/* Left column: product + options - sticky on larger screens */}
//             <div
//               className={`flex flex-col w-full overflow-hidden lg:sticky lg:top-6 lg:self-start ${
//                 showPromoCode ? 'sm:gap-4 gap-1' : 'sm:gap-2 gap-1'
//               }`}
//             >
//               {loading ? (
//                 /* Skeleton loader for left side */
//                 <div className="flex flex-col gap-4 animate-pulse">
//                   {/* Logo skeleton */}
//                   <div className="h-12 w-12 bg-gray-200 rounded-md"></div>
//                   {/* Main card skeleton */}
//                   <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
//                     {/* Title skeleton */}
//                     <div className="h-6 bg-gray-200 rounded w-3/4"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                     {/* Price skeleton */}
//                     <div className="h-8 bg-gray-200 rounded w-1/3"></div>
//                     {/* Options skeletons */}
//                     <div className="space-y-3">
//                       <div className="h-16 bg-gray-200 rounded"></div>
//                       <div className="h-16 bg-gray-200 rounded"></div>
//                       <div className="h-16 bg-gray-200 rounded"></div>
//                     </div>
//                   </div>
//                   {/* Recommendations skeleton */}
//                   <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
//                     <div className="h-5 bg-gray-200 rounded w-1/2"></div>
//                     <div className="h-20 bg-gray-200 rounded"></div>
//                   </div>
//                   {/* Testimonial skeleton */}
//                   <div className="hidden sm:block bg-white rounded-lg shadow-md p-6">
//                     <div className="flex gap-4">
//                       <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
//                       <div className="flex-1 space-y-2">
//                         <div className="h-4 bg-gray-200 rounded"></div>
//                         <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                         <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   {/* Desktop: Logo, Title, Price, Options, Price Details (no duplicate blocks) */}
//                   <div className="hidden sm:flex flex-col gap-4 animate-fadeInUp">
//                     {/* Logo and Title */}
//                     <div className="flex items-center gap-3">
//                       <button
//                         type="button"
//                         onClick={() => (window.location.href = '/')}
//                         style={{
//                           padding: 0,
//                           background: 'none',
//                           border: 'none',
//                           cursor: 'pointer',
//                         }}
//                         aria-label="Go to home page"
//                       >
//                         <img
//                           src="/images/new_logo.png"
//                           alt="DSQR Logo"
//                           className="w-10 h-10 rounded-sm"
//                         />
//                       </button>
//                       <div>
//                         <div className="text-base font-medium text-gray-500 leading-tight">
//                           Subscribe to
//                         </div>
//                         <div className="text-base font-medium text-gray-500 leading-tight">
//                           {plan === 'Video'
//                             ? 'Unlimited Video Editing'
//                             : plan === 'Graphic'
//                             ? 'Unlimited Graphic Design'
//                             : plan === 'Both'
//                             ? 'Unlimited Video + Graphics'
//                             : plan === 'AI'
//                             ? 'AI Lab'
//                             : plan}
//                         </div>
//                       </div>
//                     </div>
//                     {/* Price */}
//                     <div className="flex items-center gap-2">
//                       <span className="text-4xl font-semibold">
//                         {moneyPrefixed(
//                           finalTotal + taxAmount > 0
//                             ? finalTotal + taxAmount
//                             : 0
//                         )}
//                       </span>
//                       <p className="text-xs text-gray-600 flex leading-3 ">
//                         {' '}
//                         Per <br />
//                         month
//                       </p>
//                     </div>
//                     <div
//                       style={{
//                         maxHeight: promoApplied ? 60 : 0,
//                         opacity: promoApplied ? 1 : 0,
//                         overflow: 'visible',
//                         transition:
//                           'max-height 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.7s cubic-bezier(0.4,0,0.2,1)',
//                         marginBottom: promoApplied ? '0.25rem' : 0,
//                       }}
//                     >
//                       {promoApplied && (
//                         <div
//                           className="text-sm -mt-4"
//                           style={{ color: '#737373' }}
//                         >
//                           Then{' '}
//                           <span className="font-medium">
//                             {moneyPrefixed(basePrice)}
//                           </span>{' '}
//                           per month after coupon expires
//                         </div>
//                       )}
//                     </div>
//                     {/* Options Row */}
//                     <div className="flex gap-2">
//                       <div
//                         className="flex items-center bg-[#F4F4F4] rounded-md px-3 py-2 text-xs font-medium text-gray-800 cursor-pointer hover:bg-[#e8e8e8]"
//                         tabIndex={0}
//                         role="button"
//                         aria-label="Active Requests"
//                         onClick={() => {
//                           const nextTier =
//                             selectedTier === 3 ? 1 : selectedTier + 1
//                           setSelectedTier(nextTier)
//                           const params = new URLSearchParams(
//                             window.location.search
//                           )
//                           params.set('tier', String(nextTier))
//                           window.history.replaceState(
//                             {},
//                             '',
//                             `${window.location.pathname}?${params.toString()}`
//                           )
//                         }}
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter' || e.key === ' ') {
//                             const nextTier =
//                               selectedTier === 3 ? 1 : selectedTier + 1
//                             setSelectedTier(nextTier)
//                             const params = new URLSearchParams(
//                               window.location.search
//                             )
//                             params.set('tier', String(nextTier))
//                             window.history.replaceState(
//                               {},
//                               '',
//                               `${window.location.pathname}?${params.toString()}`
//                             )
//                           }
//                         }}
//                       >
//                         <span className="bg-white outline-none font-semibold rounded px-1 py-1 select-none">
//                           {selectedTier}
//                         </span>
//                         <span className="ml-2 mr-1">Active Req</span>
//                         <sup>
//                           <TooltipIcon content="We handle a set number of tasks at a time. Backlog tasks begin once an active task is submitted for review." />
//                         </sup>
//                       </div>
//                       <div
//                         className={`flex items-center bg-[#F4F4F4] rounded-md px-3 py-2 text-xs font-medium text-gray-800 cursor-pointer hover:bg-[#e8e8e8] ${
//                           plan === 'AI' ? 'opacity-60 cursor-not-allowed' : ''
//                         }`}
//                         tabIndex={plan === 'AI' ? -1 : 0}
//                         role="button"
//                         aria-label="Fast Delivery"
//                         aria-pressed={selectedDelivery === 'fast'}
//                         onClick={() => {
//                           if (plan === 'AI') return
//                           const newDelivery =
//                             selectedDelivery === 'fast' ? 'base' : 'fast'
//                           setSelectedDelivery(newDelivery)
//                           const params = new URLSearchParams(
//                             window.location.search
//                           )
//                           params.set('delivery', newDelivery)
//                           window.history.replaceState(
//                             {},
//                             '',
//                             `${window.location.pathname}?${params.toString()}`
//                           )
//                         }}
//                         onKeyDown={(e) => {
//                           if (
//                             (e.key === 'Enter' || e.key === ' ') &&
//                             plan !== 'AI'
//                           ) {
//                             const newDelivery =
//                               selectedDelivery === 'fast' ? 'base' : 'fast'
//                             setSelectedDelivery(newDelivery)
//                             const params = new URLSearchParams(
//                               window.location.search
//                             )
//                             params.set('delivery', newDelivery)
//                             window.history.replaceState(
//                               {},
//                               '',
//                               `${window.location.pathname}?${params.toString()}`
//                             )
//                           }
//                         }}
//                       >
//                         <span
//                           className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shadow-sm shrink-0 ${
//                             selectedDelivery === 'fast'
//                               ? 'bg-[#f9ffd6] border border-[#cff000]'
//                               : 'bg-white border border-gray-300'
//                           }`}
//                         >
//                           <span
//                             className={`inline-block h-4 w-4 transform rounded-full transition-transform shadow-sm ${
//                               selectedDelivery === 'fast'
//                                 ? 'bg-black translate-x-4'
//                                 : 'bg-black translate-x-0.5'
//                             }`}
//                           />
//                         </span>
//                         <span className="ml-2 mr-1">Fast Delivery</span>
//                         <sup>
//                           <TooltipIcon content="Get your tasks delivered lightning fast." />
//                         </sup>
//                       </div>
//                       <div
//                         className="flex items-center bg-[#F4F4F4] rounded-md px-3 py-2 text-xs font-medium text-gray-800 cursor-pointer hover:bg-[#e8e8e8]"
//                         onClick={() => setShowPromoCode((v) => !v)}
//                         tabIndex={0}
//                         role="button"
//                         aria-pressed={showPromoCode}
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter' || e.key === ' ')
//                             setShowPromoCode((v) => !v)
//                         }}
//                       >
//                         <img
//                           src="/images/promotion.png"
//                           alt="Promotion"
//                           className="w-4 h-4"
//                         />
//                         <span className="ml-2">Promotion code</span>
//                       </div>
//                     </div>
//                     {/* Promotion Code Block - hidden by default, shown on button click */}
//                     {/* Promo code block with smooth open, instant close */}
//                     <div
//                       style={{
//                         maxHeight: showPromoCode ? 500 : 0,
//                         opacity: showPromoCode ? 1 : 0,
//                         overflow: 'hidden',
//                         transition: 'max-height 0.7s ease, opacity 0.7s ease',
//                         marginBottom: showPromoCode ? '0.5rem' : 0,
//                         marginTop: showPromoCode ? '0.5rem' : 0,
//                         paddingTop: showPromoCode ? undefined : 0,
//                         paddingBottom: showPromoCode ? undefined : 0,
//                       }}
//                     >
//                       {showPromoCode && (
//                         <div className="bg-white shadow-md rounded-md p-4">
//                           <div className="flex items-center gap-2 mb-3">
//                             <img
//                               src="/images/promotion.png"
//                               alt="Promotion"
//                               className="w-4 h-4"
//                             />
//                             <h3 className="text-sm font-semibold text-gray-800">
//                               Add Promotion code
//                             </h3>
//                           </div>
//                           <div className="flex gap-1 mb-3">
//                             <input
//                               ref={promoInputRef}
//                               type="text"
//                               placeholder="Enter code (e.g., SPCVFY3G)"
//                               value={promoCode}
//                               onChange={(e) => {
//                                 if (!promoApplied) {
//                                   setPromoCode(e.target.value.toUpperCase())
//                                   setPromoError('')
//                                 }
//                               }}
//                               onKeyDown={(e) => {
//                                 if (!promoApplied && e.key === 'Enter')
//                                   handleApplyPromo()
//                               }}
//                               disabled={promoApplied}
//                               className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-[#cff000] focus:border-[#cff000] focus:bg-[#cff000]/10 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
//                             />
//                             <button
//                               type="button"
//                               onClick={handleApplyPromo}
//                               className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors ${
//                                 promoApplied
//                                   ? 'bg-[#F4F4F4] text-black hover:bg-gray-200'
//                                   : 'bg-[#cff000] text-black hover:bg-[#b8dc00]'
//                               }`}
//                             >
//                               {promoApplied ? 'Remove' : 'Apply'}
//                             </button>
//                           </div>
//                           {(promoApplied || promoError) && (
//                             <div
//                               style={{
//                                 maxHeight: promoApplied || promoError ? 60 : 0,
//                                 opacity: promoApplied || promoError ? 1 : 0,
//                                 overflow: 'hidden',
//                                 transition:
//                                   'max-height 0.7s ease, opacity 0.7s ease',
//                                 marginBottom:
//                                   promoApplied || promoError ? '0.5rem' : 0,
//                               }}
//                             >
//                               {promoApplied && (
//                                 <p className="text-xs text-gray-600 font-medium">
//                                   Promo {promoData?.code || ''} applied · Saved{' '}
//                                   {moneyPrefixed(discountAmount)}
//                                 </p>
//                               )}
//                               {promoError && (
//                                 <p className="text-xs text-red-600">
//                                   {promoError}
//                                 </p>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="block sm:hidden gap-4 animate-fadeInUp">
//                     {/* Logo and Title */}
//                     <div className="">
//                       {/* MOBILE HEADER BLOCK */}
//                       <div className=" animate-fadeInUp mb-4">
//                         <div className="flex items-center justify-between mb-2">
//                           <button
//                             type="button"
//                             onClick={() => (window.location.href = '/')}
//                             style={{
//                               padding: 0,
//                               background: 'none',
//                               border: 'none',
//                               cursor: 'pointer',
//                             }}
//                             aria-label="Go to home page"
//                           >
//                             <img
//                               src="/images/new_logo.png"
//                               alt="DSQR Logo"
//                               className="w-10 h-10 rounded-sm"
//                             />
//                           </button>
//                           <button
//                             type="button"
//                             className="text-gray-500 text-sm flex items-center gap-1 px-2 py-1"
//                             onClick={() => setShowMobileDrawer((v) => !v)}
//                             aria-label={
//                               showMobileDrawer
//                                 ? 'Close details'
//                                 : 'Show details'
//                             }
//                           >
//                             {showMobileDrawer ? 'Close' : 'Details'}
//                             <svg
//                               width="18"
//                               height="18"
//                               viewBox="0 0 18 18"
//                               fill="none"
//                               style={{
//                                 transform: showMobileDrawer
//                                   ? 'rotate(180deg)'
//                                   : 'rotate(0deg)',
//                                 transition: 'transform 0.2s',
//                               }}
//                             >
//                               <path
//                                 d="M6 7l3 3 3-3"
//                                 stroke="#222"
//                                 strokeWidth="1.5"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                             </svg>
//                           </button>
//                           {/* Mobile Details Drawer */}
//                           <Drawer
//                             anchor="top"
//                             open={showMobileDrawer}
//                             onClose={() => setShowMobileDrawer(false)}
//                             PaperProps={{
//                               sx: {
//                                 borderBottomLeftRadius: 16,
//                                 borderBottomRightRadius: 16,
//                                 maxHeight: '90vh',
//                                 overflowY: 'auto',
//                               },
//                             }}
//                           >
//                             <Box sx={{ px: 2, pb: 4, pt: 2 }}>
//                               <div className="flex items-center justify-between mb-4">
//                                 <span className="text-lg font-semibold">
//                                   Price details
//                                 </span>
//                                 <button
//                                   type="button"
//                                   className="text-gray-500 text-sm flex items-center gap-1"
//                                   onClick={() => setShowMobileDrawer(false)}
//                                 >
//                                   Close
//                                   <svg
//                                     width="18"
//                                     height="18"
//                                     viewBox="0 0 18 18"
//                                     fill="none"
//                                   >
//                                     <path
//                                       d="M6 11l3-3 3 3"
//                                       stroke="#222"
//                                       strokeWidth="1.5"
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                     />
//                                   </svg>
//                                 </button>
//                               </div>
//                               <div className="space-y-2">
//                                 <div className="flex justify-between text-sm text-[#737373]">
//                                   <span className="font-medium">
//                                     {plan === 'Video'
//                                       ? 'Video Editing'
//                                       : plan === 'Graphic'
//                                       ? 'Graphic Design'
//                                       : plan === 'Both'
//                                       ? 'Video + Graphics'
//                                       : plan === 'AI'
//                                       ? 'AI Lab'
//                                       : plan}
//                                   </span>
//                                   <span className="font-medium">
//                                     {moneyPrefixed(total || basePrice)}
//                                   </span>
//                                 </div>
//                                 {promoApplied && (
//                                   <div className="flex justify-between text-sm text-[#737373]">
//                                     <span>
//                                       Promotion Code (
//                                       {promoData?.code || 'Applied'})
//                                     </span>
//                                     <span className="font-medium text-[#737373]">
//                                       -{moneyPrefixed(discountAmount)}
//                                     </span>
//                                   </div>
//                                 )}
//                                 <div className="flex justify-between items-center text-sm text-[#737373]">
//                                   <span className="font-medium flex items-center gap-1">
//                                     Tax
//                                     <sup>
//                                       <TooltipIcon
//                                         content="Tax is determined by billing information"
//                                         position="right"
//                                       />
//                                     </sup>
//                                   </span>
//                                   <span className="text-xs text-gray-500">
//                                     {taxAmount > 0
//                                       ? moneyPrefixed(taxAmount / 100)
//                                       : 'Enter Address to calculate'}
//                                   </span>
//                                 </div>
//                               </div>
//                               <div className="mt-4 pt-4 border-t text-lg flex justify-between items-center">
//                                 <span className="font-semibold">Total</span>
//                                 <span className="text-xl font-bold">
//                                   {moneyPrefixed(finalTotal + taxAmount / 100)}
//                                 </span>
//                               </div>
//                             </Box>
//                           </Drawer>
//                         </div>
//                         <div className="text-center">
//                           <div className="text-base mt-3 font-medium text-gray-500 leading-tight">
//                             Subscribe to
//                           </div>
//                           <div className="text-base font-medium text-gray-500 leading-tight mb-2">
//                             {plan === 'Video'
//                               ? 'Unlimited Video Editing'
//                               : plan === 'Graphic'
//                               ? 'Unlimited Graphic Design'
//                               : plan === 'Both'
//                               ? 'Unlimited Video + Graphics'
//                               : plan === 'AI'
//                               ? 'AI Lab'
//                               : plan}
//                           </div>
//                           <div className="flex items-center justify-center gap-2 mb-1">
//                             <span className="text-3xl font-semibold">
//                               {moneyPrefixed(total || basePrice)}
//                             </span>
//                             <p className="text-xs text-start text-gray-600 flex leading-3 ">
//                               {' '}
//                               Per <br />
//                               month
//                             </p>
//                           </div>
//                           {promoApplied && (
//                             <div className="text-xs text-green-700 font-medium mb-1">
//                               Promo {promoData?.code || ''} applied · Saved{' '}
//                               {moneyPrefixed(discountAmount)}
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex gap-2 justify-center mt-2 mb-2">
//                           <div className="flex items-center bg-[#F4F4F4] rounded-md px-3 py-2 text-xs font-medium text-gray-800">
//                             <select
//                               className="bg-white outline-none font-semibold rounded px-1 py-1"
//                               value={selectedTier}
//                               onChange={(e) => {
//                                 const newTier = Number(e.target.value)
//                                 setSelectedTier(newTier)
//                                 const params = new URLSearchParams(
//                                   window.location.search
//                                 )
//                                 params.set('tier', String(newTier))
//                                 window.history.replaceState(
//                                   {},
//                                   '',
//                                   `${
//                                     window.location.pathname
//                                   }?${params.toString()}`
//                                 )
//                               }}
//                             >
//                               <option value="1">1</option>
//                               <option value="2">2</option>
//                               <option value="3">3</option>
//                             </select>
//                             <span className="ml-2 mr-1">Active Req</span>
//                             <sup>
//                               <TooltipIcon content="We handle a set number of tasks at a time. Backlog tasks begin once an active task is submitted for review." />
//                             </sup>
//                           </div>
//                           <div className="flex items-center bg-[#F4F4F4] rounded-md px-3 py-2 text-xs font-medium text-gray-800">
//                             <button
//                               type="button"
//                               className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shadow-sm shrink-0 ${
//                                 selectedDelivery === 'fast'
//                                   ? 'bg-[#f9ffd6] border border-[#cff000]'
//                                   : 'bg-white border border-gray-300'
//                               } ${
//                                 plan === 'AI'
//                                   ? 'opacity-60 cursor-not-allowed'
//                                   : ''
//                               }`}
//                               onClick={() => {
//                                 if (plan === 'AI') return
//                                 const newDelivery =
//                                   selectedDelivery === 'fast' ? 'base' : 'fast'
//                                 setSelectedDelivery(newDelivery)
//                                 const params = new URLSearchParams(
//                                   window.location.search
//                                 )
//                                 params.set('delivery', newDelivery)
//                                 window.history.replaceState(
//                                   {},
//                                   '',
//                                   `${
//                                     window.location.pathname
//                                   }?${params.toString()}`
//                                 )
//                               }}
//                               disabled={plan === 'AI'}
//                             >
//                               <span
//                                 className={`inline-block h-4 w-4 transform rounded-full transition-transform shadow-sm ${
//                                   selectedDelivery === 'fast'
//                                     ? 'bg-black translate-x-4'
//                                     : 'bg-black translate-x-0.5'
//                                 }`}
//                               />
//                             </button>
//                             <span className="ml-2 mr-1">Fast Delivery</span>
//                             <sup>
//                               <TooltipIcon content="Get your tasks delivered lightning fast." />
//                             </sup>
//                           </div>
//                         </div>
//                         {/* Promo code input always open on mobile */}
//                         <div className="bg-white shadow-md rounded-md p-4 my-4">
//                           <div className="flex items-center gap-2 mb-3">
//                             <img
//                               src="/images/promotion.png"
//                               alt="Promotion"
//                               className="w-4 h-4"
//                             />
//                             <h3 className="text-sm font-semibold text-gray-800">
//                               Add Promotion code
//                             </h3>
//                           </div>
//                           <div className="flex gap-1 mb-3">
//                             <input
//                               ref={promoInputRef}
//                               type="text"
//                               placeholder="Enter code (e.g., SPCVFY3G)"
//                               value={promoCode}
//                               onChange={(e) => {
//                                 setPromoCode(e.target.value.toUpperCase())
//                                 setPromoError('')
//                               }}
//                               onKeyDown={(e) => {
//                                 if (e.key === 'Enter') handleApplyPromo()
//                               }}
//                               className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-[#cff000] focus:border-[#cff000] focus:bg-[#cff000]/10 transition-colors"
//                             />
//                             <button
//                               type="button"
//                               onClick={handleApplyPromo}
//                               className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors ${
//                                 promoApplied
//                                   ? 'bg-[#F4F4F4] text-black hover:bg-gray-200'
//                                   : 'bg-[#cff000] text-black hover:bg-[#b8dc00]'
//                               }`}
//                             >
//                               {promoApplied ? 'Remove' : 'Apply'}
//                             </button>
//                           </div>
//                           {(promoApplied || promoError) && (
//                             <div>
//                               {promoApplied && (
//                                 <p className="text-xs text-gray-600 font-medium">
//                                   Promo {promoData?.code || ''} applied · Saved{' '}
//                                   {moneyPrefixed(discountAmount)}
//                                 </p>
//                               )}
//                               {promoError && (
//                                 <p className="text-xs text-red-600">
//                                   {promoError}
//                                 </p>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Main content with expand-down animation */}
//                   <div className="animate-fadeInUp flex flex-col sm:gap-3 gap-2">
//                     {/* Price Details - Hidden on mobile since details drawer exists */}
//                     <div className="hidden sm:block bg-white shadow-md rounded-md p-4">
//                       <h3 className="text-xl font-semibold mb-3">
//                         Price details
//                       </h3>
//                       <div className="space-y-2">
//                         <div className="flex justify-between text-sm text-[#737373]">
//                           <span className=" font-medium">
//                             {plan === 'Video'
//                               ? 'Video Editing'
//                               : plan === 'Graphic'
//                               ? 'Graphic Design'
//                               : plan === 'Both'
//                               ? 'Video + Graphics'
//                               : plan === 'AI'
//                               ? 'AI Lab'
//                               : plan}
//                           </span>
//                           <span className="font-medium">
//                             {moneyPrefixed(total || basePrice)}
//                           </span>
//                         </div>
//                         {promoApplied && (
//                           <div className="flex justify-between text-sm text-[#737373]">
//                             <span className="">
//                               Promotion Code ({promoData?.code || 'Applied'})
//                             </span>
//                             <span className="font-medium text-[#737373]">
//                               -{moneyPrefixed(discountAmount)}
//                             </span>
//                           </div>
//                         )}
//                         <div className="flex justify-between items-center text-sm text-[#737373]">
//                           <span className=" font-medium flex items-center gap-1">
//                             Tax
//                             <sup>
//                               <TooltipIcon
//                                 content="Tax is determined by billing information"
//                                 position="right"
//                               />
//                             </sup>
//                           </span>
//                           <span className="text-xs text-gray-500">
//                             {taxAmount > 0
//                               ? moneyPrefixed(taxAmount / 100)
//                               : 'Enter Address to calculate'}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="mt-3 pt-3 border-t text-lg flex justify-between items-center">
//                         <span className="font-semibold">Total</span>
//                         <span className="text-xl font-bold">
//                           {moneyPrefixed(finalTotal + taxAmount / 100)}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Recommended for you - Only show if there are recommendations */}
//                     {recommendations.length > 0 && (
//                       <div>
//                         <div className="flex items-center justify-between mb-2 mt-1 px-2">
//                           <h3 className="sm:text-base text-sm font-medium text-black">
//                             Recommended for you
//                           </h3>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => recommendationsEmbla?.scrollPrev()}
//                               disabled={!canScrollPrev}
//                               className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
//                                 canScrollPrev
//                                   ? 'border-gray-300 hover:bg-gray-50'
//                                   : 'border-gray-200 opacity-50 cursor-not-allowed'
//                               }`}
//                             >
//                               <svg
//                                 width="12"
//                                 height="12"
//                                 viewBox="0 0 12 12"
//                                 fill="none"
//                               >
//                                 <path
//                                   d="M7 2L3 6L7 10"
//                                   stroke={canScrollPrev ? 'black' : '#D1D5DB'}
//                                   strokeWidth="1.5"
//                                   strokeLinecap="round"
//                                 />
//                               </svg>
//                             </button>
//                             <button
//                               onClick={() => recommendationsEmbla?.scrollNext()}
//                               disabled={!canScrollNext}
//                               className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
//                                 canScrollNext
//                                   ? 'border-gray-300 hover:bg-gray-50'
//                                   : 'border-gray-200 opacity-50 cursor-not-allowed'
//                               }`}
//                             >
//                               <svg
//                                 width="12"
//                                 height="12"
//                                 viewBox="0 0 12 12"
//                                 fill="none"
//                               >
//                                 <path
//                                   d="M5 2L9 6L5 10"
//                                   stroke={canScrollNext ? 'black' : '#D1D5DB'}
//                                   strokeWidth="1.5"
//                                   strokeLinecap="round"
//                                 />
//                               </svg>
//                             </button>
//                           </div>
//                         </div>
//                         <div className="bg-white shadow-md rounded-md p-4">
//                           <div
//                             className="overflow-hidden"
//                             ref={recommendationsRef}
//                           >
//                             <div className="flex gap-4">
//                               {recommendations.map((item) => (
//                                 <div
//                                   key={item.id}
//                                   className="flex-[0_0_100%] min-w-0"
//                                 >
//                                   <h4 className="sm:text-lg mt-1 font-medium mb-4">
//                                     {item.title} for an additional{' '}
//                                     <span className="border-[#cff000] border-[1px] bg-[#f9ffd6] px-2 py-0.5 font-bold rounded-md">
//                                       {moneyPrefixed(
//                                         item.additionalAmount || 0
//                                       )}
//                                     </span>
//                                   </h4>
//                                   {/* Three buttons in one row */}
//                                   <div className="flex items-center gap-2 mb-3 flex-wrap">
//                                     {/* Active Req with number in bordered circle */}
//                                     <div className="flex items-center gap-2">
//                                       <span className="w-6 h-6 flex items-center justify-center text-base font-bold border-[1px] border-[#cff000] bg-transparent rounded-full">
//                                         {item.activeReq}
//                                       </span>
//                                       <span className="sm:text-xs text-[11px] font-medium whitespace-nowrap">
//                                         Active Req
//                                         <sup className="text-xs">®</sup>
//                                       </span>
//                                     </div>
//                                     {/* Delivery Type */}
//                                     <div className="flex items-center gap-2">
//                                       <span className="w-6 h-6 flex items-center justify-center border-[1px] border-[#cff000] bg-transparent rounded-full">
//                                         <svg
//                                           width="12"
//                                           height="12"
//                                           viewBox="0 0 12 12"
//                                           fill="none"
//                                         >
//                                           <path
//                                             d="M2 6L5 9L10 3"
//                                             stroke="black"
//                                             strokeWidth="2"
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                           />
//                                         </svg>
//                                       </span>
//                                       <span className="sm:text-xs text-[11px] font-medium whitespace-nowrap">
//                                         {item.targetDelivery === 'fast'
//                                           ? 'Fast Delivery'
//                                           : 'Standard Delivery'}
//                                         <sup className="text-xs">®</sup>
//                                       </span>
//                                     </div>
//                                     {/* Service Type */}
//                                     <div className="flex items-center gap-2">
//                                       <span className="w-6 h-6 flex items-center justify-center border-[1px] border-[#cff000] bg-transparent rounded-full">
//                                         <svg
//                                           width="12"
//                                           height="12"
//                                           viewBox="0 0 12 12"
//                                           fill="none"
//                                         >
//                                           <path
//                                             d="M2 6L5 9L10 3"
//                                             stroke="black"
//                                             strokeWidth="2"
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                           />
//                                         </svg>
//                                       </span>
//                                       <span className="sm:text-xs text-[11px] font-medium whitespace-nowrap">
//                                         {item.targetPlan === 'Both'
//                                           ? 'Video + Graphics'
//                                           : item.targetPlan}
//                                       </span>
//                                     </div>
//                                   </div>
//                                   {/* Update Order button on next line at flex-end */}
//                                   <div className="flex justify-end">
//                                     <button
//                                       type="button"
//                                       onClick={() => handleUpdateOrder(item)}
//                                       className="px-4 py-1 sm:text-xs text-[11px] font-medium text-black bg-[#F4F4F4] rounded-md hover:bg-gray-300 transition-colors inline-flex items-center gap-2"
//                                     >
//                                       <span className="text-base font-bold">
//                                         +
//                                       </span>
//                                       Update Order
//                                     </button>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Testimonial Carousel - Hidden on mobile (sm and below) */}
//                     <div className="hidden sm:block rounded-md p-1 overflow-hidden mt-5">
//                       <div className="overflow-hidden" ref={testimonialRef}>
//                         <div className="flex">
//                           {TESTIMONIALS.map((testimonial) => (
//                             <div
//                               key={testimonial.id}
//                               className="flex-[0_0_100%] min-w-0 px-2"
//                             >
//                               <div className="flex flex-col sm:flex-row gap-3 items-center py-3 px-3">
//                                 {/* Image with D shape background */}
//                                 <div className="relative shrink-0">
//                                   <div className="absolute -left-3 -top-3 w-16 h-16 bg-[#cff000] rounded-md rounded-r-[50px]"></div>
//                                   <div className="relative w-18 h-20 rounded-md rounded-r-[50px] overflow-hidden z-10">
//                                     <Image
//                                       src={testimonial.image}
//                                       alt={testimonial.name}
//                                       fill
//                                       sizes="(min-width: 640px) 80px, 72px"
//                                       className="object-cover"
//                                       quality={90}
//                                       priority={false}
//                                     />
//                                   </div>
//                                 </div>
//                                 {/* Content */}
//                                 <div className="flex-1 flex flex-col justify-center h-20">
//                                   <p className="text-black text-sm leading-tight mb-1">
//                                     {testimonial.quote}
//                                   </p>
//                                   <div>
//                                     <h4 className="text-black font-semibold text-sm leading-tight">
//                                       {testimonial.name}
//                                     </h4>
//                                     <p className="text-gray-600 text-xs leading-tight">
//                                       {testimonial.role}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                       {/* Pagination dots */}
//                       <div className="flex justify-center gap-2 mt-4">
//                         {TESTIMONIALS.map((_, index) => (
//                           <button
//                             key={index}
//                             onClick={() => testimonialEmbla?.scrollTo(index)}
//                             className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                               index === testimonialIndex
//                                 ? 'bg-[#cff000]'
//                                 : 'bg-transparent border border-gray-400 hover:border-gray-600'
//                             }`}
//                             aria-label={`Go to testimonial ${index + 1}`}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Right column: Payment Element */}
//             <div className="h-fit animate-expandDown">
//               <div className="bg-white shadow-xl rounded-md p-4 relative">
//                 {error ? (
//                   <div className="text-red-600 text-sm p-4 bg-red-50 rounded-md">
//                     {error}
//                   </div>
//                 ) : loading ? (
//                   <>
//                     <div className="space-y-3">
//                       <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//                       <div className="h-10 bg-gray-200 rounded"></div>
//                       <div className="h-10 bg-gray-200 rounded"></div>
//                     </div>
//                     {/* Payment method skeleton */}
//                     <div className="space-y-3">
//                       <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                       <div className="h-32 bg-gray-200 rounded"></div>
//                     </div>
//                     {/* Cardholder name skeleton */}
//                     <div className="space-y-3">
//                       <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//                       <div className="h-10 bg-gray-200 rounded"></div>
//                     </div>
//                     {/* Address skeleton */}
//                     <div className="space-y-3">
//                       <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                       <div className="h-40 bg-gray-200 rounded"></div>
//                     </div>
//                     {/* Button skeleton */}
//                     <div className="h-12 bg-gray-200 rounded"></div>
//                   </>
//                 ) : (
//                   <div className="text-sm text-gray-600 text-center py-12">
//                     Unable to initialize payment.
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
export default function CheckoutPlaceholder() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Checkout is temporarily disabled</h1>
      <p>Please contact support for assistance.</p>
    </div>
  );
}