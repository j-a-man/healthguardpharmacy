import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Clock, Globe } from "lucide-react"

export default function HomePage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "NOTARY PUBLIC", description: "Professional notary services available most weekdays" },
              { title: "OMNICARDS", description: "Omnicards can be recharged" },
              { title: "FAX & PRINT", description: "Fax and printing services ($1 per page)" },
              { title: "LOTTERY & SCRATCH-OFFS", description: "Play lottery and scratch-offs here!" },
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
    </main>
  )
}
