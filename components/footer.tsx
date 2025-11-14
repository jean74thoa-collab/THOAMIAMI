"use client";

import Link from "next/link";
import { Instagram, Mail, Globe } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-medium mb-4 tracking-wide">ABOUT</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              The House of Arts is a dynamic curatorial platform and digital gallery
              based in Miami, Florida.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium mb-4 tracking-wide">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-black transition-colors">
                  Artists
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium mb-4 tracking-wide">CONTACT</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>100 NW 36th St</li>
              <li>Miami, FL 33127</li>
              <li>
                <a
                  href="mailto:contact@thehouseofarts.com"
                  className="hover:text-black transition-colors"
                >
                  contact@thehouseofarts.com
                </a>
              </li>
              <li>
                <a href="tel:+18336247753" className="hover:text-black transition-colors">
                  +1 (833) 624-7753
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          {/* Top row: Links and Social Icons */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="flex gap-6 text-xs text-gray-600">
              <Link href="/privacy" className="hover:text-black transition-colors tracking-wide">
                PRIVACY POLICY
              </Link>
              <button 
                onClick={() => alert('Cookie preferences will be managed here.')}
                className="hover:text-black transition-colors tracking-wide"
              >
                MANAGE COOKIES
              </button>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 items-center">
              <button
                onClick={() => window.open('https://www.instagram.com/thehouseofarts', '_blank')}
                className="w-6 h-6 border border-gray-400 flex items-center justify-center hover:border-black transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram size={14} className="text-gray-600 hover:text-black" />
              </button>
              <button
                onClick={() => window.open('https://www.artsy.net/partner/the-house-of-arts', '_blank')}
                className="w-6 h-6 border border-gray-400 flex items-center justify-center hover:border-black transition-colors cursor-pointer"
                aria-label="Artsy"
              >
                <span className="text-[10px] font-bold text-gray-600 hover:text-black">A</span>
              </button>
              <a 
                href="mailto:contact@thehouseofarts.com"
                className="w-6 h-6 border border-gray-400 flex items-center justify-center hover:border-black transition-colors"
                aria-label="Email"
              >
                <Mail size={14} className="text-gray-600 hover:text-black" />
              </a>
              <button
                onClick={() => window.open('https://www.thehouseofarts.com', '_blank')}
                className="w-6 h-6 border border-gray-400 flex items-center justify-center hover:border-black transition-colors cursor-pointer"
                aria-label="Website"
              >
                <Globe size={14} className="text-gray-600 hover:text-black" />
              </button>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-xs text-gray-600 tracking-wide">
            COPYRIGHT &copy; 2023 THE HOUSE OF ARTS By 3J
          </div>
        </div>
      </div>
    </footer>
  );
}
