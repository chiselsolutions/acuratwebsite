import { DemoModalProvider } from './context/DemoModalContext'
import { Navbar } from './components/sections/Navbar'
import { Hero } from './components/sections/Hero'
import { SocialProof } from './components/sections/SocialProof'
import { Features } from './components/sections/Features'
import { WhoIsThisFor } from './components/sections/WhoIsThisFor'
import { WhyItMatters } from './components/sections/WhyItMatters'
import { HowItWorks } from './components/sections/HowItWorks'
import { Product } from './components/sections/Product'
import { About } from './components/sections/About'
import { CallToAction } from './components/sections/CallToAction'
import { Footer } from './components/sections/Footer'
import { DemoModalMount } from './components/sections/DemoModalMount'

export default function App() {
  return (
    <DemoModalProvider>
      <Navbar />

      <main>
        <Hero />
        <SocialProof />
        <Features />
        <WhoIsThisFor />
        <WhyItMatters />
        <HowItWorks />
        <Product />
        <About />
        <CallToAction />
      </main>

      <Footer />

      {/* Shared across every CTA on the page; loaded on first open */}
      <DemoModalMount />
    </DemoModalProvider>
  )
}
