import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Clock, 
  Globe, 
  Star, 
  MessageSquare, 
  ArrowRight, 
  PenTool, 
  CreditCard, 
  Printer, 
  Ticket, 
  Copy, 
  HeartHandshake 
} from "lucide-react"
// 1. Import the new component
import { BookingSection } from "@/components/booking-section"

export default function HomePage() {

  const testimonials = [
    {
      quote: "They are awesome! Great service and fast! I’m never in there more than 5 minutes. Way better than CVS pharmacy and always have the meds I need.",
      name: "Josie Rodríguez",
      location: "Queens, NY",
      rating: 5,
    },
    {
      quote: "Excellent and fast service. Accepted my out-of-state insurance. I found them online through my insurance's portal and stopped by to get at-home rapid tests.",
      name: "D. Johnson",
      location: "Queens, NY",
      rating: 5,
    },
    {
      quote: "I was in need of a face mask and it was about to pour and rain, The polite woman was quick and extremely helpful -- thank you so much",
      name: "Vikas Patel",
      location: "Queens, NY",
      rating: 5,
    },
  ]

  const services = [
    { title: "NOTARY PUBLIC", description: "Professional notary services available", icon: PenTool },
    { title: "OMNICARDS", description: "Reload your Omnicards here", icon: CreditCard },
    { title: "FAX & PRINT", description: "Faxing and printing ($1/page)", icon: Printer },
    { title: "LOTTERY", description: "Play lottery & scratch-offs", icon: Ticket },
    { title: "PHOTOCOPY", description: "Copies for just 10 cents", icon: Copy },
    { title: "SERVICE", description: "Fast, friendly, personal care", icon: HeartHandshake },
  ]

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      
      {/* --- MODERN HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 min-h-[85vh] flex flex-col items-center justify-center">
        
        {/* Main Content */}
        <div className="max-w-5xl mx-auto text-center space-y-8 z-10">
          <div className="space-y-4">
            <div className="inline-block animate-in fade-in slide-in-from-top-4 duration-700">
               <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
                  Est. 2010
               </span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
              Health Guard Pharmacy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground tracking-wide max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
              Your neighborhood health partner in Jackson Heights, NY.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
            <Button 
              size="lg" 
              className="font-[family-name:var(--font-playfair)] rounded-full h-12 px-8 w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105 transition-all duration-300" 
              asChild
            >
              <Link href="/review">
                <MessageSquare className="mr-2 h-4 w-4" />
                Leave a Review
              </Link>
            </Button>

            <Button 
              size="lg" 
              variant="outline" 
              className="font-[family-name:var(--font-playfair)] rounded-full h-12 px-8 w-full sm:w-auto border-border hover:bg-secondary hover:text-secondary-foreground transition-all duration-300" 
              asChild
            >
              <Link
                href="https://atlanticpharmacy.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Atlantic Pharmacy
                <ArrowRight className="ml-2 h-4 w-4 opacity-50" />
              </Link>
            </Button>
          </div>
        </div>

        {/* --- QUICK INFO BAR (Floating Card) --- */}
        <div className="mt-16 w-full max-w-4xl animate-in fade-in zoom-in duration-1000 delay-500 fill-mode-both">
            <div className="bg-background/80 backdrop-blur-md border border-border shadow-xl rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-border">
                <div className="flex flex-col items-center text-center space-y-2 group">
                    <div className="h-10 w-10 bg-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm tracking-wide">Queens, NY</h3>
                        <p className="text-xs text-muted-foreground mt-1">Delivery to all 5 Boroughs</p>
                    </div>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 group">
                    <div className="h-10 w-10 bg-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm tracking-wide">Open 6 Days</h3>
                        <p className="text-xs text-muted-foreground mt-1">Fast & Friendly Service</p>
                    </div>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 group">
                    <div className="h-10 w-10 bg-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm tracking-wide">Multilingual</h3>
                        <p className="text-xs text-muted-foreground mt-1">Se Habla Español</p>
                    </div>
                </div>
            </div>
        </div>
      </section>


      {/* --- SERVICES SECTION (Visual Grid) --- */}
      <section className="py-24 px-6 lg:px-12 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Convenience</h2>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-foreground">More Than Just Medicine</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-background p-8 rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center space-y-4"
              >
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-6 w-6" />
                </div>
                <div>
                    <h4 className="text-sm font-bold tracking-wider text-foreground mb-2">{service.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 px-6 lg:px-12 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-foreground">
              Loved by Locals
            </h2>
            <div className="h-1 w-20 bg-primary/20 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-secondary/10 p-8 rounded-3xl hover:bg-secondary/30 transition-colors duration-300 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                    </div>
                    <p className="text-foreground/80 italic leading-relaxed">"{testimonial.quote}"</p>
                </div>
                
                <div className="pt-6 mt-4 border-t border-foreground/5">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW BOOKING SECTION --- */}
      <BookingSection />

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
             <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-foreground">
              Have you visited us recently?
            </h2>
            <Button 
                size="lg" 
                className="h-14 px-10 rounded-full font-[family-name:var(--font-playfair)] text-lg shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-1"
                asChild
            >
                <Link href="/review">
                    Share Your Experience
                </Link>
            </Button>
        </div>
      </section>

    </main>
  )
}