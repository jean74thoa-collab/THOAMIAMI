
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, User, Calendar, Ruler, Palette, DollarSign, Mail, Heart, Share } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ShareButton from '@/components/share-button'
import SaveButton from '@/components/save-button'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getArtwork(slug: string) {
  try {
    const artwork = await prisma.artwork.findUnique({
      where: { slug },
      include: {
        artist: true
      }
    })
    
    if (artwork) {
      return {
        ...artwork,
        price: artwork.price ? Number(artwork.price) : null
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching artwork:', error)
    return null
  }
}

export default async function ArtworkPage({ params }: { params: { slug: string } }) {
  const artwork = await getArtwork(params.slug)

  if (!artwork) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Artwork Details */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/artworks">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Collection
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="space-y-4">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <SaveButton 
                  itemId={artwork.id}
                  itemType="artwork"
                  className="flex-1"
                />
                <ShareButton 
                  title={artwork.title}
                  text={`Check out "${artwork.title}" by ${artwork.artist?.name} at THE HOUSE OF ARTS`}
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{artwork.title}</h1>
                  {artwork.featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>
                
                <Link 
                  href={`/artists/${artwork.artist?.slug}`}
                  className="flex items-center text-lg text-primary hover:underline mb-4"
                >
                  <User className="h-5 w-5 mr-2" />
                  {artwork.artist?.name}
                </Link>

                {artwork.description && (
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {artwork.description}
                  </p>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                {artwork.year && (
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <div>
                      <p className="text-xs uppercase tracking-wide">Year</p>
                      <p className="font-medium">{artwork.year}</p>
                    </div>
                  </div>
                )}

                {artwork.medium && (
                  <div className="flex items-center text-muted-foreground">
                    <Palette className="h-4 w-4 mr-2" />
                    <div>
                      <p className="text-xs uppercase tracking-wide">Medium</p>
                      <p className="font-medium">{artwork.medium}</p>
                    </div>
                  </div>
                )}

                {artwork.dimensions && (
                  <div className="flex items-center text-muted-foreground">
                    <Ruler className="h-4 w-4 mr-2" />
                    <div>
                      <p className="text-xs uppercase tracking-wide">Dimensions</p>
                      <p className="font-medium">{artwork.dimensions}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center text-muted-foreground">
                  <div>
                    <p className="text-xs uppercase tracking-wide">Availability</p>
                    <p className="font-medium">
                      {artwork.available ? (
                        <span className="text-green-500">Available</span>
                      ) : (
                        <span className="text-red-500">Sold</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price */}
              {artwork.price && (
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Price</p>
                      <p className="text-2xl font-bold flex items-center">
                        <DollarSign className="h-6 w-6 mr-1" />
                        {artwork.price?.toLocaleString()}
                      </p>
                    </div>
                    <Button 
                      asChild 
                      size="lg"
                      disabled={!artwork.available}
                    >
                      <Link href={`/contact?subject=Artwork Inquiry: ${artwork.title}&artwork=${artwork.slug}`}>
                        {artwork.available ? 'Inquire' : 'Sold'}
                      </Link>
                    </Button>
                  </div>
                </Card>
              )}

              {/* Contact */}
              <Card className="p-6 bg-card/50">
                <h3 className="font-semibold mb-3">Interested in this artwork?</h3>
                <p className="text-muted-foreground mb-4">
                  Get in touch with us to learn more about this piece, arrange a viewing, 
                  or discuss acquisition details.
                </p>
                <Button asChild>
                  <Link href={`/contact?subject=Artwork Inquiry: ${artwork.title}&artwork=${artwork.slug}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Gallery
                  </Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Bio */}
      {artwork.artist?.bio && (
        <section className="py-16 bg-card/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">
              About <span className="text-primary">{artwork.artist.name}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {artwork.artist.profileImage && (
                <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={artwork.artist.profileImage}
                    alt={artwork.artist.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {artwork.artist.bio}
                </p>
                <Button asChild variant="outline">
                  <Link href={`/artists/${artwork.artist.slug}`}>
                    View All Works by {artwork.artist.name}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
