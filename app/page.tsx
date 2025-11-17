import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Clock, Globe, Star } from "lucide-react"

export default function HomePage() {

  const testimonials = [
    {
      quote:
        "They are awesome! Great service and fast! I’m never in there more than 5 minutes. Way better than CVS pharmacy and always have the meds I need. Staff is so polite and helpful. They deserve 10 stars!! ⭐️",
      name: "Josie Rodríguez",
      location: "Queens, NY",
      rating: 5,
    },
    {
      quote:
        "Excellent and fast service. Accepted my out-of-state insurance. I found them online through my insurance's portal and stopped by to get at-home rapid tests. The pharmacist was super kind and I was in-and-out within 5 minutes!",
      name: "D. Johnson",
      location: "Queens, NY",
      rating: 5,
    },
    {
      quote:
        "I was in need of a face mask and it was about to pour and rain, The polite woman was quick and extremely helpful -- thank you so much",
      name: "Vikas Patel",
      location: "Queens, NY",
      rating: 5,
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 lg:px-12 min-h-[90vh] flex items-center justify-center">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground leading-[1.1]">
              Health Guard Pharmacy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground tracking-[0.05em] max-w-2xl mx-auto leading-relaxed">
              Making Medicine Accessible in Jackson Heights, NY
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Button size="lg" className="font-[family-name:var(--font-playfair)] rounded-full text-base px-8" asChild>
                <Link
                  href="https://atlanticpharmacy.vercel.app" // <-- 1. Change this URL
                  target="_blank" // Opens in new tab
                  rel="noopener noreferrer"
                >
                  Our Other Location {/* <-- 2. Change this text */}
                </Link>
              </Button>
            </div>

          </div>

          

          <div className="pt-12 border-t border-border max-w-3xl mx-auto">
            <p className="text-xs tracking-[0.2em] text-muted-foreground mb-8">EST. SEPTEMBER 2010</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <MapPin className="h-5 w-5 text-primary mx-auto" />
                <p className="text-sm tracking-[0.1em] text-foreground font-medium">Located in Queens</p>
                <p className="text-xs text-muted-foreground">Delivery available in all 5 boroughs</p>
              </div>
              <div className="space-y-2">
                <Clock className="h-5 w-5 text-primary mx-auto" />
                <p className="text-sm tracking-[0.1em] text-foreground font-medium">OPEN 6 DAYS</p>
                <p className="text-xs text-muted-foreground">Mon-Sat fast and friendly service</p>
              </div>
              <div className="space-y-2">
                <Globe className="h-5 w-5 text-primary mx-auto" />
                <p className="text-sm tracking-[0.1em] text-foreground font-medium">MULTILINGUAL</p>
                <p className="text-xs text-muted-foreground">3 languages spoken</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-24 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs tracking-[0.25em] text-muted-foreground text-center mb-16">ADDITIONAL SERVICES</h2>
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: "NOTARY PUBLIC", description: "Professional notary services available most weekdays" },
              { title: "OMNICARDS", description: "Omnicards can be recharged" },
              { title: "FAX & PRINT", description: "Fax and printing services ($1 per page)" },
              { title: "LOTTERY & SCRATCH-OFFS", description: "Play lottery and scratch-offs here!" },
              { title: "PHOTOCOPY", description: "Make photocopies for 10 cents per page!" },
              { title: "SERVICE", description: "At HGP we offer fast and friendly service!" },
            ].map((service, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-8 bg-card border border-border hover:border-primary transition-colors"
              >
                <h3 className="text-sm tracking-[0.15em] font-medium text-foreground">{service.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {" "}
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light tracking-tight text-foreground leading-tight">
                What Our Customers Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our community is at the heart of everything we do.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="text-center space-y-6">
                  {/* Star Rating */}
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                    {/* Fill empty stars if rating is less than 5 */}
                    {Array.from({ length: 5 - testimonial.rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-muted-foreground/30"
                        />
                      ),
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg text-foreground leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div>
                    <p className="font-semibold tracking-wide text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


    </main>
  )
}
