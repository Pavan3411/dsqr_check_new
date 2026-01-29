'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

export default function ClientWrapper({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  // Scroll to top on route change in a single, predictable way
  useEffect(() => {
    // small delay to let the new page layout settle (optional)
    const id = setTimeout(() => {
      // prefer window.scrollTo with behavior if you want smooth:
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, 30)

    return () => clearTimeout(id)
  }, [pathname])

  // Pages that should not have header and footer
  const noLayoutPages = ['/checkout', '/success']
  const hideLayout = noLayoutPages.includes(pathname)

  return (
    <>
      {!hideLayout && <Header />}
      <main className={hideLayout ? '' : 'flex-1 pt-16'}>{children}</main>
      {!hideLayout && <Footer />}
    </>
  )
}
