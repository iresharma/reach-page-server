import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"} />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Agbalumo&family=Caveat&family=Dancing+Script&family=Edu+TAS+Beginner&family=Inter&family=Josefin+Sans&family=Oswald&family=Playfair+Display&family=Roboto+Condensed&family=Roboto+Slab&family=Shadows+Into+Light&display=swap" />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
