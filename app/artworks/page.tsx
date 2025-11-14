
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Palette, Filter, DollarSign } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FilteredArtworks from '@/components/filtered-artworks'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getArtworks() {
  try {
    const artworks = await prisma.artwork.findMany({
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ],
      include: {
        artist: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })
    return artworks.map((artwork: any) => ({
      ...artwork,
      price: artwork.price ? Number(artwork.price) : null
    }))
  } catch (error) {
    console.error('Error fetching artworks:', error)
    return []
  }
}

export default async function ArtworksPage() {
  const artworks = await getArtworks()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Palette className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-primary">Collection</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore exceptional pieces from our diverse collection of contemporary art, 
              street art, and digital installations by emerging and established artists.
            </p>
          </div>

        </div>
      </section>

      {/* Artworks Grid with Filters */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilteredArtworks initialArtworks={artworks} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
