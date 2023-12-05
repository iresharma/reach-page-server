import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "@/styles/buttons.css"
import "@/styles/header.css"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
