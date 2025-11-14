
'use client'

import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setEmail('')
        setName('')
      } else {
        setError(data?.error || 'Something went wrong')
      }
    } catch (error) {
      console.error('Newsletter signup error:', error)
      setError('Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="bg-primary/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            You've successfully subscribed to our newsletter. We'll keep you updated with our latest exhibitions and artist features.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
          <p className="text-muted-foreground">
            Subscribe to our newsletter for the latest exhibitions, artist features, and gallery news.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div>
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
          
          <Button 
            type="submit" 
            disabled={loading || !email}
            className="w-full"
            size="lg"
          >
            {loading ? (
              'Subscribing...'
            ) : (
              <>
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </CardContent>
    </Card>
  )
}
