
// Data types for The House of Arts

export interface Artwork {
  title: string;
  price: string;
  image_url: string;
  available: boolean;
  dimensions?: string;
}

export interface Artist {
  name: string;
  slug: string;
  biography: string;
  photo_url: string;
  deck_url?: string;
  artworks: Artwork[];
}

export interface ArtistsData {
  artists: Artist[];
}
