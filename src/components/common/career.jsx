'use client'

import { useState, useRef } from 'react'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { motion } from 'framer-motion'

export default function Career() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    position: '',
    message: '',
    cv: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThanks, setShowThanks] = useState(false)
  const fileInputRef = useRef(null)
  const [phoneKey, setPhoneKey] = useState(Date.now())

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // This function is now needed
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        cv: e.target.files[0],
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== '') {
        formDataToSend.append(key, formData[key])
      }
    })

    try {
      setIsSubmitting(true)
      const res = await fetch('/api/career', {
        method: 'POST',
        body: formDataToSend,
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setShowThanks(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          position: '',
          message: '',
          cv: null,
        })
        setPhoneKey(Date.now())
        if (fileInputRef.current) fileInputRef.current.value = ''
        setTimeout(() => setShowThanks(false), 2000)
      } else {
        alert('Error: ' + (data.message || data.error || 'Unknown error'))
      }
    } catch (err) {
      console.error('Submit error:', err)
      alert('Network or server error. Try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-4 md:px-8 px-6 pb-10">
      {/* Header with social handles */}
      <div className="flex justify-between items-center mb-3 max-h-4">
        <motion.div
          className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-medium -rotate-12 top-14 hidden md:block"
          initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: -12 }}
          transition={{ delay: 0, duration: 0.5 }}
        >
          @Join us
          <div className="absolute -bottom-2 left-1/2 w-2 h-2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-orange-400"></div>
        </motion.div>

        <motion.div
          className="relative bg-black text-white px-4 py-2 rounded-full font-medium rotate-12 top-14 hidden md:block"
          initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 12 }}
          transition={{ delay: 0, duration: 0.5 }}
        >
          @team
          <div className="absolute -bottom-2 left-1/2 w-2 h-2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
        </motion.div>
      </div>

      {/* Main heading */}
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 mb-6 tracking-tight "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Join the{' '}
          <em className="font-instrument-italic font-extralight">Creative</em>
          <br />
          Revolution.
        </motion.h1>
        <motion.p
          className="text-gray-600 md:text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Be part of a fast-growing creative studio where ideas move as fast as
          you do. At DSOR Studio, we combine design, video, and AI to push
          creative boundaries - and we're always looking for talent ready to
          make an impact.
        </motion.p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-primary shadow-lg border-[1px] border-gray-200 md:p-8 p-4 rounded-2xl"
        >
          {/* Name fields */}
          <div className="grid md:grid-cols-2 md:gap-16 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm md:text-lg font-medium text-gray-900 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-full  focus:border-transparent  transition-all"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm md:text-lg font-medium text-gray-900 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-full  focus:border-transparent  transition-all"
                required
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid md:grid-cols-2 md:gap-16 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm md:text-lg font-medium text-gray-900 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-full  focus:border-transparent  transition-all"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm md:text-lg font-medium text-gray-900 mb-2"
              >
                Phone Number
              </label>

              <PhoneInput
                country={'us'} // default country
                value={formData.phoneNumber}
                key={phoneKey}
                onChange={(phone) =>
                  setFormData({ ...formData, phoneNumber: phone })
                }
                inputProps={{
                  name: 'phoneNumber',
                  required: true,
                }}
                // Tailwind-friendly overrides
                containerClass="w-full"
                inputClass="!w-full !h-12 !pl-14 !pr-4 !text-base !rounded-full !border !border-gray-200"
                buttonClass="!absolute !left-0 !top-0 !h-12 !w-12 !rounded-l-full !bg-gray-50 !border-gray-200"
                dropdownClass="!z-50"
              />
            </div>
          </div>

          {/* Position and message */}
          <div className="grid md:grid-cols-2 md:gap-16 gap-6">
            <div>
              <label
                htmlFor="position"
                className="block text-sm md:text-lg font-medium text-gray-900 mb-2"
              >
                Select Position
              </label>
              <div className="relative">
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-full  focus:border-transparent  transition-all appearance-none bg-primary"
                  required
                >
                  <option value="">Select...</option>
                  <option value="designer">Graphic Designer</option>
                  {/* <option value="developer">Developer</option> */}
                  <option value="video-editor">Video Editor</option>
                  <option value="ai-specialist">AI Specialist</option>
                  <option value="project-manager">Project Manager</option>
                  <option value="sales-coordinator">Sales Coordinator</option>
                  <option value="business-development-executive">
                    Business Development Executive
                  </option>
                  <option value="hr-executive">HR Executive</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm md:text-lg font-medium text-gray-900 mb-2"
              >
                Let us know why you want to join us?
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl  focus:border-transparent  transition-all resize-none"
                placeholder="Tell us about motivation..."
              />
            </div>
          </div>

          {/* File upload and Submit */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            {/* Upload CV */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    ref={fileInputRef}
                    name="cv"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="bg-[var(--color-primary)] hover:bg-lime-600 text-black font-medium px-8 py-2 rounded-full transition-colors"
                  >
                    Upload Your CV
                  </button>
                </div>
                {/* File name feedback */}
                {formData.cv && (
                  <span className="text-gray-600 text-sm">
                    {formData.cv.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                (Only pdf, doc, docx files are allowed.)
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[var(--color-primary)] ${
                isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:bg-lime-500'
              } text-black font-medium px-12 py-2 rounded-full transition-colors`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </motion.div>
      {/* Thank you popup */}
      {/* Big attractive Thank-you popup */}
      {showThanks && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50">
          <div className="bg-primary rounded-2xl p-8 w-[min(560px,90%)] shadow-2xl transform transition-all">
            <div className="flex flex-col items-center gap-6">
              <div className="w-28 h-28 rounded-full bg-emerald-500 grid place-items-center shadow-lg">
                {/* white check icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414L8.414 15 5.293 11.879a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l9-9a1 1 0 00-1.414-1.414L9 17.586 6.707 15.293a1 1 0 00-1.414 0L2 18.586V18a1 1 0 011-1h.293l3.414-3.414L16.707 5.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Optional: use lastSubmittedName state variable if you have it */}
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Thanks
                {typeof lastSubmittedName !== 'undefined' && lastSubmittedName
                  ? `, ${lastSubmittedName}`
                  : ''}{' '}
                — we received it!
              </h2>

              <p className="text-sm md:text-base text-gray-600 text-center max-w-xl">
                Your application has been submitted successfully. We’ll review
                it and reach out if there’s a fit.
              </p>

              <button
                onClick={() => setShowThanks(false)}
                className="mt-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-2 rounded-full font-medium hover:bg-emerald-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
