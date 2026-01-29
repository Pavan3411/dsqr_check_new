"use client"
import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";

// You can customize the image data here. Now contains 24 images.
const images = [
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/10.webp", alt: "User Image 1" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/11.webp", alt: "User Image 2" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/12.webp", alt: "User Image 3" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/13.webp", alt: "User Image 4" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/14.webp", alt: "User Image 5" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/15.webp", alt: "User Image 6" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/18.webp", alt: "User Image 7" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/19.webp", alt: "User Image 8" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/20.webp", alt: "User Image 9" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/21.webp", alt: "User Image 10" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/22.webp", alt: "User Image 11" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/23.webp", alt: "User Image 12" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/24.webp", alt: "User Image 13" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/25.webp", alt: "User Image 14" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/26.webp", alt: "User Image 15" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/27.webp", alt: "User Image 16" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/28.webp", alt: "User Image 17" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/3%20(2).webp", alt: "User Image 18" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/4%20(1).webp", alt: "User Image 19" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/5%20(1).webp", alt: "User Image 20" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/6%20(4).webp", alt: "User Image 21" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/7%20(1).webp", alt: "User Image 22" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/8%20(5).webp", alt: "User Image 23" },
  { src: "https://dsqrstudio.b-cdn.net/Team_photo/9.webp", alt: "User Image 24" },
];

const topRowImages = images;
// Reverse the array for the bottom row for a different starting visual
const bottomRowImages = [...images].reverse();

// This component contains the CSS for the animation.
const AnimationStyles = () => (
    <style jsx global>{`
        body {
            font-family: 'Inter', sans-serif;
        }

        .wavy-scroller {
            width: 100%;
            overflow: hidden;
            // -webkit-mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
            // mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
            /* Increased vertical padding to ensure the larger animation is not clipped */
            padding-top: 70px;
            padding-bottom: 70px;
        }

        .scroller-inner {
            display: flex;
            width: fit-content;
        }

        .scroll-left {
            animation: scroll-left 120s linear infinite; /* Adjusted duration for more images */
        }

       .scroll-right {
  animation: scroll-right 120s linear infinite;
}

/* ✅ Mobile: apply delay so they don’t sync */
@media (max-width: 768px) {
  .scroll-right {
    animation-delay: -45s; /* half duration, keeps them offset */
  }
}

/* ✅ Desktop: shift starting point instead of delay */
@media (min-width: 769px) {
  .scroll-right {
    transform: translateX(-100%); /* start fully offset */
  }
}
        .image-card {
            width: 6.5rem;
            height: 6.5rem;
            margin: 0 15px;
            border-radius: 24px;
            flex-shrink: 0;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.07);
        }
            @media (max-width: 768px) {
  .image-card {
    width: 6rem;
    height: 6rem;
  }
}

        
        /* Apply up-starting animation to odd children */
        .image-card:nth-child(odd) {
            animation: wavy-motion-up 4s ease-in-out infinite;
        }

        /* Apply down-starting animation to even children */
        .image-card:nth-child(even) {
            animation: wavy-motion-down 4s ease-in-out infinite;
        }

        @keyframes scroll-left {
            from { transform: translateX(0%); }
            to { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0%); }
        }

        @keyframes wavy-motion-up {
            0%, 100% {
                transform: translateY(-60px);
            }
            50% {
                transform: translateY(60px);
            }
        }
        
        @keyframes wavy-motion-down {
            0%, 100% {
                transform: translateY(45px);
            }
            50% {
                transform: translateY(-45px);
            }
        }
    `}</style>
);


const App = () => {
    const textRef = useRef(null);
    const isInView = useInView(textRef, { once: true, margin: "-100px" });

    // Duplicate arrays for seamless loop
    const loopedTopImages = [...topRowImages, ...topRowImages];
    const loopedBottomImages = [...bottomRowImages, ...bottomRowImages];

    // Variants for the container to orchestrate the letter animations
    const sentenceVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.1,
                staggerChildren: 0.04, // Stagger effect for each letter
            },
        },
    };

    // Variants for each individual letter
    const letterVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };
