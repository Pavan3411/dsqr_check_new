"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Add a small delay to ensure the page content is fully rendered
    const timer = setTimeout(() => {
      // Try multiple scroll methods to ensure it works
      if (typeof window !== 'undefined') {
        // Method 1: Direct scroll
        window.scrollTo(0, 0);
        
        // Method 2: Using scrollTo with options
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        
        // Method 3: Scroll the document element
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
        
        // Method 4: Scroll the body
        if (document.body) {
          document.body.scrollTop = 0;
        }
      }
    }, 100); // 100ms delay

    return () => clearTimeout(timer);
  }, [pathname])

  return null
}
