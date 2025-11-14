
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const available = searchParams.get('available') === 'true'
    const limit = parseInt(searchParams.get('limit') || '12')
    const artistSlug = searchParams.get('artist')

    const where: any = {}
    if (featured) where.featured = true
    if (available) where.available = true
    if (artistSlug) {
      where.artist = { slug: artistSlug }
    }

    const artworks = await prisma.artwork.findMany({
      where,
      take: limit,
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

    // Convert BigInt to string for JSON serialization
    const serializedArtworks = artworks.map((artwork: any) => ({
      ...artwork,
      price: artwork.price ? Number(artwork.price) : null
    }))

    return NextResponse.json({ artworks: serializedArtworks })
  } catch (error) {
    console.error('Error fetching artworks:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