// Variants for the slide-in-from-left animations
const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
    },
};
    return (
        <>
       
            <AnimationStyles />
            <div className="flex flex-col items-center justify-center text-gray-800 overflow-x-hidden">
              <div className="max-w-7xl mx-auto py-4">
       </div>
                <div className="relative w-full max-w-screen mx-auto flex flex-col items-center py-8">
                    
                    {/* Top Scroller (Left) */}
                    <div className="wavy-scroller">
                        <div className="scroller-inner scroll-left">
                            {loopedTopImages.map((image, index) => (
                                <div className="image-card" key={`top-${index}`}>
                                    <img 
                                        src={image.src} 
                                        alt={image.alt} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Animated Text Block */}
<motion.div
    ref={textRef}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    className="text-center my-4 md:my-6 px-4 z-10"
>
    {/* Small heading slides in */}
    <motion.p 
        className="text-sm md:text-2xl font-medium text-gray-600"
        variants={slideInLeft}
    >
        Minds that make it happen
    </motion.p>
    
    {/* Main heading fades in letter-by-letter */}
    <motion.h2
        className="text-3xl md:text-6xl font-semibold my-2 tracking-tight"
        variants={sentenceVariants} // Orchestrates the children animation
    >
        {"Your ".split("").map((char, index) => (
            <motion.span key={`your-${index}`} variants={letterVariants}>{char}</motion.span>
        ))}
        <em className="font-serif font-extralight italic">
            {"Creative".split("").map((char, index) => (
                <motion.span key={`creative-${index}`} variants={letterVariants}>{char}</motion.span>
            ))}
        </em>
        {" Squad".split("").map((char, index) => (
            <motion.span key={`squad-${index}`} variants={letterVariants}>{char}</motion.span>
        ))}
    </motion.h2>

    {/* Paragraph slides in with a delay */}
    <motion.p
        className="mt-2 text-gray-500 max-w-2xl mx-auto md:text-xl"
        variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.8 } 
            },
        }}
    >
        From sketches to final exports, our team delivers work that's fast, flawless, and full of impact.
    </motion.p>
