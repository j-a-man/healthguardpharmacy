"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const carouselImages = [
  {
    url: "/image1.jpg",
    alt: "Modern pharmacy interior with clean white shelves",
  },
  {
    url: "/image2.jpg",
    alt: "Professional pharmacy service counter",
  },
  {
    url: "/image3.jpg",
    alt: "Private pharmacy consultation area",
  },
  {
    url: "/image4.jpeg",
    alt: "Modern pharmacy exterior storefront",
  },
]

export default function PharmacyPage() {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length)
  }

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Page Header */}
      <section className="py-24 px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
            The Pharmacy
          </h1>
          <p className="text-lg text-muted-foreground tracking-[0.05em] leading-relaxed max-w-2xl mx-auto">
            The Best Place for You to Get Your Medicine
          </p>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative aspect-[16/9] bg-muted overflow-hidden">
            <img
              src={carouselImages[currentImage].url || "/placeholder.svg"}
              alt={carouselImages[currentImage].alt}
              className="w-full h-full object-cover"
            />

            {/* Carousel Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-6">
              <Button
                variant="outline"
                size="icon"
                onClick={previousImage}
                className="bg-background/90 backdrop-blur-sm hover:bg-background border-border"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextImage}
                className="bg-background/90 backdrop-blur-sm hover:bg-background border-border"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 transition-all ${index === currentImage ? "bg-primary w-8" : "bg-background/50"}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs tracking-[0.25em] text-muted-foreground mb-4">LOCATION</h2>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Visit Us
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Map Placeholder */}
            <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2547769293037!2d-73.87585492389205!3d40.756420771387035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25fbc4eb1434f%3A0xa7b590b2ca75cd09!2sHealth%20Guard%20Pharmacy!5e0!3m2!1sen!2sus!4v1762381359627!5m2!1sen!2sus" 
                className="w-full h-full"
                width="600" 
                height="450" 
                style= {{ border:0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            
            {/* Address Information */}
            <div className="space-y-8 pt-8">
              <div className="space-y-4">
                <h4 className="text-xs tracking-[0.2em] text-muted-foreground">ADDRESS</h4>
                <p className="text-lg text-foreground leading-relaxed">
                  33-13 Junction Blvd
                  <br />
                  Jackson Heights, NY 11372
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs tracking-[0.2em] text-muted-foreground">DELIVERY AREA</h4>
                <p className="text-lg text-foreground leading-relaxed">All 5 Boroughs of New York City</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs tracking-[0.2em] text-muted-foreground">CONTACT</h4>
                <p className="text-lg text-foreground leading-relaxed">
                  (718) 507-6800
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
