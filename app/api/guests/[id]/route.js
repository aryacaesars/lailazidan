import { NextResponse } from "next/server"
import { deleteGuestName, updateGuestName } from "@/lib/guest-service"

export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const name = String(body?.name || "").trim()

    if (!name) {
      return NextResponse.json({ error: "Nama tamu wajib diisi" }, { status: 400 })
    }

    await updateGuestName(id, name)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message || "Gagal memperbarui tamu" }, { status: 500 })
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = params
    await deleteGuestName(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message || "Gagal menghapus tamu" }, { status: 500 })
  }
}
