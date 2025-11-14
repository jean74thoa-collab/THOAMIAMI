
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Users, ExternalLink } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getExhibition(slug: string) {
  try {
    const exhibition = await prisma.exhibition.findUnique({
      where: { slug },
      include: {
        artists: {
          select: {
            id: true,
            name: true,
            slug: true,
            profileImage: true,
            category: true
          }
        }
      }
    })
    return exhibition
  } catch (error) {
    console.error('Error fetching exhibition:', error)
    return null
  }
}

function isExhibitionActive(startDate: Date, endDate: Date) {
  const now = new Date()
  return now >= startDate && now <= endDate
}

function isExhibitionUpcoming(startDate: Date) {
  const now = new Date()
  return startDate > now
}

export default async function ExhibitionPage({ params }: { params: { slug: string } }) {
  const exhibition = await getExhibition(params.slug)

  if (!exhibition) {
    notFound()
  }

  const startDate = new Date(exhibition.startDate)
  const endDate = new Date(exhibition.endDate)
  const isActive = isExhibitionActive(startDate, endDate)
  const isUpcoming = isExhibitionUpcoming(startDate)

  const getStatusBadge = () => {
    if (isActive) return <Badge className="bg-green-500">Current</Badge>
    if (isUpcoming) return <Badge className="bg-blue-500">Upcoming</Badge>
    return <Badge variant="secondary">Past</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Exhibition Header */}
      <section className="py-12 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/exhibitions">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Exhibitions
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div>
              {exhibition.imageUrl && (
                <div className="aspect-video relative rounded-lg overflow-hidden bg-muted mb-6">
                  <Image
                    src={exhibition.imageUrl}
                    alt={exhibition.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    {getStatusBadge()}
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{exhibition.title}</h1>
                  {exhibition.featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>
                
                {exhibition.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {exhibition.description}
                  </p>
                )}
              </div>

              {/* Exhibition Info */}
              <div className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Exhibition Dates</p>
                    <p className="text-sm">
                      {startDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} - {endDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                {exhibition.location && (
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-3" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm">{exhibition.location}</p>
                    </div>
                  </div>
                )}

                {exhibition.artists?.length > 0 && (
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-5 w-5 mr-3" />
                    <div>
                      <p className="font-medium">Featured Artists</p>
                      <p className="text-sm">{exhibition.artists.length} artists participating</p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Button asChild size="lg">
                  <Link href="/contact?subject=Exhibition Inquiry">
                    Get More Information
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      {exhibition.artists?.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Featured <span className="text-primary">Artists</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exhibition.artists.map((artist: any) => (
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
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {artist.name}
                          </h3>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                        {artist.category && (
                          <p className="text-sm text-primary">{artist.category}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visit Gallery CTA */}
      <section className="py-16 bg-card/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Visit THE HOUSE OF ARTS
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience this exhibition and more at our gallery in Miami's vibrant Wynwood Arts District.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Plan Your Visit
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/exhibitions">
                More Exhibitions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
