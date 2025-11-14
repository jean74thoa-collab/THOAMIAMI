
'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Palette, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ArtworkFilters from './artwork-filters'

interface Artwork {
  id: string
  title: string
  slug: string
  imageUrl: string
  price: number | null
  available: boolean
  featured: boolean
  year: number | null
  medium: string | null
  dimensions: string | null
  createdAt: Date
  artist: {
    name: string
    slug: string
  }
}

interface FilteredArtworksProps {
  initialArtworks: Artwork[]
}

export default function FilteredArtworks({ initialArtworks }: FilteredArtworksProps) {
  const [artworks] = useState<Artwork[]>(initialArtworks)
  const [filters, setFilters] = useState<{
    availability?: string
    featured?: boolean
    sortBy?: string
  }>({})

  const filteredArtworks = useMemo(() => {
    let filtered = [...artworks]

    // Apply filters
    if (filters.availability === 'available') {
      filtered = filtered.filter(artwork => artwork.available)
    }

    if (filters.featured) {
      filtered = filtered.filter(artwork => artwork.featured)
    }

    // Apply sorting
    if (filters.sortBy === 'recent') {
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    } else {
      // Default sorting: featured first, then by creation date
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return b.createdAt.getTime() - a.createdAt.getTime()
      })
    }

    return filtered
  }, [artworks, filters])

  return (
    <div>
      <ArtworkFilters onFilterChange={setFilters} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredArtworks?.map((artwork) => (
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
                  <div className="absolute top-3 left-3 flex gap-2">
                    {artwork.featured && (
                      <Badge variant="default">Featured</Badge>
                    )}
                    {!artwork.available && (
                      <Badge variant="destructive">Sold</Badge>
                    )}
                  </div>
                  {artwork.price && (
                    <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm rounded-md px-3 py-2">
                      <div className="flex items-center font-medium">
                        <DollarSign className="h-4 w-4 mr-1" />
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
                      {artwork.year && (
                        <p className="text-xs text-muted-foreground mt-1">{artwork.year}</p>
                      )}
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                  {artwork.medium && (
                    <p className="text-sm text-primary mb-1">{artwork.medium}</p>
                  )}
                  {artwork.dimensions && (
                    <p className="text-xs text-muted-foreground">{artwork.dimensions}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredArtworks?.length === 0 && (
        <div className="text-center py-12 mt-8">
          <Palette className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Artworks Found</h3>
          <p className="text-muted-foreground">No artworks match the selected criteria.</p>
        </div>
      )}
    </div>
  )
}
