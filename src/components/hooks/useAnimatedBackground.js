// 'use client'

// import { useState, useEffect } from 'react'
// import { useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

// /**
//  * A custom hook to manage background and text color animations based on scroll position.
//  * @param {object} refs - The refs marking the start and end of the animation trigger area.
//  * @param {React.RefObject} refs.startRef - Ref for the element that starts the transition.
//  * @param {React.RefObject} refs.endRef - Ref for the element that ends the transition.
//  * @returns {{backgroundColor: import('framer-motion').MotionValue, textColor: import('framer-motion').MotionValue}}
//  */
// export function useAnimatedBackground({ startRef, endRef }) {
//   // 1. Detect when the start and end refs are in view
//   const startInView = useInView(startRef, {
//     amount: 0.4,
//     rootMargin: '0px 0px -40% 0px',
//   });
//   const endInView = useInView(endRef, {
//     amount: 0.4,
//     rootMargin: '0px',
//   });

//   // 2. Manage the active state based on the inView triggers
//   const [isBlackActive, setIsBlackActive] = useState(false);

//   useEffect(() => {
//     if (startInView && !endInView) {
//       setIsBlackActive(true);
//     } else {
//       setIsBlackActive(false);
//     }
//   }, [startInView, endInView]);

//   // 3. Create a smooth, spring-based motion value for the transition
//   const t = useMotionValue(isBlackActive ? 1 : 0);
//   useEffect(() => {
//     t.set(isBlackActive ? 1 : 0);
//   }, [isBlackActive, t]);

//   const spring = useSpring(t, { stiffness: 160, damping: 24 });

//   // 4. Transform the spring value into animated color values
//   const backgroundColor = useTransform(spring, [0, 1], ['#ffffff', '#000000']);
//   const textColor = useTransform(spring, [0, 1], ['#1f2937', '#ffffff']);

//   // 5. Return the animated values to be used in the component
//   return { backgroundColor, textColor };
// }

'use client';

import { useEffect, useState } from 'react';
import { useMotionValue, useSpring, useTransform, useScroll, useMotionValueEvent } from 'framer-motion';

export function useAnimatedBackground({ startRef, endRef }) {
  // Start trigger: when startRef's TOP hits 80% of viewport (== 20% visible)
  const { scrollYProgress: startCross } = useScroll({
    target: startRef,
    offset: ['start 80%', 'start 80%'], // fire exactly at that line
  });

  // End trigger: when endRef's BOTTOM hits 20% of viewport (== ~20% remains)
  const { scrollYProgress: endCross } = useScroll({
    target: endRef,
    offset: ['end 20%', 'end 20%'], // fire exactly when only ~20% is left
  });

  const [isBlackActive, setIsBlackActive] = useState(false);

  // Update when either threshold moves
  useMotionValueEvent(startCross, 'change', (v) => {
    const startPassed = v >= 1;          // crossed 80% line
    const endPassed = endCross.get() >= 1; // end already finished?
    setIsBlackActive(startPassed && !endPassed);
  });
  useMotionValueEvent(endCross, 'change', (v) => {
    const startPassed = startCross.get() >= 1;
    const endPassed = v >= 1;            // bottom reached 20% line
    setIsBlackActive(startPassed && !endPassed);
  });

  // springy blend 0→1 for colors
  const t = useMotionValue(0);
  useEffect(() => {
    t.set(isBlackActive ? 1 : 0);
  }, [isBlackActive]);
  const spring = useSpring(t, { stiffness: 160, damping: 24 });

  const backgroundColor = useTransform(spring, [0, 1], ['#fafafa', '#100C08']);
  const textColor = useTransform(spring, [0, 1], ['#1f2937', '#ffffff']);

  return { backgroundColor, textColor };
}
