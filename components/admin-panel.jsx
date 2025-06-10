"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Users, Plus, Copy, Trash2, Send, LinkIcon, Download, Eye } from "lucide-react"

export default function AdminPanel() {
  const [guests, setGuests] = useState([
    { id: 1, name: "Budi Santoso", phone: "081234567890", token: "abc123", sent: false },
    { id: 2, name: "Siti Nurhaliza", phone: "081234567891", token: "def456", sent: true },
  ])

  const [newGuest, setNewGuest] = useState({ name: "", phone: "" })
  const [customMessage, setCustomMessage] = useState(
    "Assalamualaikum {nama},\n\nDengan penuh rasa syukur, kami mengundang Anda untuk hadir dalam momen bahagia pernikahan kami.\n\nSilakan buka undangan melalui link berikut:\n{link}\n\nTerima kasih atas doa dan restu Anda.\n\nSalam hangat,\nSarah & David",
  )

  const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const addGuest = () => {
    if (newGuest.name && newGuest.phone) {
      const guest = {
        id: Date.now(),
        ...newGuest,
        token: generateToken(),
        sent: false,
      }
      setGuests([...guests, guest])
      setNewGuest({ name: "", phone: "" })
    }
  }

  const removeGuest = (id) => {
    setGuests(guests.filter((guest) => guest.id !== id))
  }

  const generateLink = (guest) => {
    const baseUrl = window.location.origin
    return `${baseUrl}?guest=${encodeURIComponent(guest.name)}&token=${guest.token}`
  }

  const copyLink = (guest) => {
    const link = generateLink(guest)
    navigator.clipboard.writeText(link)
    alert(`Link untuk ${guest.name} telah disalin!`)
  }

  const generateMessage = (guest) => {
    const link = generateLink(guest)
    return customMessage.replace("{nama}", guest.name).replace("{link}", link)
  }

  const sendMessage = (guest) => {
    const message = generateMessage(guest)
    const whatsappUrl = `https://wa.me/${guest.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Mark as sent
    setGuests(guests.map((g) => (g.id === guest.id ? { ...g, sent: true } : g)))
  }

  const exportGuestList = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Nama,Telepon,Token,Link,Status\n" +
      guests
        .map(
          (guest) =>
            `"${guest.name}","${guest.phone}","${guest.token}","${generateLink(guest)}","${guest.sent ? "Terkirim" : "Belum Terkirim"}"`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "daftar-tamu.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="py-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-script text-5xl text-sage-700 mb-4">Panel Admin</h2>
          <p className="text-sage-600 max-w-2xl mx-auto">Kelola daftar tamu dan kirim undangan personal</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Guest Management */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sage-700">
                  <Users className="w-5 h-5" />
                  Daftar Tamu ({guests.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Guest */}
                <div className="space-y-4 p-4 bg-sage-50 rounded-lg">
                  <h3 className="font-medium text-sage-700">Tambah Tamu Baru</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <Label htmlFor="guestName">Nama Lengkap</Label>
                      <Input
                        id="guestName"
                        value={newGuest.name}
                        onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                        placeholder="Masukkan nama tamu"
                        className="border-sage-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="guestPhone">Nomor WhatsApp</Label>
                      <Input
                        id="guestPhone"
                        value={newGuest.phone}
                        onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                        placeholder="081234567890"
                        className="border-sage-300"
                      />
                    </div>
                    <Button onClick={addGuest} className="bg-sage-600 hover:bg-sage-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Tamu
                    </Button>
                  </div>
                </div>

                {/* Guest List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {guests.map((guest) => (
                    <motion.div
                      key={guest.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 border border-sage-200 rounded-lg bg-white"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sage-700">{guest.name}</h4>
                          <p className="text-sm text-sage-600">{guest.phone}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                guest.sent ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {guest.sent ? "Terkirim" : "Belum Terkirim"}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyLink(guest)}
                            className="border-sage-300"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => sendMessage(guest)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Send className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeGuest(guest.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Export Button */}
                <Button onClick={exportGuestList} variant="outline" className="w-full border-sage-300">
                  <Download className="w-4 h-4 mr-2" />
                  Export Daftar Tamu
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Message Template */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sage-700">
                  <LinkIcon className="w-5 h-5" />
                  Template Pesan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="messageTemplate">Pesan WhatsApp</Label>
                  <Textarea
                    id="messageTemplate"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={12}
                    className="border-sage-300 font-mono text-sm"
                    placeholder="Tulis template pesan..."
                  />
                  <p className="text-xs text-sage-600 mt-2">
                    Gunakan {"{nama}"} untuk nama tamu dan {"{link}"} untuk link undangan
                  </p>
                </div>

                {/* Preview */}
                {guests.length > 0 && (
                  <div className="p-4 bg-sage-50 rounded-lg">
                    <h4 className="font-medium text-sage-700 mb-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Preview untuk {guests[0].name}
                    </h4>
                    <div className="text-sm text-sage-600 whitespace-pre-wrap bg-white p-3 rounded border">
                      {generateMessage(guests[0])}
                    </div>
                  </div>
                )}

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-sage-50 rounded-lg">
                    <div className="text-2xl font-bold text-sage-700">{guests.length}</div>
                    <div className="text-sm text-sage-600">Total Tamu</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">{guests.filter((g) => g.sent).length}</div>
                    <div className="text-sm text-green-600">Terkirim</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
