"use client"

import { useState, Suspense } from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Copy, Send, Users, MessageCircle, CircleCheck } from "lucide-react"
import invitationData from "@/data/invitation-data.json"

const buildMessageTemplate = (style = "formal") => {
  const wedding = invitationData?.wedding || {}
  const eventSection = invitationData?.eventSection || {}
  const mainEvent = eventSection?.events?.[0] || {}
  const waGenerator = invitationData?.waGenerator || {}
  const selectedStyle = waGenerator?.styles?.[style]

  const coupleName = wedding?.coupleShortName || "Mempelai"
  const eventDate = mainEvent?.date || wedding?.date || "-"
  const eventTime = mainEvent?.time || wedding?.dayTime || "-"
  const eventLocation = mainEvent?.location || wedding?.venue || "-"
  const eventAddress = mainEvent?.address || wedding?.address || "-"

  if (selectedStyle?.template) {
    return selectedStyle.template
      .replaceAll("{couple_name}", coupleName)
      .replaceAll("{event_date}", eventDate)
      .replaceAll("{event_time}", eventTime)
      .replaceAll("{event_location}", eventLocation)
      .replaceAll("{event_address}", eventAddress)
  }

  return `Yth. {guest_name},

Dengan hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan:

*${coupleName}*

📅 ${eventDate}
🕐 ${eventTime}
📍 ${eventLocation}
   ${eventAddress}

Merupakan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.

Konfirmasi kehadiran dapat dilakukan melalui tautan berikut:
{invitation_link}

Terima kasih atas perhatian dan doa restunya.`
}

