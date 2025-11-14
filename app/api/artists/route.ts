
import { NextResponse } from 'next/server';
import { getAllArtists } from '@/lib/artists';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '100');
    const category = searchParams.get('category');

    const allArtists = getAllArtists();
    
    // Transform to match expected API format
    let artists = allArtists.map((artist: any) => ({
      id: artist.slug,
      name: artist.name,
      slug: artist.slug,
      bio: artist.biography,
      image: artist.photo_url,
      featured: true, // All artists are featured
      category: 'Contemporary Art',
      artworks: artist.artworks.slice(0, 1).map((artwork: any) => ({
        id: artwork.title,
        title: artwork.title,
        image: artwork.image_url,
        price: artwork.price,
        available: artwork.available,
        featured: true
      })),
      _count: {
        artworks: artist.artworks.length
      }
    }));

    // Apply filters
    if (category) {
      // No category filtering since all are "Contemporary Art"
    }

    // Apply limit
    artists = artists.slice(0, limit);

    return NextResponse.json({ artists });
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
