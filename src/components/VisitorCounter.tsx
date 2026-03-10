import { useEffect, useRef, useState } from 'react'
import { Eye } from 'lucide-react'

interface VisitorCounterProps {
  namespace?: string
  key?: string
}

const VisitorCounter = ({
  namespace = 'about-me-page-v2',
  key: counterKey = 'visitors',
}: VisitorCounterProps) => {
  const [count, setCount] = useState<number | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchCount = async () => {
      try {
        // Using countapi.xyz hit endpoint to increment + get count
        const res = await fetch(
          `https://api.countapi.xyz/hit/${namespace}/${counterKey}`
        )
        if (res.ok) {
          const data = await res.json()
          setCount(data.value)
        } else {
          setCount(60) // fallback
        }
      } catch {
        setCount(60) // fallback if API is unavailable
      }
    }
    fetchCount()
  }, [namespace, counterKey])

  return (
    <div className="flex items-center gap-1.5 text-white/40 text-xs select-none">
      <Eye size={13} className="text-white/30" />
      <span>{count !== null ? count : '—'}</span>
    </div>
  )
}

export default VisitorCounter