function WAGeneratorContent() {
  const initialStyle = invitationData?.waGenerator?.defaultStyle || "formal"
  const [messageStyle, setMessageStyle] = useState(initialStyle)
  const [messageTemplate, setMessageTemplate] = useState(buildMessageTemplate(initialStyle))
  const [generatedMessages, setGeneratedMessages] = useState([])
  const [guestNamesInput, setGuestNamesInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingGuests, setIsLoadingGuests] = useState(true)
  const [isSavingEdit, setIsSavingEdit] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingGuestId, setEditingGuestId] = useState(null)
  const [editingGuestName, setEditingGuestName] = useState("")
  const [showLinkCopiedBanner, setShowLinkCopiedBanner] = useState(false)

  const baseInvitationUrl = typeof window !== "undefined" ? `${window.location.origin}` : "https://yourwedding.com"

  const handleStyleChange = (style) => {
    setMessageStyle(style)
    setMessageTemplate(buildMessageTemplate(style))
  }

  useEffect(() => {
    const loadGuests = async () => {
      try {
        const response = await fetch("/api/guests")
        const result = await response.json()
        if (!response.ok) {
          throw new Error(result?.error || "Gagal memuat daftar tamu")
        }

        const savedGuests = Array.isArray(result?.data) ? result.data : []
        const mappedGuests = savedGuests.map((guest, index) => {
          const name = guest?.name || ""
          const invitationLink = `${baseInvitationUrl}?guest=${encodeURIComponent(name)}`
          const message = messageTemplate
            .replaceAll("{invitation_link}", invitationLink)
            .replaceAll("{guest_name}", name)

          return {
            id: guest.id || `${Date.now()}-${index}`,
            name,
            phone: "",
            relation: "",
            message,
            whatsappUrl: `https://wa.me/?text=${encodeURIComponent(message)}`,
            invitationLink,
            formattedPhone: "",
            messageStyle,
          }
        })

        setGeneratedMessages(mappedGuests)
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Gagal memuat daftar tamu",
          variant: "destructive",
        })
      } finally {
        setIsLoadingGuests(false)
      }
    }

    loadGuests()
  }, [])

  const generateBulkMessages = async () => {
    if (isSubmitting) return

    if (!guestNamesInput.trim()) {
      toast({
        title: "Error",
        description: "Nama tamu tidak boleh kosong",
        variant: "destructive",
      })
      return
    }

    const names = guestNamesInput
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean)

    if (names.length === 0) {
      toast({
        title: "Error",
        description: "Format nama tamu tidak valid",
        variant: "destructive",
      })
      return
    }

    const newMessages = names.map((name) => {
      const invitationLink = `${baseInvitationUrl}?guest=${encodeURIComponent(name)}`
      const personalizedMessage = messageTemplate
        .replaceAll("{invitation_link}", invitationLink)
        .replaceAll("{guest_name}", name)

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(personalizedMessage)}`

      return {
        id: "",
        name,
        phone: "",
        relation: "",
        message: personalizedMessage,
        whatsappUrl,
        invitationLink,
        formattedPhone: "",
        messageStyle,
      }
    })

    try {
      setIsSubmitting(true)
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ names }),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result?.error || "Gagal membuat nama tamu")
      }
      const createdIds = Array.isArray(result?.ids) ? result.ids : []
      const messagesWithIds = newMessages.map((msg, index) => ({
        ...msg,
        id: createdIds[index] || `${Date.now()}-${index}`,
      }))

      setGeneratedMessages((prev) => [...messagesWithIds, ...prev])
      setGuestNamesInput("")
      toast({
        title: "Berhasil",
        description: `${newMessages.length} nama tamu berhasil dibuat`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Gagal membuat nama tamu",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Berhasil",
        description: "Teks berhasil disalin ke clipboard",
      })
    })
  }

  const handleCopyInvitationLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link)
      setShowLinkCopiedBanner(true)
      setTimeout(() => setShowLinkCopiedBanner(false), 1500)
    } catch {
      toast({
        title: "Error",
        description: "Gagal menyalin link",
        variant: "destructive",
      })
    }
  }

  const openWhatsApp = (url) => {
    window.open(url, "_blank")
  }

  const openEditGuestModal = (id) => {
    const target = generatedMessages.find((msg) => msg.id === id)
    if (!target) return

    setEditingGuestId(id)
    setEditingGuestName(target.name || "")
    setEditModalOpen(true)
  }

  const saveEditedGuest = async () => {
    const trimmedName = editingGuestName.trim()
    if (!trimmedName || !editingGuestId) return
    const invitationLink = `${baseInvitationUrl}?guest=${encodeURIComponent(trimmedName)}`
    const personalizedMessage = messageTemplate
      .replaceAll("{invitation_link}", invitationLink)
      .replaceAll("{guest_name}", trimmedName)
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(personalizedMessage)}`

    try {
      setIsSavingEdit(true)
      const response = await fetch(`/api/guests/${editingGuestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: trimmedName }),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result?.error || "Gagal memperbarui nama tamu")
      }

      setGeneratedMessages((prev) =>
        prev.map((msg) =>
          msg.id === editingGuestId
            ? {
                ...msg,
                name: trimmedName,
                invitationLink,
                message: personalizedMessage,
                whatsappUrl,
              }
            : msg,
        ),
      )
      setEditModalOpen(false)
      setEditingGuestId(null)
      setEditingGuestName("")

      toast({
        title: "Berhasil",
        description: "Nama tamu berhasil diperbarui",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Gagal memperbarui nama tamu",
        variant: "destructive",
      })
    } finally {
      setIsSavingEdit(false)
    }
  }

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`/api/guests/${id}`, {
        method: "DELETE",
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result?.error || "Gagal menghapus tamu")
      }

      setGeneratedMessages((prev) => prev.filter((msg) => msg.id !== id))
      toast({
        title: "Berhasil",
        description: "Data tamu berhasil dihapus",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Gagal menghapus tamu",
        variant: "destructive",
      })
    }
  }

  const clearAllMessages = async () => {
    const ids = generatedMessages.map((msg) => msg.id).filter(Boolean)
    if (ids.length === 0) return

    try {
      const response = await fetch("/api/guests", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result?.error || "Gagal menghapus semua tamu")
      }

      setGeneratedMessages([])
      toast({
        title: "Berhasil",
        description: "Semua data tamu berhasil dihapus",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Gagal menghapus semua tamu",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-2.5 sm:p-4">
      {showLinkCopiedBanner && (
        <div className="fixed left-1/2 top-6 z-[70] w-[92%] max-w-xl -translate-x-1/2 rounded-2xl bg-green-500 px-5 py-4 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white p-1.5">
              <CircleCheck className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-base font-medium sm:text-lg">Link berhasil disalin</p>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-5 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Generator Nama Tamu</h1>
              <p className="text-sm text-gray-600 sm:text-base">Buat link undangan personal untuk nama tamu</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Template Pesan
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed sm:text-sm">
                    Pilih tipe template pesan lalu sesuaikan template. Gunakan {`{invitation_link}`} untuk link undangan
                    otomatis dan {`{guest_name}`} untuk nama tamu.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="templateType">Tipe Template Pesan</Label>
                    <select
                      id="templateType"
                      value={messageStyle}
                      onChange={(e) => handleStyleChange(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="formal">Formal</option>
                      <option value="islami">Islami</option>
                    </select>
                  </div>
                  <Textarea
                    value={messageTemplate}
                    onChange={(e) => setMessageTemplate(e.target.value)}
                    rows={14}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Nama Tamu
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed sm:text-sm">
                    Masukkan daftar nama tamu undangan pada kolom "Nama Tamu". Setiap nama tamu bisa dipisahkan
                    dengan menekan Enter (baris baru) atau menggunakan tanda koma (,). Contoh: Budi, Siti, Andi
                    atau satu nama per baris.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                  <Label htmlFor="guestNames" className="mb-2 block">
                    Nama Tamu
                  </Label>
                  <Textarea
                    id="guestNames"
                    value={guestNamesInput}
                    onChange={(e) => setGuestNamesInput(e.target.value)}
                    rows={8}
                    placeholder={`Budi, Siti, Andi
atau
Budi
Siti
Andi`}
                  />
                </CardContent>
                <CardFooter className="p-4 pt-0 sm:p-6 sm:pt-0">
                  <Button onClick={generateBulkMessages} className="w-full" variant="outline" disabled={isSubmitting}>
                    <Users className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Membuat..." : "Buat Nama Tamu"}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle>Daftar Tamu</CardTitle>
                      <CardDescription>{generatedMessages.length} nama tamu</CardDescription>
                    </div>
                    {generatedMessages.length > 0 && (
                      <Button variant="destructive" size="sm" onClick={clearAllMessages} className="w-full sm:w-auto">
                        Hapus Semua
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="max-h-[70vh] space-y-4 overflow-y-auto p-4 pt-0 lg:max-h-[800px] sm:p-6 sm:pt-0">
                  {isLoadingGuests ? (
                    <div className="py-8 text-center text-gray-500">
                      <p>Memuat daftar tamu...</p>
                    </div>
                  ) : generatedMessages.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                      <MessageCircle className="mx-auto mb-4 h-12 w-12 opacity-50" />
                      <p>Belum ada data tamu</p>
                    </div>
                  ) : (
                    generatedMessages.map((msg) => (
                      <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                        <Card className="border border-rose-200 bg-white/90 shadow-sm">
                          <CardContent className="p-3">
                            <p className="text-sm font-medium text-gray-900 break-words">{msg.name}</p>
                            <p className="mt-1 break-all text-[11px] text-gray-500">{msg.invitationLink}</p>

                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <Button
                                size="sm"
                                onClick={() => openWhatsApp(msg.whatsappUrl)}
                                className="h-8 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                              >
                                <Send className="mr-1.5 h-3.5 w-3.5" />
                                KIRIM
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCopyInvitationLink(msg.invitationLink)}
                                className="h-8 rounded-full border-stone-300 text-stone-700 hover:bg-stone-50"
                              >
                                <Copy className="mr-1.5 h-3.5 w-3.5" />
                                TAUTAN
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                  onClick={() => openEditGuestModal(msg.id)}
                                className="h-8 rounded-full border-stone-300 text-stone-700 hover:bg-stone-50"
                              >
                                EDIT
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => deleteMessage(msg.id)}
                                className="h-8 rounded-full border-red-200 text-red-600 hover:bg-red-50"
                              >
                                HAPUS
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="w-[95vw] max-w-md sm:w-full">
          <DialogHeader>
            <DialogTitle>Edit Data Tamu</DialogTitle>
            <DialogDescription>Perbarui nama tamu untuk memperbarui link dan teks undangan.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="editGuestName">Nama Tamu</Label>
            <Input
              id="editGuestName"
              value={editingGuestName}
              onChange={(e) => setEditingGuestName(e.target.value)}
              placeholder="Masukkan nama tamu"
            />
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={() => setEditModalOpen(false)} className="w-full sm:w-auto">
              Batal
            </Button>
            <Button onClick={saveEditedGuest} disabled={isSavingEdit} className="w-full sm:w-auto">
              {isSavingEdit ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function WAGeneratorPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <WAGeneratorContent />
    </Suspense>
  )
}
