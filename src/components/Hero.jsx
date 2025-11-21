import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import DataTicker from './DataTicker'
import ScrollIndicator from './ScrollIndicator'

const headlineLines = [
  'We Engineer',
  'Attention,',
  'Emotion,',
  'Action.'
]

export default function Hero() {
  const containerRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Derived transforms for scroll behavior
  const progress = Math.min(scrollY / window.innerHeight, 1)
  const networkScale = 1 - progress * 0.3 // to 0.7x
  const networkTranslateY = -progress * 150
  const headlineScale = 1 - progress * 0.15 // to 0.85x
  const headlineOpacity = 1 - progress * 0.7 // to 0.3

  return (
    <section ref={containerRef} className="relative min-h-[120vh] overflow-hidden" style={{ backgroundColor: '#1A1A1A' }}>
      {/* Fluid gradient mesh background */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ filter: 'url(#grain-filter)' }}
        animate={{
          background: [
            'radial-gradient(1200px 800px at 70% 50%, rgba(44,95,77,0.25), transparent 60%), radial-gradient(800px 600px at 30% 70%, rgba(44,95,77,0.12), transparent 60%)',
            'radial-gradient(1200px 800px at 68% 46%, rgba(44,95,77,0.22), transparent 60%), radial-gradient(900px 700px at 26% 72%, rgba(44,95,77,0.14), transparent 60%)'
          ]
        }}
        transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
      />

      {/* Subtle grain overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM3MTU4MTN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80)' }} />

      {/* Spline 3D neural/grid cover on right 60% */}
      <motion.div
        className="absolute right-0 top-0 h-full w-[60%]"
        style={{ transformOrigin: 'center' }}
        animate={{ scale: networkScale, y: networkTranslateY }}
        transition={{ type: 'tween', duration: 0 }}
      >
        <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </motion.div>

      {/* Left content area */}
      <div className="relative z-10 max-w-[45%] min-w-[520px] pl-[8vw] pt-[18vh] pb-[18vh]">
        <div className="mb-8">
          {headlineLines.map((line, i) => (
            <motion.h1
              key={line}
              initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
              animate={{ opacity: headlineOpacity, filter: 'blur(0px)', y: 0, scale: headlineScale }}
              transition={{ delay: i * 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-[\'Playfair Display\'] text-[64px] leading-[1.1] tracking-[-0.02em] text-[#FAFAFA]"
            >
              {line}
            </motion.h1>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: Math.max(0, Math.min(1, (progress - 0.6) * 5 + 1)), y: 0 }}
          transition={{ delay: headlineLines.length * 0.8 + 1.2, duration: 0.7 }}
          className="text-[18px] leading-[1.6] text-[#999999] max-w-[60ch]"
        >
          Psychology-driven design for brands that demand measurable results.
        </motion.p>

        <div className="mt-10">
          <DataTicker />
        </div>

        <div className="mt-14">
          <a
            href="#framework"
            className="inline-flex items-center gap-2 px-9 py-[18px] rounded-[4px] text-[16px] font-medium text-white"
            style={{ backgroundColor: '#2C5F4D', boxShadow: '0 8px 24px rgba(44,95,77,0.3)' }}
          >
            Explore The Framework →
          </a>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
