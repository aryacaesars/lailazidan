"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Search, UserPlus, Edit, Trash2, Phone, Mail } from "lucide-react"

export default function GuestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Sample guest data - in a real app this would come from a database
  const [guests] = useState([    {
      id: 1,
      name: "Bapak Ahmad Wijaya",
      phone: "081234567890",
      email: "ahmad.wijaya@email.com",
      relation: "Keluarga",
      rsvpStatus: "attending",
      invitationSent: true
    },
    {
      id: 2,
      name: "Ibu Siti Nurhaliza",
      phone: "089876543210",
      email: "siti.nurhaliza@email.com",
      relation: "Teman",
      rsvpStatus: "not_attending",
      invitationSent: true
    },
    {
      id: 3,
      name: "David Smith",
      phone: "081111222333",
      email: "david.smith@email.com",
      relation: "Rekan Kerja",
      rsvpStatus: "pending",
      invitationSent: false
    },
    {
      id: 4,
      name: "Sarah Johnson",
      phone: "082222333444",
      email: "sarah.johnson@email.com",
      relation: "Sahabat",
      rsvpStatus: "attending",
      invitationSent: true
    }
  ])

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.relation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.phone.includes(searchTerm)
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case "attending":
        return <Badge className="bg-green-100 text-green-800">Akan Hadir</Badge>
      case "not_attending":
        return <Badge className="bg-red-100 text-red-800">Tidak Hadir</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Belum Konfirmasi</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getInvitationStatus = (sent) => {
    return sent 
      ? <Badge variant="outline" className="bg-blue-100 text-blue-800">Terkirim</Badge>
      : <Badge variant="outline" className="bg-gray-100 text-gray-800">Belum Terkirim</Badge>
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
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Kelola Tamu</h1>
              <p className="text-gray-600">Daftar dan kelola tamu undangan pernikahan</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Tambah Tamu
            </Button>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Cari nama, hubungan, atau nomor telepon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{guests.length}</p>
                  <p className="text-sm text-gray-600">Total Tamu</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {guests.filter(g => g.rsvpStatus === 'attending').length}
                  </p>
                  <p className="text-sm text-gray-600">Akan Hadir</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">
                    {guests.filter(g => g.rsvpStatus === 'not_attending').length}
                  </p>
                  <p className="text-sm text-gray-600">Tidak Hadir</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {guests.filter(g => g.rsvpStatus === 'pending').length}
                  </p>
                  <p className="text-sm text-gray-600">Belum Konfirmasi</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Guests List */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Tamu</CardTitle>
              <CardDescription>
                {filteredGuests.length} tamu ditemukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredGuests.map((guest, index) => (
                  <motion.div
                    key={guest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{guest.name}</h3>
                              <Badge variant="secondary">{guest.relation}</Badge>
                              {getStatusBadge(guest.rsvpStatus)}
                              {getInvitationStatus(guest.invitationSent)}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {guest.phone}
                              </div>
                              <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {guest.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/wa-generator?guest=${encodeURIComponent(guest.name)}&phone=${guest.phone}`}>
                              <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                                Kirim WA
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                
                {filteredGuests.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Tidak ada tamu yang ditemukan</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
