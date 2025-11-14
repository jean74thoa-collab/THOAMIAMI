"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getArtistBySlug } from "@/lib/artists";

export default function ArtistPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [activeTab, setActiveTab] = useState("biography");
  const artist = getArtistBySlug(slug);
  
  const biographyRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const enquireRef = useRef<HTMLDivElement>(null);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for sticky header
      
      const biographyTop = biographyRef.current?.offsetTop || 0;
      const worksTop = worksRef.current?.offsetTop || 0;
      const enquireTop = enquireRef.current?.offsetTop || 0;
      
      if (scrollPosition >= enquireTop) {
        setActiveTab("enquire");
      } else if (scrollPosition >= worksTop) {
        setActiveTab("works");
      } else {
        setActiveTab("biography");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!artist) {
    return <div className="container mx-auto px-6 py-12">Artist not found</div>;
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-6 pt-12 pb-6">
        <h1 className="text-3xl font-light tracking-wide mb-8">{artist.name.toUpperCase()}</h1>
      </div>

      {/* Sticky Tabs */}
      <div className="sticky top-[80px] bg-white z-40 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-6 text-sm">
            <button
              onClick={() => scrollToSection(biographyRef)}
              className={`tracking-[0.15em] transition-colors ${
                activeTab === "biography"
                  ? "text-red-600 font-medium"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              BIOGRAPHY
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => scrollToSection(worksRef)}
              className={`tracking-[0.15em] transition-colors ${
                activeTab === "works"
                  ? "text-red-600 font-medium"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              WORKS
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => scrollToSection(enquireRef)}
              className={`tracking-[0.15em] transition-colors ${
                activeTab === "enquire"
                  ? "text-red-600 font-medium"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              ENQUIRE
            </button>
            <Link href="/artists" className="tracking-[0.15em] text-gray-700 hover:text-black ml-auto">
              &lt; BROWSE ARTISTS &gt;
            </Link>
          </div>
        </div>
      </div>

      {/* Biography Section */}
      <section ref={biographyRef} className="container mx-auto px-6 py-16 scroll-mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-base leading-relaxed text-gray-700 whitespace-pre-wrap">{artist.biography}</p>
            
            {/* Deck Link if available */}
            {artist.deck_url && (
              <div className="mt-6">
                <a 
                  href={artist.deck_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-[0.1em] text-gray-700 hover:text-red-600 underline"
                >
                  {artist.name.toUpperCase()} DECK<br />
                  <span className="text-xs">(PDF, OPENS IN A NEW TAB.)</span>
                </a>
              </div>
            )}
          </div>
          <div className="relative aspect-square bg-gray-100">
            <Image 
              src={artist.photo_url} 
              alt={artist.name} 
              fill 
              className="object-cover"
              unoptimized 
            />
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section ref={worksRef} className="container mx-auto px-6 py-16 scroll-mt-32 bg-gray-50">

        {artist.artworks && artist.artworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {artist.artworks.map((work, index) => (
              <div key={index} className="group">
                <div className="relative aspect-[3/4] bg-gray-100 mb-4">
                  <Image
                    src={work.image_url}
                    alt={work.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <h3 className="text-xs tracking-wide uppercase flex-1">{work.title}</h3>
                    {work.available && <span className="text-green-500 text-lg leading-none">●</span>}
                  </div>
                  {work.price && <p className="text-xs text-gray-600">{work.price}</p>}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs tracking-[0.1em] mt-2"
                    onClick={() => scrollToSection(enquireRef)}
                  >
                    INQUIRE
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No works available at this time.</p>
        )}
      </section>

      {/* Enquire Section */}
      <section ref={enquireRef} className="container mx-auto px-6 py-16 scroll-mt-32">
        <div className="max-w-2xl">
          <h2 className="text-sm tracking-[0.15em] mb-8 font-light">
            SEND ME MORE INFORMATION ON {artist.name.toUpperCase()}
          </h2>
          <form className="space-y-6">
            <div>
              <label className="text-sm mb-2 block">Name *</label>
              <Input type="text" required className="w-full" />
            </div>
            <div>
              <label className="text-sm mb-2 block">Email *</label>
              <Input type="email" required className="w-full" />
            </div>
            <div>
              <label className="text-sm mb-2 block">Phone</label>
              <Input type="tel" className="w-full" />
            </div>
            <div>
              <label className="text-sm mb-2 block">Message</label>
              <Textarea 
                rows={6} 
                placeholder={`Please send me more information on ${artist.name}.`}
                className="w-full"
              />
            </div>
            
            {/* Newsletter Radio */}
            <div>
              <label className="text-sm mb-3 block">Receive newsletters *</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="newsletter" value="yes" className="w-4 h-4" />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="newsletter" value="no" className="w-4 h-4" />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start gap-2">
              <input type="checkbox" required className="w-4 h-4 mt-1" />
              <label className="text-sm">
                I agree to the <Link href="/privacy" className="underline hover:text-red-600">Privacy Policy</Link> *
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full text-xs tracking-[0.15em] bg-black hover:bg-gray-800"
            >
              SEND INQUIRY
            </Button>

            {/* Privacy Text */}
            <p className="text-xs text-gray-600 leading-relaxed pt-4">
              The personal data you have provided will be processed by THE HOUSE OF ARTS for the purpose of sending you 
              our Newsletter. For further information about how we process your personal data, please consult our{" "}
              <Link href="/privacy" className="underline hover:text-red-600">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
