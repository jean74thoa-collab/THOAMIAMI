
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Artwork {
  id: string
  title: string
  slug: string
  imageUrl: string
  price: number | null
  available: boolean
  artist: {
    name: string
    slug: string
  }
}

export default function FeaturedArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch('/api/artworks?featured=true&limit=6')
        const data = await response.json()
        setArtworks(data?.artworks || [])
      } catch (error) {
        console.error('Error fetching artworks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArtworks()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-0">
              <div className="aspect-square bg-muted rounded-t-lg" />
              <div className="p-6">
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks?.map((artwork) => (
        <Link key={artwork.id} href={`/artworks/${artwork.slug}`}>
          <Card className="group hover-lift h-full">
            <CardContent className="p-0">
              <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!artwork.available && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="destructive">Sold</Badge>
                  </div>
                )}
                {artwork.price && (
                  <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm rounded-md px-2 py-1">
                    <div className="flex items-center text-sm font-medium">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {artwork.price?.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors mb-1">
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      by {artwork.artist?.name}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
