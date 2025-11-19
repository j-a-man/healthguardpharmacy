import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone, ArrowRight, MapPin, Clock, Globe, Star, MessageSquare, Heart, Shield, Users } from "lucide-react"

export default function AboutPage() {

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
    <main className="min-h-screen pt-20 overflow-x-hidden bg-background">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 px-6 lg:px-12 text-center flex flex-col items-center justify-center min-h-[40vh]">
        <div className="max-w-4xl mx-auto space-y-6 z-10">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground tracking-wide leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
            Providing Medicine to Patients in Jackson Heights Since 2010
          </p>
        </div>
      </section>

      {/* --- MISSION STATEMENT --- */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-1000 delay-300 fill-mode-both">
          <div className="bg-muted/30 border border-border/50 rounded-[3rem] p-12 md:p-20 text-center space-y-10">
            
            <div className="space-y-4">
              <p className="text-xs tracking-[0.3em] text-primary font-bold">EST. SEPTEMBER 2010</p>
              <div className="h-px bg-primary/20 max-w-[100px] mx-auto" />
            </div>

            <div className="space-y-8">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-foreground leading-tight">
                Our Mission
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                <p>
                  Health Guard Pharmacy was founded in September 2010 with a singular vision: to provide pharmaceutical 
                  care that combines clinical excellence with genuine community service. We believe that
                  modern healthcare demands both technical expertise and human connection.
                </p>
                <p>
                  Our commitment extends beyond dispensing medications. We serve as trusted healthcare partners in Queens 
                  and deliver to all five boroughs of New York City, offering multilingual support and services that address
                  the diverse needs of our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION (Cards) --- */}
      <section className="py-24 px-6 lg:px-12 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase">Our Values</h2>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-foreground">
              What Guides Us
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "PRECISION",
                description: "Every prescription filled with meticulous attention to detail and pharmaceutical accuracy.",
                icon: Shield
              },
              {
                title: "ACCESSIBILITY",
                description: "Serving Queens with multilingual support and comprehensive delivery services.",
                icon: Globe
              },
              {
                title: "COMMUNITY",
                description: "Building lasting relationships through personalized care and trusted healthcare partnerships.",
                icon: Users
              },
            ].map((value, index) => (
              <div 
                key={index} 
                className="group bg-background p-8 rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center space-y-6"
              >
                <div className="h-14 w-14 mx-auto bg-muted rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <value.icon className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                    <h4 className="text-sm tracking-[0.2em] font-bold text-foreground">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light tracking-tight text-foreground leading-tight">
                What Our Customers Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our community is at the heart of everything we do.
              </p>
            </div>

            {/* Testimonials Grid with subtle hover lift */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {testimonials.map((testimonial, index) => (
                <div 
                    key={index} 
                    className="text-center space-y-6 p-8 rounded-3xl border border-transparent hover:border-border/50 hover:bg-muted/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400 animate-in zoom-in duration-500"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>

                  <blockquote className="text-lg text-foreground leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>

                  <div>
                    <p className="font-semibold tracking-wide text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider text-xs mt-1">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
                <Button 
                    size="lg" 
                    className="h-14 px-10 text-lg font-[family-name:var(--font-playfair)] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 gap-3"
                    asChild
                >
                    <Link href="/review">
                        <MessageSquare className="h-5 w-5" />
                        Leave us a Review
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT INFORMATION --- */}
      <section className="py-24 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase">Get In Touch</h2>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-foreground">
              Contact Us
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-12">
            
            {/* Phone Card */}
            <div className="bg-background border border-border p-8 rounded-2xl text-center space-y-4 hover:shadow-lg transition-all duration-300 group">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Phone className="h-5 w-5" />
              </div>
              <h4 className="text-xs tracking-[0.2em] font-bold text-muted-foreground">PHONE</h4>
              <p className="text-lg font-medium text-foreground">(718) 507-6800</p>
            </div>

            {/* Email Card */}
            <div className="bg-background border border-border p-8 rounded-2xl text-center space-y-4 hover:shadow-lg transition-all duration-300 group">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <h4 className="text-xs tracking-[0.2em] font-bold text-muted-foreground">EMAIL</h4>
              <p className="text-lg font-medium text-foreground">healthguardrx@gmail.com</p>
            </div>

            {/* Address Card */}
            <div className="bg-background border border-border p-8 rounded-2xl text-center space-y-4 hover:shadow-lg transition-all duration-300 group">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <MapPin className="h-5 w-5" />
              </div>
              <h4 className="text-xs tracking-[0.2em] font-bold text-muted-foreground">ADDRESS</h4>
              <p className="text-lg font-medium text-foreground leading-relaxed">
                33-13 Junction Blvd
                <br />
                Jackson Heights, NY 11372
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}