"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getAllArtists } from "@/lib/artists";

export default function ArtistsPage() {
  const [viewMode, setViewMode] = useState<"thumbnails" | "list">("thumbnails");
  const artistsData = getAllArtists();
  
  // Transform to match expected format
  const artists = artistsData.map((artist, index) => ({
    id: index + 1,
    name: artist.name.toUpperCase(),
    slug: artist.slug,
    image: artist.photo_url
  }));

  return (
    <main className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <h1 className="text-2xl tracking-wide">ARTISTS</h1>
        <div className="flex flex-col items-end">
          <p className="text-xs tracking-wide mb-2">THE HOUSE OF ARTS</p>
          <div className="flex gap-4 text-sm">
            <button
              onClick={() => setViewMode("list")}
              className={`tracking-wide ${
                viewMode === "list" ? "text-red-600 font-medium" : "text-gray-500 hover:text-black"
              }`}
            >
              LIST
            </button>
            <button
              onClick={() => setViewMode("thumbnails")}
              className={`tracking-wide ${
                viewMode === "thumbnails" ? "text-red-600 font-medium" : "text-gray-500 hover:text-black"
              }`}
            >
              THUMBNAILS
            </button>
          </div>
        </div>
      </div>

      {/* Info Text */}
      <p className="text-sm text-gray-600 mb-8">
        In order to see more detail about a specific artist you are interested in please click on their thumbnail.
      </p>

      <h2 className="text-sm tracking-[0.2em] mb-8">GALLERY ARTISTS</h2>

      {/* Artists Grid/List */}
      {viewMode === "thumbnails" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {artists.map((artist: any) => (
            <Link key={artist.id} href={`/artists/${artist.slug}`} className="group">
              <div className="relative aspect-square bg-gray-100 mb-3">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                  unoptimized
                />
              </div>
              <p className="text-sm text-center tracking-wide">{artist.name}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {artists.map((artist: any) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.slug}`}
              className="flex items-center gap-6 group hover:bg-gray-50 p-4 transition-colors"
            >
              <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="text-base tracking-wide group-hover:text-red-600 transition-colors">
                  {artist.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
