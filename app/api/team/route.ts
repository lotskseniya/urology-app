// app/api/team/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'

type TeamContact = {
  phone: string
  email: string
}

type TeamContacts = {
  [key: string]: TeamContact
}

export async function POST(req: NextRequest) {
  try {
    const { memberId }: { memberId: string } = await req.json()
    
    if (!memberId || typeof memberId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid member ID' },
        { status: 400 }
      )
    }
    
    const contacts: TeamContacts = {
      member1: { 
        phone: '+380 XX XXX XXXX', 
        email: 'ivanov@hospital.ua' 
      },
      member2: { 
        phone: '+380 XX XXX XXXX', 
        email: 'petrenko@hospital.ua' 
      },
      // ... rest of members
    }
    
    // Check if member exists
    if (!(memberId in contacts)) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(contacts[memberId])
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}