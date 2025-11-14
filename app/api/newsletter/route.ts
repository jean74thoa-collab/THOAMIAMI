
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Check if email already exists
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email }
    })

    if (existingSubscription) {
      if (existingSubscription.active) {
        return NextResponse.json({ error: 'Email is already subscribed' }, { status: 400 })
      } else {
        // Reactivate existing subscription
        await prisma.newsletter.update({
          where: { email },
          data: { active: true, name: name || existingSubscription.name }
        })
        return NextResponse.json({ message: 'Subscription reactivated successfully' })
      }
    }

    // Create new subscription
    const subscription = await prisma.newsletter.create({
      data: { email, name: name || null }
    })

    return NextResponse.json({ message: 'Subscribed successfully', id: subscription.id })
  } catch (error) {
    console.error('Error creating newsletter subscription:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
