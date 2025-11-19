"use client"

import Link from "next/link"
import { MapPin, Phone, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  {
    url: "/image1.jpg",
    alt: "Modern pharmacy interior with clean white shelves",
    // Takes up the left half (2 columns wide, 2 rows tall)
    className: "md:col-span-2 md:row-span-2", 
  },
  {
    url: "/image2.jpg",
    alt: "Professional pharmacy service counter",
    // Takes up the top right (2 columns wide, 1 row tall)
    className: "md:col-span-2 md:row-span-1", 
  },
  {
    url: "/image3.jpg",
    alt: "Private pharmacy consultation area",
    // Bottom right, left side (1 column wide, 1 row tall)
    className: "md:col-span-1 md:row-span-1", 
  },
  {
    url: "/team_new.jpeg",
    alt: "Our dedicated pharmacy team",
    // Bottom right, right side (1 column wide, 1 row tall)
    className: "md:col-span-1 md:row-span-1", 
  },
]

export default function PharmacyPage() {
  return (
    <main className="min-h-screen pt-20 bg-background">
      {/* Page Header */}
      <section className="py-24 px-6 lg:px-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-light tracking-tight text-foreground">
            The Pharmacy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground tracking-wide leading-relaxed max-w-2xl mx-auto">
            The Best Place for You to Get Your Medicine
          </p>
        </div>
      </section>

      {/* Aesthetic Image Grid (Bento Box Style - 4 Images) */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Grid Logic: 
             - Mobile: 1 column, auto rows
             - Desktop: 4 columns, 2 rows (fixed height to ensure clean bento look)
          */}
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-[120vh] md:h-[600px]">
            {images.map((img, index) => (
              <div 
                key={index} 
                className={`relative group overflow-hidden rounded-2xl border border-border/50 shadow-sm ${img.className}`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/1600x900/f1f5f9/64748b?text=Pharmacy+View'; }}
                />
                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
            ))}
          </div>
          
          {/* Caption/Context */}
          <div className="mt-6 flex justify-between items-end border-t border-border pt-6">
            <p className="text-xs tracking-[0.2em] text-muted-foreground">ESTABLISHED 2010</p>
            <p className="text-xs tracking-[0.2em] text-muted-foreground text-right">QUEENS & BROOKLYN</p>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-24 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Our Locations</h2>
            <h3 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-light text-foreground">
              Visit Us Today
            </h3>
            <Button variant="outline" className="rounded-full border-primary/20 hover:border-primary/50" asChild>
                 <Link href="https://atlanticpharmacy.vercel.app" target="_blank">
                    View Atlantic Pharmacy Website
                 </Link>
            </Button>
          </div>

          {/* Location Cards Grid */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* --- LOCATION 1: Jackson Heights --- */}
            <div className="group bg-background border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              {/* Map Container */}
              <div className="h-[350px] w-full bg-muted relative overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2547769293037!2d-73.87585492389205!3d40.756420771387035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25fbc4eb1434f%3A0xa7b590b2ca75cd09!2sHealth%20Guard%20Pharmacy!5e0!3m2!1sen!2sus!4v1762381359627!5m2!1sen!2sus" 
                  className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  style={{ border: 0 }} 
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              {/* Details */}
              <div className="p-8 md:p-10 space-y-8">
                <div className="space-y-2">
                    <h4 className="font-[family-name:var(--font-playfair)] text-3xl text-foreground">
                    Jackson Heights
                    </h4>
                    <p className="text-sm text-muted-foreground tracking-wide">HEALTH GUARD PHARMACY</p>
                </div>

                <div className="space-y-6 border-t border-border pt-6">
                   <div className="flex gap-4">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                        <div className="text-foreground leading-relaxed">
                            <p>33-13 Junction Blvd</p>
                            <p>Jackson Heights, NY 11372</p>
                        </div>
                   </div>
                   
                   <div className="flex gap-4">
                        <Phone className="h-5 w-5 text-primary shrink-0 mt-1" />
                        <p className="text-foreground">(718) 507-6800</p>
                   </div>

                   <div className="flex gap-4">
                        <Navigation className="h-5 w-5 text-primary shrink-0 mt-1" />
                        <p className="text-muted-foreground text-sm">Delivery available to all 5 Boroughs</p>
                   </div>
                </div>
              </div>
            </div>

            {/* --- LOCATION 2: Brooklyn --- */}
            <div className="group bg-background border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              {/* Map Container */}
              <div className="h-[350px] w-full bg-muted relative overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1284.4999059684803!2d-73.93425417170268!3d40.6773175639877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25c78449142e1%3A0x2527109bbda974e9!2s1706B%20Atlantic%20Ave%2C%20Brooklyn%2C%20NY%20112131206!5e0!3m2!1sen!2sus!4v1762480566933!5m2!1sen!2sus"
                  className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  style={{ border: 0 }} 
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              {/* Details */}
              <div className="p-8 md:p-10 space-y-8">
                <div className="space-y-2">
                    <h4 className="font-[family-name:var(--font-playfair)] text-3xl text-foreground">
                    Brooklyn
                    </h4>
                    <p className="text-sm text-muted-foreground tracking-wide">ATLANTIC PHARMACY</p>
                </div>

                <div className="space-y-6 border-t border-border pt-6">
                   <div className="flex gap-4">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                        <div className="text-foreground leading-relaxed">
                            <p>1706B Atlantic Ave</p>
                            <p>Brooklyn, NY 11213</p>
                        </div>
                   </div>
                   
                   <div className="flex gap-4">
                        <Phone className="h-5 w-5 text-primary shrink-0 mt-1" />
                        <p className="text-foreground">(718) 484-2260</p>
                   </div>

                   <div className="flex gap-4">
                        <Navigation className="h-5 w-5 text-primary shrink-0 mt-1" />
                        <p className="text-muted-foreground text-sm">Delivery available to all 5 Boroughs</p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}