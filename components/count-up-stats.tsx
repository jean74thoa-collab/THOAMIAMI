
'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface Stats {
  artists: number
  artworks: number
  exhibitions: number
}

export default function CountUpStats() {
  const [stats, setStats] = useState<Stats>({ artists: 0, artworks: 0, exhibitions: 0 })
  const [displayStats, setDisplayStats] = useState<Stats>({ artists: 0, artworks: 0, exhibitions: 0 })
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()
        setStats(data || { artists: 13, artworks: 50, exhibitions: 8 })
      } catch (error) {
        console.error('Error fetching stats:', error)
        // Fallback stats
        setStats({ artists: 13, artworks: 50, exhibitions: 8 })
      }
    }

    fetchStats()
  }, [])

  useEffect(() => {
    if (inView && stats.artists > 0) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const interval = duration / steps

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setDisplayStats({
          artists: Math.floor(stats.artists * progress),
          artworks: Math.floor(stats.artworks * progress),
          exhibitions: Math.floor(stats.exhibitions * progress),
        })

        if (currentStep >= steps) {
          setDisplayStats(stats)
          clearInterval(timer)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [inView, stats])

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div className="animate-count-up">
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
          {displayStats.artists}+
        </div>
        <div className="text-lg font-medium text-muted-foreground">Artists Represented</div>
      </div>
      <div className="animate-count-up" style={{ animationDelay: '0.2s' }}>
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
          {displayStats.artworks}+
        </div>
        <div className="text-lg font-medium text-muted-foreground">Artworks in Collection</div>
      </div>
      <div className="animate-count-up" style={{ animationDelay: '0.4s' }}>
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
          {displayStats.exhibitions}+
        </div>
        <div className="text-lg font-medium text-muted-foreground">Exhibitions Hosted</div>
      </div>
    </div>
  )
}
