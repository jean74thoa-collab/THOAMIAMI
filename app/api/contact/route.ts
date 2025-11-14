
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
      }
    })

    return NextResponse.json({ 
      message: 'Contact form submitted successfully', 
      id: contact.id 
    })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
