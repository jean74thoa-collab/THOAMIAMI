
import artistsData from './artists-data.json';
import { Artist, Artwork, ArtistsData } from './types';

const data: ArtistsData = artistsData as ArtistsData;

export function getAllArtists(): Artist[] {
  return data.artists;
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return data.artists.find(artist => artist.slug === slug);
}

export function getAllArtworks(): Artwork[] {
  return data.artists.flatMap(artist => 
    artist.artworks.map(artwork => ({
      ...artwork,
      artistName: artist.name,
      artistSlug: artist.slug
    }))
  );
}

export function getArtistArtworks(slug: string): Artwork[] {
  const artist = getArtistBySlug(slug);
  return artist ? artist.artworks : [];
}

export function getTotalArtists(): number {
  return data.artists.length;
}

export function getTotalArtworks(): number {
  return data.artists.reduce((total, artist) => total + artist.artworks.length, 0);
}
