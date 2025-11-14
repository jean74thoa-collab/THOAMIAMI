"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactPage() {
  const [receiveNewsletter, setReceiveNewsletter] = useState<string>("");
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-2xl tracking-wide mb-12">CONTACT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery Image */}
        <div className="relative aspect-[4/3] bg-gray-100">
          <Image
            src="/images/gallery-contact.jpg"
            alt="The House of Arts Gallery"
            fill
            className="object-cover"
          />
        </div>

        {/* Contact Info & Form */}
        <div>
          {/* Contact Information */}
          <div className="mb-12">
            <h2 className="text-sm font-medium tracking-wide mb-6">THE HOUSE OF ARTS</h2>
            
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium mb-1">location.</p>
                <p className="text-gray-700">100 NW 36th St, Miami FL, 33127</p>
              </div>

              <div>
                <p className="font-medium mb-1">email.</p>
                <a
                  href="mailto:contact@thehouseofarts.com"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  contact@thehouseofarts.com
                </a>
              </div>

              <div>
                <p className="font-medium mb-1">phone.</p>
                <a
                  href="tel:+18336247753"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  +1 (833) 624-7753
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium tracking-wide mb-4">GALLERY HOURS</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Monday - Friday: 10 - 6 PM</p>
                <p>Saturday: 12 - 6 PM</p>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div>
            <h3 className="text-sm font-medium tracking-wide mb-6">INQUIRY FORM</h3>
            <form className="space-y-4">
              <div>
                <label className="text-sm mb-2 block">Name *</label>
                <Input type="text" required />
              </div>

              <div>
                <label className="text-sm mb-2 block">Email *</label>
                <Input type="email" required />
              </div>

              <div>
                <label className="text-sm mb-2 block">Phone</label>
                <Input type="tel" />
              </div>

              <div>
                <label className="text-sm mb-2 block">Message</label>
                <Textarea rows={6} />
              </div>

              <div>
                <label className="text-sm mb-2 block">Receive newsletters? *</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="newsletter"
                      value="yes"
                      checked={receiveNewsletter === "yes"}
                      onChange={(e) => setReceiveNewsletter(e.target.value)}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="newsletter"
                      value="no"
                      checked={receiveNewsletter === "no"}
                      onChange={(e) => setReceiveNewsletter(e.target.value)}
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={acceptPrivacy}
                    onChange={(e) => setAcceptPrivacy(e.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    I agree to the{" "}
                    <a href="/privacy" className="underline hover:text-red-600">
                      Privacy Policy
                    </a>{" "}
                    *
                  </span>
                </label>
              </div>

              <Button type="submit" variant="outline" className="w-full">
                SEND INQUIRY
              </Button>

              <p className="text-xs text-gray-500 mt-4">* denotes required fields</p>
              <p className="text-xs text-gray-500">
                In order to respond to your enquiry, we will process the personal data you have
                supplied to communicate with you in accordance with our Privacy Policy. You can
                unsubscribe or change your preferences at any time by clicking the link in our emails.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
