import { Figtree } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import ScrollToTop from '@/components/common/ScrollToTop'
import Script from 'next/script'
import ClientWrapper from '@/components/common/ClientWrapper'
import ThirdPartyScripts from '@/components/ThirdPartyScripts'
import { Suspense } from 'react'

const instrument = localFont({
  src: '/fonts/InstrumentSerif-Regular.ttf',
  variable: '--font-instrument',
})

const instrumentItalic = localFont({
  src: '/fonts/InstrumentSerif-Italic.ttf',
  variable: '--font-instrument-italic',
})
const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
})

export const metadata = {
  title: 'DSQR Studio',
  description: 'Creative Studio',
  icons: {
    icon: '/images/logo.svg',
  },
  openGraph: {
    title: 'DSQR Studio',
    description: 'Creative Studio',
    url: 'dsqr.studio',
    siteName: 'DSQR Studio',
    images: [
      {
        url: '/images/Logo_DSQR.png',
        width: 1200,
        height: 630,
        alt: 'DSQR Studio',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSQR Studio',
    description: 'Creative Studio',
    images: ['/images/Logo_DSQR.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* <!-- Google Tag Manager --> */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
        >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N3N9965X');
`}</Script>

        <ThirdPartyScripts />

        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2205882783094455');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* ✅ Rewardful Tracking */}
        <Script id="rewardful-init" strategy="lazyOnload">
          {`
            (function(w,r){
              w._rwq = r; 
              w[r] = w[r] || function(){ (w[r].q = w[r].q || []).push(arguments) }
            })(window,'rewardful');

            (function() {
              var el = document.createElement('script');
              el.setAttribute('src', 'https://r.wdfl.co/rw.js');
              el.setAttribute('data-rewardful', '3f97c0'); // 👈 replace with your site ID if needed
              document.body.appendChild(el);
            })();
          `}
        </Script>
        {/* ✅ LeadConnectorHQ Chatbot */}
        <Script
          id="chatbot-widget"
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="66e1b03206f10a0ea52167b2"
          strategy="lazyOnload"
        />
      </head>
      <body
        className={`${instrument.variable} ${figtree.variable} ${instrumentItalic.variable} antialiased min-h-screen`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N3N9965X"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <ScrollToTop />
<Suspense fallback={null}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
        </Suspense>
      </body>
    </html>
  )
}
