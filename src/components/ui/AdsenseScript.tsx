'use client'

import Script from 'next/script'

export function ExternalScripts() {
  return (
    <>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5149584959732751"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZTC9TEMHYV"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZTC9TEMHYV');
        `}
      </Script>
    </>
  )
}
