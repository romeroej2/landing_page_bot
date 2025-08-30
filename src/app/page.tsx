import Hero from '@/components/Hero'
import Features from '@/components/Features'
import ProductCarousel from '@/components/ProductCarousel'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import DynamicHead from '@/components/DynamicHead'

export default function Home() {
  return (
    <main>
      <DynamicHead />
  <Hero />
  <Features id="features" />
  <ProductCarousel />
  <CTA />
  <Footer />
    </main>
  )
}