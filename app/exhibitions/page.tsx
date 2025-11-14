
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getExhibitions() {
  try {
    const exhibitions = await prisma.exhibition.findMany({
      orderBy: [
        { featured: 'desc' },
        { startDate: 'desc' }
      ],
      include: {
        artists: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })
    return exhibitions
  } catch (error) {
    console.error('Error fetching exhibitions:', error)
    return []
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

export default async function ExhibitionsPage() {
  const exhibitions = await getExhibitions()

  const currentExhibitions = exhibitions.filter(e => 
    isExhibitionActive(new Date(e.startDate), new Date(e.endDate))
  )
  
  const upcomingExhibitions = exhibitions.filter(e => 
    isExhibitionUpcoming(new Date(e.startDate))
  )
  
  const pastExhibitions = exhibitions.filter(e => 
    !isExhibitionActive(new Date(e.startDate), new Date(e.endDate)) && 
    !isExhibitionUpcoming(new Date(e.startDate))
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Exhibitions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our curated exhibitions showcasing contemporary art, street art, 
              and innovative digital installations from our represented artists.
            </p>
          </div>
        </div>
      </section>

      {/* Current Exhibitions */}
      {currentExhibitions.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Current <span className="text-primary">Exhibitions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentExhibitions.map((exhibition: any) => (
                <ExhibitionCard 
                  key={exhibition.id} 
                  exhibition={exhibition} 
                  status="current" 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Exhibitions */}
      {upcomingExhibitions.length > 0 && (
        <section className="py-16 bg-card/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Upcoming <span className="text-primary">Exhibitions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingExhibitions.map((exhibition: any) => (
                <ExhibitionCard 
                  key={exhibition.id} 
                  exhibition={exhibition} 
                  status="upcoming" 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Exhibitions */}
      {pastExhibitions.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Past <span className="text-primary">Exhibitions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastExhibitions.map((exhibition: any) => (
                <ExhibitionCard 
                  key={exhibition.id} 
                  exhibition={exhibition} 
                  status="past" 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {exhibitions.length === 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Exhibitions Found</h3>
            <p className="text-muted-foreground">We're working on exciting new exhibitions. Check back soon!</p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

function ExhibitionCard({ exhibition, status }: { 
  exhibition: any, 
  status: 'current' | 'upcoming' | 'past' 
}) {
  const getStatusBadge = () => {
    switch (status) {
      case 'current':
        return <Badge className="bg-green-500">Current</Badge>
      case 'upcoming':
        return <Badge className="bg-blue-500">Upcoming</Badge>
      case 'past':
        return <Badge variant="secondary">Past</Badge>
    }
  }

  return (
    <Link href={`/exhibitions/${exhibition.slug}`}>
      <Card className="group hover-lift h-full">
        <CardContent className="p-0">
          {exhibition.imageUrl && (
            <div className="aspect-video relative overflow-hidden rounded-t-lg bg-muted">
              <Image
                src={exhibition.imageUrl}
                alt={exhibition.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                {exhibition.featured && <Badge variant="default">Featured</Badge>}
                {getStatusBadge()}
              </div>
            </div>
          )}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {exhibition.title}
              </h3>
              <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(exhibition.startDate).toLocaleDateString()} - {new Date(exhibition.endDate).toLocaleDateString()}
              </div>
              {exhibition.location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {exhibition.location}
                </div>
              )}
            </div>

            {exhibition.description && (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {exhibition.description}
              </p>
            )}

            {exhibition.artists?.length > 0 && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Users className="h-3 w-3 mr-1" />
                <span>{exhibition.artists.length} artists featured</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
