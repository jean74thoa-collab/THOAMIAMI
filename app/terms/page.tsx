
import Header from '@/components/header'
import Footer from '@/components/footer'
import { FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <FileText className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of <span className="text-primary">Service</span>
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
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using THE HOUSE OF ARTS website, you accept and agree to be bound 
                by the terms and provision of this agreement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Use License</h2>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily view the materials on THE HOUSE OF ARTS website 
                for personal, non-commercial transitory viewing only.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Artwork and Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All artwork images, artist information, and exhibition content displayed on this website 
                are protected by copyright and other intellectual property laws. Rights remain with the 
                respective artists and THE HOUSE OF ARTS.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on THE HOUSE OF ARTS website are provided on an 'as is' basis. 
                THE HOUSE OF ARTS makes no warranties, expressed or implied, and hereby disclaims 
                and negates all other warranties including without limitation, implied warranties 
                or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property or other rights violation.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall THE HOUSE OF ARTS or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to 
                business interruption) arising out of the use or inability to use the materials 
                on THE HOUSE OF ARTS website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the 
                laws of Florida, United States, and you irrevocably submit to the exclusive 
                jurisdiction of the courts in that State or location.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
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
