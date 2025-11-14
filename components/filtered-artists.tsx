
'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ArtistFilters from './artist-filters'

interface Artist {
  id: string
  name: string
  slug: string
  bio: string | null
  profileImage: string | null
  category: string | null
  featured: boolean
  _count?: { artworks: number }
}

interface FilteredArtistsProps {
  initialArtists: Artist[]
  categories: string[]
}

export default function FilteredArtists({ initialArtists, categories }: FilteredArtistsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [artists] = useState<Artist[]>(initialArtists)

  const filteredArtists = useMemo(() => {
    if (!selectedCategory) return artists
    return artists.filter(artist => artist.category === selectedCategory)
  }, [artists, selectedCategory])

  return (
    <div>
      <ArtistFilters 
        categories={categories}
        onFilterChange={setSelectedCategory}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredArtists?.map((artist) => (
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
                  {artist.featured && (
                    <div className="absolute top-3 left-3">
                      <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md font-medium">
                        Featured
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                      {artist.name}
                    </h3>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                  {artist.category && (
                    <p className="text-sm text-primary mb-2 font-medium">{artist.category}</p>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                    {artist.bio}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{artist._count?.artworks || 0} artworks</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredArtists?.length === 0 && (
        <div className="text-center py-12 mt-8">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Artists Found</h3>
          <p className="text-muted-foreground">No artists found in the selected category.</p>
        </div>
      )}
    </div>
  )
}
