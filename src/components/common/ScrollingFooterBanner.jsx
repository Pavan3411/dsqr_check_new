"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FreeTrialForm from './FreeTrialForm';

// This is your reusable scrolling footer banner component.
// It can be imported and used on any page.
// It requires two props: `triggerRef` and `endRef` to know where to appear and disappear.

const ScrollingFooterBanner = ({ triggerRef, endRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const [open, setOpen] = useState(false)

  useEffect(() => {
const handleScroll = () => {
  if (!triggerRef.current || !endRef.current) return;

  const currentScrollY = window.scrollY;
  const triggerPoint = triggerRef.current.offsetTop;
  const endPoint = endRef.current.offsetTop; // top of Membership
  const viewportBottom = currentScrollY + window.innerHeight;

  const isScrollingDown = currentScrollY > lastScrollY.current;

  // show if we're below trigger and not yet reached membership
  const isInBounds = currentScrollY > triggerPoint && viewportBottom < endPoint;

  if (isInBounds && isScrollingDown) {
    setIsVisible(true);
  } else {
    setIsVisible(false);
  }

  if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
    lastScrollY.current = currentScrollY;
  }
};

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerRef, endRef]); // Effect dependencies
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768); // Tailwind's md=768px
  check();
  window.addEventListener('resize', check);
  return () => window.removeEventListener('resize', check);
}, []);

  return (
    <AnimatePresence>
      {isVisible && ( 
         isMobile ? ( <>
        // MOBILE: only button
        <motion.button
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ ease: 'easeInOut', duration: 0.4 }}
          className="fixed bottom-5 left-5 z-50 bg-[var(--color-primary)] text-black text-base px-4 py-2.5 rounded-full shadow-md"
          onClick={() => setOpen(true)}
        >
        Start Your Free Trial
        </motion.button>
                        <FreeTrialForm open={open} setOpen={setOpen} />
        
        </>
      ) : (
 <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ ease: 'easeInOut', duration: 0.4 }}
          className="fixed bottom-5 left-0 right-0 max-w-3xl mx-auto z-50 p-3 shadow-lg bg-gray-100 rounded-full"
        >
          <div className="container mx-auto flex items-center justify-between gap-4 px-4">
            {/* Left Side: Logo & Text */}
            <div className="flex items-center gap-2 md:gap-10">
              <div className="w-16">
                  
            <img src="/images/logo.svg" alt="dsqr logo" />
                  
              </div>
              <div>
                <h3 className="font-bold text-xs text-gray-900 md:text-xl whitespace-nowrap">Start Your Free Trial
</h3>
                <p className="text-xs md:text-sm text-gray-700">Explore your creative team | Cancel Anytime</p>
              </div>
            </div>

            {/* Right Side: Buttons */}
            <div className="flex items-center flex-shrink-0">
              <button className="bg-[var(--color-primary)] text-black text-xs md:text-base px-3 md:px-5 py-2.5 rounded-full hover:bg-opacity-90 transition-colors cursor-pointer"
              onClick={() => setOpen(true)}>
                Let's Start
              </button>
                                      <FreeTrialForm open={open} setOpen={setOpen} />

              {/* <button className="bg-gray-200 text-black px-5 py-2.5 rounded-full hover:bg-gray-300 transition-colors">
                Sign in
              </button> */}
            </div>
          </div>
        </motion.div>
      )
      )}
    </AnimatePresence>
  );
};

export default ScrollingFooterBanner;
