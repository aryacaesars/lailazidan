"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Copy, Send, Users, MessageCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function WAGeneratorPage() {
  const searchParams = useSearchParams()
  
  const [guestData, setGuestData] = useState({
    name: "",
    phone: "",
    relation: ""
  })
  
  // Pre-fill data from URL parameters
  useEffect(() => {
    const guestName = searchParams.get('guest')
    const guestPhone = searchParams.get('phone')
    const guestRelation = searchParams.get('relation')
    
    if (guestName || guestPhone || guestRelation) {
      setGuestData({
        name: guestName || "",
        phone: guestPhone || "",
        relation: guestRelation || ""
      })
    }
  }, [searchParams])
  
  const [messageTemplate, setMessageTemplate] = useState(
    `Assalamualaikum Wr. Wb.

Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i dalam acara pernikahan kami:

*Sarah Amelia & David Rahman*

📅 Sabtu, 15 Juni 2025
🕐 Pukul 08.00 - 12.00 WIB
📍 Gedung Serbaguna Mekar Sari
    Jl. Merdeka No. 123, Jakarta

Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dalam acara bahagia kami.

Untuk konfirmasi kehadiran, silakan klik link berikut:
{invitation_link}

Jazakumullahu khairan.

Wassalamualaikum Wr. Wb.

Sarah & David`
  )
  
  const [generatedMessages, setGeneratedMessages] = useState([])
  const [bulkGuests, setBulkGuests] = useState("")
  
  const baseInvitationUrl = typeof window !== 'undefined' ? `${window.location.origin}` : 'https://yourwedding.com'

  const handleGuestChange = (e) => {
    const { name, value } = e.target
    setGuestData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const formatPhoneNumber = (phone) => {
    // Remove all non-digit characters
    let cleanPhone = phone.replace(/\D/g, '')
    
    // If phone starts with 0, replace with 62 (Indonesian country code)
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.substring(1)
    }
    // If phone doesn't start with country code, add Indonesian country code
    else if (!cleanPhone.startsWith('62')) {
      cleanPhone = '62' + cleanPhone
    }
    
    return cleanPhone
  }

  const generateSingleMessage = () => {
    if (!guestData.name || !guestData.phone) {
      toast({
        title: "Error",
        description: "Nama dan nomor telepon wajib diisi",
        variant: "destructive"
      })
      return
    }

    const invitationLink = `${baseInvitationUrl}?guest=${encodeURIComponent(guestData.name)}`
    const personalizedMessage = messageTemplate.replace('{invitation_link}', invitationLink)
    const formattedPhone = formatPhoneNumber(guestData.phone)
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(personalizedMessage)}`
      const newMessage = {
      id: Date.now(),
      name: guestData.name,
      phone: guestData.phone,
      relation: guestData.relation,
      message: personalizedMessage,
      whatsappUrl,
      invitationLink,
      formattedPhone
    }
    
    setGeneratedMessages(prev => [newMessage, ...prev])
    setGuestData({ name: "", phone: "", relation: "" })
    
    toast({
      title: "Berhasil",
      description: `Pesan untuk ${newMessage.name} berhasil dibuat`
    })
  }

  const generateBulkMessages = () => {
    if (!bulkGuests.trim()) {
      toast({
        title: "Error",
        description: "Data tamu tidak boleh kosong",
        variant: "destructive"
      })
      return
    }

    const lines = bulkGuests.trim().split('\n')
    const newMessages = []
      lines.forEach((line, index) => {
      const parts = line.split(',').map(part => part.trim())
      if (parts.length >= 2) {
        const [name, phone, relation = ""] = parts
        if (name && phone) {
          const invitationLink = `${baseInvitationUrl}?guest=${encodeURIComponent(name)}`
          const personalizedMessage = messageTemplate.replace('{invitation_link}', invitationLink)
          const formattedPhone = formatPhoneNumber(phone)
          const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(personalizedMessage)}`
          
          newMessages.push({
            id: Date.now() + index,
            name,
            phone,
            relation,
            message: personalizedMessage,
            whatsappUrl,
            invitationLink,
            formattedPhone
          })
        }
      }
    })
    
    if (newMessages.length > 0) {
      setGeneratedMessages(prev => [...newMessages, ...prev])
      setBulkGuests("")
      toast({
        title: "Berhasil",
        description: `${newMessages.length} pesan berhasil dibuat`
      })
    } else {
      toast({
        title: "Error",
        description: "Format data tidak valid. Gunakan format: Nama, Nomor HP, Hubungan",
        variant: "destructive"
      })
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Berhasil",
        description: "Teks berhasil disalin ke clipboard"
      })
    })
  }

  const openWhatsApp = (url) => {
    window.open(url, '_blank')
  }

  const deleteMessage = (id) => {
    setGeneratedMessages(prev => prev.filter(msg => msg.id !== id))
    toast({
      title: "Berhasil",
      description: "Pesan berhasil dihapus"
    })
  }

  const clearAllMessages = () => {
    setGeneratedMessages([])
    toast({
      title: "Berhasil",
      description: "Semua pesan berhasil dihapus"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Generator WhatsApp</h1>
              <p className="text-gray-600">Buat link dan pesan WhatsApp untuk tamu undangan</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Template Message */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Template Pesan
                  </CardTitle>                  <CardDescription>
                    Sesuaikan template pesan undangan. Gunakan {`{invitation_link}`} untuk link undangan otomatis.
                    <br />
                    <span className="text-xs text-gray-500">
                      Tips: Nomor telepon akan otomatis diformat dengan kode negara Indonesia (+62)
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={messageTemplate}
                    onChange={(e) => setMessageTemplate(e.target.value)}
                    rows={12}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

              {/* Single Guest Input */}
              <Card>
                <CardHeader>
                  <CardTitle>Tambah Tamu Individual</CardTitle>
                  <CardDescription>
                    Tambahkan satu tamu dan buat pesan WhatsApp
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Tamu *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={guestData.name}
                      onChange={handleGuestChange}
                      placeholder="Contoh: Bapak Ahmad"
                    />
                  </div>                  <div>
                    <Label htmlFor="phone">Nomor WhatsApp *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={guestData.phone}
                      onChange={handleGuestChange}
                      placeholder="Contoh: 081234567890 atau 6281234567890"
                    />
                    {guestData.phone && (
                      <p className="text-xs text-gray-500 mt-1">
                        Format: +{formatPhoneNumber(guestData.phone)}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="relation">Hubungan (Opsional)</Label>
                    <Input
                      id="relation"
                      name="relation"
                      value={guestData.relation}
                      onChange={handleGuestChange}
                      placeholder="Contoh: Keluarga, Teman, Rekan Kerja"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={generateSingleMessage} className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Buat Pesan
                  </Button>
                </CardFooter>
              </Card>

              {/* Bulk Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Import Tamu Massal
                  </CardTitle>
                  <CardDescription>
                    Format: Nama, Nomor HP, Hubungan (satu baris per tamu)
                  </CardDescription>
                </CardHeader>
                <CardContent>                  <Textarea
                    value={bulkGuests}
                    onChange={(e) => setBulkGuests(e.target.value)}
                    rows={8}
                    placeholder={`Bapak Ahmad, 081234567890, Keluarga
Ibu Siti, 089876543210, Teman
David Smith, 6281111222333, Rekan Kerja`}
                  />
                </CardContent>
                <CardFooter>
                  <Button onClick={generateBulkMessages} className="w-full" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Import Semua Tamu
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Generated Messages */}
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Pesan yang Dibuat</CardTitle>
                      <CardDescription>
                        {generatedMessages.length} pesan siap dikirim
                      </CardDescription>
                    </div>
                    {generatedMessages.length > 0 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={clearAllMessages}
                      >
                        Hapus Semua
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="max-h-[800px] overflow-y-auto space-y-4">
                  {generatedMessages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Belum ada pesan yang dibuat</p>
                    </div>
                  ) : (
                    generatedMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="border-l-4 border-l-green-500">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div>                                <CardTitle className="text-lg">{msg.name}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline">{msg.phone}</Badge>
                                  {msg.formattedPhone && msg.formattedPhone !== msg.phone.replace(/\D/g, '') && (
                                    <Badge variant="outline" className="bg-green-50 text-green-700">
                                      +{msg.formattedPhone}
                                    </Badge>
                                  )}
                                  {msg.relation && (
                                    <Badge variant="secondary">{msg.relation}</Badge>
                                  )}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteMessage(msg.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                ×
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-3">
                              <div>
                                <Label className="text-xs text-gray-600">Link Undangan:</Label>
                                <div className="flex items-center gap-2 mt-1">
                                  <Input
                                    value={msg.invitationLink}
                                    readOnly
                                    className="text-xs"
                                  />
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => copyToClipboard(msg.invitationLink)}
                                  >
                                    <Copy className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => openWhatsApp(msg.whatsappUrl)}
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Kirim WhatsApp
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => copyToClipboard(msg.message)}
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                              </div>
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
    </div>
  )
}
