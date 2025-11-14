
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Artist {
  id: string
  name: string
  slug: string
  bio: string
  profileImage: string | null
  category: string | null
}

export default function FeaturedArtists() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('/api/artists?featured=true&limit=6')
        const data = await response.json()
        setArtists(data?.artists || [])
      } catch (error) {
        console.error('Error fetching artists:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()
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
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artists?.map((artist) => (
        <Link key={artist.id} href={`/artists/${artist.slug}`}>
          <Card className="group hover-lift h-full">
            <CardContent className="p-0">
              <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted">
                {artist.profileImage && (
                  <Image
                    src={artist.profileImage}
                    alt={artist.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {artist.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                {artist.category && (
                  <p className="text-sm text-primary mb-2">{artist.category}</p>
                )}
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {artist.bio}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