</motion.div>

                    {/* Bottom Scroller (Right) */}
                     <div className="wavy-scroller">
                        <div className="scroller-inner scroll-right">
                           {loopedBottomImages.map((image, index) => (
                                <div className="image-card" key={`bottom-${index}`}>
                                    <img 
                                        src={image.src} 
                                        alt={image.alt} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default App;



//sine
// import React, { useRef } from 'react';
// import { motion, useInView } from "framer-motion";

// // You can customize the image data here. Now contains 24 images.
// const images = [
//     { src: "https://placehold.co/120x120/a855f7/ffffff?text=User1", alt: "User Image 1" },
//     { src: "https://placehold.co/120x120/ec4899/ffffff?text=User2", alt: "User Image 2" },
//     { src: "https://placehold.co/120x120/84cc16/ffffff?text=User3", alt: "User Image 3" },
//     { src: "https://placehold.co/120x120/14b8a6/ffffff?text=User4", alt: "User Image 4" },
//     { src: "https://placehold.co/120x120/f97316/ffffff?text=User5", alt: "User Image 5" },
//     { src: "https://placehold.co/120x120/3b82f6/ffffff?text=User6", alt: "User Image 6" },
//     { src: "https://placehold.co/120x120/ef4444/ffffff?text=User7", alt: "User Image 7" },
//     { src: "https://placehold.co/120x120/facc15/ffffff?text=User8", alt: "User Image 8" },
//     { src: "https://placehold.co/120x120/6366f1/ffffff?text=User9", alt: "User Image 9" },
//     { src: "https://placehold.co/120x120/22c55e/ffffff?text=User10", alt: "User Image 10" },
//     { src: "https://placehold.co/120x120/a855f7/ffffff?text=User11", alt: "User Image 11" },
//     { src: "https://placehold.co/120x120/ec4899/ffffff?text=User12", alt: "User Image 12" },
//     { src: "https://placehold.co/120x120/84cc16/ffffff?text=User13", alt: "User Image 13" },
//     { src: "https://placehold.co/120x120/14b8a6/ffffff?text=User14", alt: "User Image 14" },
//     { src: "https://placehold.co/120x120/f97316/ffffff?text=User15", alt: "User Image 15" },
//     { src: "https://placehold.co/120x120/3b82f6/ffffff?text=User16", alt: "User Image 16" },
//     { src: "https://placehold.co/120x120/ef4444/ffffff?text=User17", alt: "User Image 17" },
//     { src: "https://placehold.co/120x120/facc15/ffffff?text=User18", alt: "User Image 18" },
//     { src: "https://placehold.co/120x120/6366f1/ffffff?text=User19", alt: "User Image 19" },
//     { src: "https://placehold.co/120x120/22c55e/ffffff?text=User20", alt: "User Image 20" },
//     { src: "https://placehold.co/120x120/a855f7/ffffff?text=User21", alt: "User Image 21" },
//     { src: "https://placehold.co/120x120/ec4899/ffffff?text=User22", alt: "User Image 22" },
//     { src: "https://placehold.co/120x120/84cc16/ffffff?text=User23", alt: "User Image 23" },
//     { src: "https://placehold.co/120x120/14b8a6/ffffff?text=User24", alt: "User Image 24" },
// ];

// const topRowImages = images;
// // Reverse the array for the bottom row for a different starting visual
// const bottomRowImages = [...images].reverse();

// // This component contains the CSS for the animation.
// const AnimationStyles = () => (
//     <style jsx global>{`
//         body {
//             font-family: 'Inter', sans-serif;
//         }

//         .wavy-scroller {
//             width: 100%;
//             overflow: hidden;
//             // -webkit-mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
//             // mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
//             /* Increased vertical padding to ensure the larger animation is not clipped */
//             padding-top: 70px;
//             padding-bottom: 70px;
//         }

//         .scroller-inner {
//             display: flex;
//             width: fit-content;
//         }

//         .scroll-left {
//             animation: scroll-left 60s linear infinite; /* Adjusted duration for more images */
//         }

//         .scroll-right {
//             animation: scroll-right 60s linear infinite; /* Adjusted duration for more images */
//         }

//         .image-card {
//             width: 120px;
//             height: 120px;
//             margin: 0 15px;
//             border-radius: 24px;
//             flex-shrink: 0;
//             overflow: hidden;
//             box-shadow: 0 10px 20px rgba(0, 0, 0, 0.07);
//             animation: wavy-motion 4s ease-in-out infinite;
//         }
        
//         /* Stagger the wave animation for each card to create the offset effect */
//         /* This pattern now repeats correctly for all 48 potential cards */
//         .image-card:nth-child(10n + 1) { animation-delay: -0.4s; }
//         .image-card:nth-child(10n + 2) { animation-delay: -0.8s; }
//         .image-card:nth-child(10n + 3) { animation-delay: -1.2s; }
//         .image-card:nth-child(10n + 4) { animation-delay: -1.6s; }
//         .image-card:nth-child(10n + 5) { animation-delay: -2.0s; }
//         .image-card:nth-child(10n + 6) { animation-delay: -2.4s; }
//         .image-card:nth-child(10n + 7) { animation-delay: -2.8s; }
//         .image-card:nth-child(10n + 8) { animation-delay: -3.2s; }
//         .image-card:nth-child(10n + 9) { animation-delay: -3.6s; }
//         .image-card:nth-child(10n + 10) { animation-delay: -4.0s; }

//         @keyframes scroll-left {
//             from { transform: translateX(0%); }
//             to { transform: translateX(-50%); }
//         }

//         @keyframes scroll-right {
//             from { transform: translateX(-50%); }
//             to { transform: translateX(0%); }
//         }

//         @keyframes wavy-motion {
//             0%, 100% {
//                 transform: translateY(-60px);
//             }
//             50% {
//                 transform: translateY(60px);
//             }
//         }
//     `}</style>
// );


// const App = () => {
//     const textRef = useRef(null);
//     const isInView = useInView(textRef, { once: true, margin: "-100px" });

//     // Duplicate arrays for seamless loop
//     const loopedTopImages = [...topRowImages, ...topRowImages];
//     const loopedBottomImages = [...bottomRowImages, ...bottomRowImages];

//     const textVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { 
//             opacity: 1, 
//             y: 0, 
//             transition: { duration: 0.8, ease: "easeInOut" } 
//         }
//     };

//     return (
//         <>
//             <AnimationStyles />
//             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
//                 <div className="relative w-full max-w-screen mx-auto flex flex-col items-center py-8">
                    
//                     {/* Top Scroller (Left) */}
//                     <div className="wavy-scroller">
//                         <div className="scroller-inner scroll-left">
//                             {loopedTopImages.map((image, index) => (
//                                 <div className="image-card" key={`top-${index}`}>
//                                     <img 
//                                         src={image.src} 
//                                         alt={image.alt} 
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Animated Text Block */}
//                     <motion.div
//                         ref={textRef}
//                         variants={textVariants}
//                         initial="hidden"
//                         animate={isInView ? "visible" : "hidden"}
//                         className="text-center my-12 md:my-16 px-4 z-10"
//                     >
//                         <h1 className="text-4xl md:text-6xl font-bold tracking-tight">You will find yourself</h1>
//                         <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-indigo-600 mb-4">among us</h1>
//                         <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
//                             Dive into a dynamic community where artists and buyers seamlessly merge.
//                         </p>
//                     </motion.div>

//                     {/* Bottom Scroller (Right) */}
//                      <div className="wavy-scroller">
//                         <div className="scroller-inner scroll-right">
//                            {loopedBottomImages.map((image, index) => (
//                                 <div className="image-card" key={`bottom-${index}`}>
//                                     <img 
//                                         src={image.src} 
//                                         alt={image.alt} 
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </>
//     );
// };

// export default App;

