import { Mail, Phone, MapPin } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Page Header */}
      <section className="py-24 px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
            About Us
          </h1>
          <p className="text-lg text-muted-foreground tracking-[0.05em] leading-relaxed max-w-2xl mx-auto">
            Providing Medicine to Patients in Jackson Heights Since 2010
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <p className="text-xs tracking-[0.25em] text-muted-foreground">EST. SEPTEMBER 2010</p>
              <div className="h-px bg-border max-w-xs mx-auto" />
            </div>

            <div className="space-y-8 text-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light tracking-tight text-foreground leading-tight">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Health Guard Pharmacy was founded in September 2010 with a singular vision: to provide pharmaceutical 
                care that combines clinical excellence with genuine community service. We believe that
                modern healthcare demands both technical expertise and human connection.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Our commitment extends beyond dispensing medications. We serve as trusted healthcare partners in Queens 
                and deliver to all five boroughs of New York City, offering multilingual support and offer services that address
                the diverse needs of our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 lg:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs tracking-[0.25em] text-muted-foreground mb-4">OUR VALUES</h2>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light tracking-tight text-foreground">
              What Guides Us
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "PRECISION",
                description:
                  "Every prescription filled with meticulous attention to detail and pharmaceutical accuracy.",
              },
              {
                title: "ACCESSIBILITY",
                description: "Serving Queens with multilingual support and comprehensive delivery services.",
              },
              {
                title: "COMMUNITY",
                description:
                  "Building lasting relationships through personalized care and trusted healthcare partnerships.",
              },
            ].map((value, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-px bg-primary mx-auto" />
                <h4 className="text-sm tracking-[0.15em] font-medium text-foreground">{value.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs tracking-[0.25em] text-muted-foreground mb-4">GET IN TOUCH</h2>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Contact Us
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <Phone className="h-6 w-6 text-primary mx-auto" />
              <h4 className="text-xs tracking-[0.2em] text-muted-foreground">PHONE</h4>
              <p className="text-lg text-foreground">(718) 507-6800</p>
            </div>

            
            <div className="text-center space-y-4">
              <Mail className="h-6 w-6 text-primary mx-auto" />
              <h4 className="text-xs tracking-[0.2em] text-muted-foreground">EMAIL</h4>
              <p className="text-lg text-foreground">info@healthguardpharmacy.com</p>
            </div>

            <div className="text-center space-y-4">
              <MapPin className="h-6 w-6 text-primary mx-auto" />
              <h4 className="text-xs tracking-[0.2em] text-muted-foreground">ADDRESS</h4>
              <p className="text-lg text-foreground">
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
