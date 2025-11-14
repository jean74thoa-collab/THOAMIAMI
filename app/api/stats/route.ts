
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const [artistCount, artworkCount, exhibitionCount] = await Promise.all([
      prisma.artist.count(),
      prisma.artwork.count(),
      prisma.exhibition.count()
    ])

    return NextResponse.json({
      artists: artistCount,
      artworks: artworkCount,
      exhibitions: exhibitionCount
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
