'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const faqDataDummy = [
  {
    id: 'item-1',
    question: 'How hard is it to cancel a subscription?',
    answer:
      'Canceling your subscription is simple and can be done at any time through your account settings. There are no cancellation fees or hidden charges.',
  },
  {
    id: 'item-2',
    question: 'Can you create print-ready designs?',
    answer:
      'Yes, we can create high-resolution, print-ready designs in various formats including PDF, AI, and EPS files suitable for professional printing.',
  },
  {
    id: 'item-3',
    question: 'Tell me more about your team. Where are they located?',
    answer:
      'Our team is made up of full-time designers, video editors, AI specialists, and project managers working under one creative vision. We operate as a distributed studio with teams based in India, Bangladesh, and Canada, allowing us to collaborate seamlessly across time zones and deliver projects faster without compromising quality or creativity.',
    defaultOpen: true,
  },
  {
    id: 'item-4',
    question: 'How many tasks will my team work on each day?',
    answer:
      'It depends on the complexity and type of requests. Our team focuses on delivering quality over quantity, ensuring every design or video gets the attention it deserves usually completing multiple tasks each day with smooth turnaround times.',
  },
  {
    id: 'item-5',
    question: 'How many brands can I submit requests for?',
    answer:
      'You can submit requests for unlimited brands across all our subscription plans. Each brand can have its own style guide and requirements.',
  },
]

export default function FAQ({ faqData = faqDataDummy, onOpenFreeTrial   }) {
  const [showAll, setShowAll] = useState(false)
  const VISIBLE_COUNT = 5
  const router = useRouter()

  const handleBookCall = () => {
    if (document.getElementById('book-call')) {
      document
        .getElementById('book-call')
        ?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/video?scroll=book-call')
    }
  }

  // ✨ NEW: compute which items to render
  const itemsToRender = showAll ? faqData : faqData.slice(0, VISIBLE_COUNT)

  // ✨ NEW: keep default open only within the rendered items
  const defaultOpenId = itemsToRender.find((item) => item.defaultOpen)?.id
  return (
    <div className="w-full py-6 md:py-10 md:pb-14 max-w-7xl mx-auto px-4 lg:px-8">
      <div className="flex flex-col mb-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
          <span className="text-base font-medium text-[#1D1F1E] uppercase tracking-wide">
            FAQ
          </span>
        </div>
        <span>
          <hr className="border-gray-400" />
        </span>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 p-1">
          {/* Left Column - Heading and Contact Info (Desktop only) */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                Answers to the
                <br />
                frequently asked
                <br />
                <em className="font-instrument-italic font-extralight">
                  questions.
                </em>
              </h1>
            </div>

            {/* Contact Section (only visible on lg and above) */}
            <div className="mt-6 lg:mt-0 hidden lg:block">
              <h3 className="text-lg font-semibold">Still have questions?</h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                Didn’t find what you were looking for? Our team is just a
                message away.
              </p>

              <Button
                variant="outline"
                className="group mt-4 bg-transparent rounded-full hover:bg-black hover:text-white transform cursor-pointer transition-all duration-300"
                onClick={handleBookCall}
              >
                Book a Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="w-full">
            <Accordion
              type="single"
              collapsible
              defaultValue={defaultOpenId}
              className="space-y-4"
            >
              {itemsToRender.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border border-gray-300 rounded-lg px-6 py-2 text-base"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-4 [&[data-state=open]>svg]:rotate-45">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
  {faq.question === 'Where do I sign up?' ? (
    <>
      Sign up for our affiliate program{' '}
      <button
        onClick={onOpenFreeTrial}
        className="text-blue-600 underline hover:text-blue-800"
      >
        here
      </button>
      .
    </>
  ) : (
    faq.answer
  )}
</AccordionContent>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Show more/less button */}
            {faqData.length > VISIBLE_COUNT && (
              <div className="flex justify-end mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2 cursor-pointer"
                  onClick={() => setShowAll((v) => !v)}
                >
                  {showAll ? 'Show less' : 'Show more'}
                </Button>
              </div>
            )}

            {/* Contact Section (Mobile & Tablet only) */}
            <div className="mt-6 block lg:hidden">
              <h3 className="text-lg font-semibold">Still have questions?</h3>
              <p className="text-muted-foreground leading-relaxed">
                For further assistance, please reach out through our{' '}
                <span className="">Contact page </span> or give us a call. Our
                team is ready to help.
              </p>

              <Link href="/contact-us">
                <Button
                  variant="outline"
                  className="group mt-4 bg-transparent rounded-full"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
