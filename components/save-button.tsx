
'use client'

import { useState, useEffect } from 'react'
import { Heart, HeartOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SaveButtonProps {
  itemId: string
  itemType: 'artwork' | 'artist' | 'exhibition'
  className?: string
}

export default function SaveButton({ itemId, itemType, className = '' }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`saved_${itemType}_${itemId}`)
    setIsSaved(saved === 'true')
  }, [itemId, itemType])

  const handleToggleSave = async () => {
    setLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const newSavedState = !isSaved
      setIsSaved(newSavedState)
      
      // Save to localStorage (in a real app, this would be a database)
      if (newSavedState) {
        localStorage.setItem(`saved_${itemType}_${itemId}`, 'true')
      } else {
        localStorage.removeItem(`saved_${itemType}_${itemId}`)
      }
    } catch (error) {
      console.error('Error saving item:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleToggleSave}
      disabled={loading}
      className={`${className} ${isSaved ? 'bg-primary/10 border-primary text-primary' : ''}`}
    >
      {loading ? (
        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      ) : isSaved ? (
        <Heart className="h-4 w-4 mr-2 fill-current" />
      ) : (
        <HeartOff className="h-4 w-4 mr-2" />
      )}
      {loading ? 'Saving...' : isSaved ? 'Saved' : 'Save'}
    </Button>
  )
}
