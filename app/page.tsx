"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const artworks = [
  { id: 1, src: "/images/artwork-1.jpg", alt: "Artwork 1" },
  { id: 2, src: "/images/artwork-2.jpg", alt: "Artwork 2" },
  { id: 3, src: "/images/artwork-3.jpg", alt: "Artwork 3" },
  { id: 4, src: "/images/artwork-4.jpg", alt: "Artwork 4" },
  { id: 5, src: "/images/artwork-5.jpg", alt: "Artwork 5" },
  { id: 6, src: "/images/artwork-6.jpg", alt: "Artwork 6" },
  { id: 7, src: "/images/artwork-7.jpg", alt: "Artwork 7" },
  { id: 8, src: "/images/artwork-8.jpg", alt: "Artwork 8" },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    // Show newsletter popup after 3 seconds
    const timer = setTimeout(() => {
      setShowNewsletter(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= artworks.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, artworks.length - 3) : prev - 1));
  };

  const visibleArtworks = artworks.slice(currentIndex, currentIndex + 3);

  return (
    <main>
      {/* Hero Section with Parallax */}
      <section className="relative w-full h-screen">
        <div className="fixed top-0 left-0 w-full h-screen -z-10">
          <Image
            src="/images/hero.jpg"
            alt="The House of Arts Gallery"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* About Section - Overlaying white background */}
      <section className="relative bg-white">
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-sm font-light tracking-[0.3em] mb-8 leading-relaxed">
                ART | FASHION | TECHNOLOGY | EXHIBITIONS | EVENTS | SPECIAL PROJECTS | MEDIA AND LIFESTYLE
              </h1>
              <p className="text-sm leading-relaxed text-gray-800 mb-6">
                Since its founding, The House of Arts has grown into a dynamic curatorial platform
                and digital gallery, dedicated to championing the work of contemporary artists and
                fostering meaningful cultural exchange.
              </p>
              <p className="text-sm leading-relaxed text-gray-800 mb-6">
                We support our artists through digital representation, strategic career development,
                enhanced visibility, and direct engagement with collectors, leading to the placement
                of their works in prestigious private and public collections.
              </p>
              <p className="text-sm leading-relaxed text-gray-800 mb-8">
                Operating with a global network, we collaborate with collectors, interior designers,
                developers, and institutions to curate art experiences for residential and commercial
                spaces worldwide.
              </p>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  className="text-xs tracking-[0.15em] px-8 py-2 border-black hover:bg-black hover:text-white transition-colors"
                >
                  CONTACT US
                </Button>
              </Link>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/images/about-colorful-art.jpg"
                alt="Contemporary Art Installation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Artwork Carousel Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="relative">
            {/* Carousel Images - 3 side by side */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleArtworks.map((artwork, idx) => (
                <div 
                  key={artwork.id} 
                  className={`relative aspect-[3/4] bg-gray-100 ${
                    idx === 0 ? 'ring-4 ring-yellow-400' : ''
                  }`}
                >
                  <Image
                    src={artwork.src}
                    alt={artwork.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Fixed Caption */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-700">
                Matias Mesquita, <span className="italic">As costureiras</span>, 2022
              </p>
            </div>

            {/* Carousel Navigation - Arrows on sides */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white border border-gray-300 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white border border-gray-300 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          {/* Video Title */}
          <h2 className="text-xs tracking-[0.2em] mb-1 text-center font-light">
            THE HOUSE/ GALLERY INSIDE DRONE
          </h2>
          
          {/* Video Player */}
          <div className="relative aspect-video max-w-4xl mx-auto mb-4">
            <iframe
              src="https://www.youtube.com/embed/aR4BS9m0t3w?si=65gOXCHmqj0mb0tF"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Video Caption */}
          <p className="text-sm tracking-wide text-center text-gray-700">
            GALLERY DRONE VIEW
          </p>
        </div>
      </section>

      {/* Newsletter Popup */}
      {showNewsletter && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowNewsletter(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
              aria-label="Close"
            >
              ×
            </button>
            <div className="mb-6">
              <div className="flex flex-col leading-none mb-4">
                <span className="text-[8px] font-light tracking-[0.15em]">THE</span>
                <span className="text-2xl font-bold tracking-tight -mt-1">HOUSE</span>
                <span className="text-[8px] font-light tracking-[0.15em] -mt-1">OF ARTS</span>
              </div>
              <h3 className="text-lg font-medium mb-2">THOA NEWSLETTER</h3>
              <p className="text-sm text-gray-600">
                Sign up to receive information on new exhibitions and events at The House of Arts.
              </p>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="First name"
                className="w-full border border-gray-300 px-4 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full border border-gray-300 px-4 py-2 text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 px-4 py-2 text-sm"
              />
              <Button className="w-full">SIGNUP</Button>
              <p className="text-xs text-gray-500">
                Please read our <Link href="/privacy" className="underline">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
