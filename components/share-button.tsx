
'use client'

import { useState } from 'react'
import { Share, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareButtonProps {
  title?: string
  text?: string
  url?: string
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: title || document.title,
      text: text || '',
      url: url || window.location.href,
    }

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareData.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      // Fallback to clipboard if sharing fails
      try {
        await navigator.clipboard.writeText(shareData.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (clipboardError) {
        console.error('Failed to copy to clipboard:', clipboardError)
      }
    }
  }

  return (
    <Button variant="outline" onClick={handleShare}>
      {copied ? (
        <Check className="h-4 w-4 mr-2 text-green-500" />
      ) : (
        <Share className="h-4 w-4 mr-2" />
      )}
      {copied ? 'Copied!' : 'Share'}
    </Button>
  )
}
