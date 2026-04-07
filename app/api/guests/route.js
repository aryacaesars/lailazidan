import { NextResponse } from "next/server"
import { createGuestNames, deleteGuestNames, getGuestNames } from "@/lib/guest-service"

export async function GET() {
  try {
    const data = await getGuestNames()
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: error.message || "Gagal mengambil data tamu" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const names = Array.isArray(body?.names) ? body.names : []
    const ids = await createGuestNames(names)
    return NextResponse.json({ ids }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message || "Gagal menyimpan tamu" }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json()
    const ids = Array.isArray(body?.ids) ? body.ids : []
    await deleteGuestNames(ids)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message || "Gagal menghapus data tamu" }, { status: 500 })
  }
}
