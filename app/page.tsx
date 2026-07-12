import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Problems } from '@/components/problems'
import { Features } from '@/components/features'
import { Workflow } from '@/components/workflow'
import { Benefits } from '@/components/benefits'
import { FAQ } from '@/components/faq'
import { CTA, Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problems />
      <Features />
      <Workflow />
      <Benefits />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
