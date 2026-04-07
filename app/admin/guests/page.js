"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

export default function GuestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGuests = async () => {
      try {
        const rsvpRes = await fetch("/api/rsvps")
        const rsvpResult = await rsvpRes.json()

        if (!rsvpRes.ok) {
          throw new Error(rsvpResult?.error || "Gagal mengambil data RSVP")
        }
        const rsvpData = Array.isArray(rsvpResult?.data) ? rsvpResult.data : []
        setGuests(rsvpData)
      } catch (error) {
        toast({
          title: "Gagal memuat data tamu",
          description: error.message || "Terjadi kesalahan saat mengambil data dari Firebase",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadGuests()
  }, [])

  const filteredGuests = useMemo(
    () =>
      guests.filter(
        (guest) =>
          guest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(guest.guests || "").includes(searchTerm) ||
          (guest.message || "").toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [guests, searchTerm],
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case "hadir":
        return <Badge className="bg-green-100 text-green-800">Inshaallah Hadir</Badge>
      case "tidak-hadir":
        return <Badge className="bg-red-100 text-red-800">Tidak Hadir</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-2.5 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Kelola Tamu</h1>
              <p className="text-sm text-gray-600 sm:text-base">Daftar RSVP tamu undangan dari Firebase</p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-4 sm:p-6">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Cari nama, jumlah tamu, atau pesan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <Card>
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{guests.length}</p>
                  <p className="text-xs text-gray-600">Total Tamu</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-xl font-bold text-green-600">
                    {guests.filter(g => g.attendance === 'hadir').length}
                  </p>
                  <p className="text-xs text-gray-600">Inshaallah Hadir</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-center">
                  <p className="text-xl font-bold text-red-600">
                    {guests.filter(g => g.attendance === 'tidak-hadir').length}
                  </p>
                  <p className="text-xs text-gray-600">Tidak Hadir</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Guests List */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle>Daftar Tamu</CardTitle>
              <CardDescription>
                {filteredGuests.length} tamu ditemukan
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <div className="space-y-2.5">
                {loading && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Memuat data tamu...</p>
                  </div>
                )}

                {!loading && filteredGuests.map((guest, index) => (
                  <motion.div
                    key={guest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="border-l-4 border-l-blue-500">
                      <CardContent className="p-3.5 sm:p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="mb-1.5 flex flex-wrap items-center gap-2">
                              <h3 className="truncate text-sm sm:text-base font-semibold">{guest.name}</h3>
                              <Badge variant="secondary" className="text-[11px]">Tamu: {guest.guests || 1}</Badge>
                              {getStatusBadge(guest.attendance)}
                            </div>
                            <div className="space-y-1.5 text-xs text-gray-600">
                              <div className="rounded-md bg-gray-50 px-2 py-1.5 text-gray-700">
                                <span className="font-medium">Pesan:</span>{" "}
                                {guest.message?.trim() ? guest.message : "-"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                
                {!loading && filteredGuests.length === 0 && (
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
