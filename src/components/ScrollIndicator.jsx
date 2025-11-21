import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHide(true), 3000)
    const onScroll = () => setHide(true)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (hide) return null

  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center gap-3 select-none">
      <span className="text-xs" style={{ color: '#2C5F4D' }}>Scroll to see psychology in action</span>
      <div className="relative h-[60px] w-px" style={{ backgroundColor: '#2C5F4D' }}>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: '#2C5F4D' }}>
          <div className="animate-ping absolute inset-0 rounded-full" style={{ backgroundColor: '#2C5F4D' }} />
        </div>
      </div>
    </div>
  )
}
