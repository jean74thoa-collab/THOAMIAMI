
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Shield } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: November 2024
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none">
          <div className="space-y-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you visit THE HOUSE OF ARTS website or contact us, we may collect personal information 
                including your name, email address, phone number, and any messages you send us through our 
                contact forms or newsletter subscription.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Send you newsletters and updates about our exhibitions and artists (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Process any transactions or bookings you make with us</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy or when required by law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may use cookies to enhance your browsing experience. You can choose to 
                disable cookies through your browser settings, though this may affect some functionality.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to access, update, or delete your personal information. You may also 
                unsubscribe from our newsletter at any time by clicking the unsubscribe link in our emails.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p>THE HOUSE OF ARTS</p>
                <p>100 NW 36th St, Miami, FL 33127</p>
                <p>Email: contact@thehouseofarts.com</p>
                <p>Phone: (833) 624-7753</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
