import { NextResponse } from "next/server"
import { createRsvp, getRsvps } from "@/lib/rsvp-service"

export async function GET() {
  try {
    const data = await getRsvps()
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: error.message || "Gagal mengambil data RSVP" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const id = await createRsvp(body)
    return NextResponse.json({ id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message || "Gagal menyimpan RSVP" }, { status: 500 })
  }
}
