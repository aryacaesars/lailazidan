"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  MessageCircle, 
  Users, 
  Settings, 
  BarChart3, 
  Mail,
  ArrowLeft,
  Send,
  UserPlus
} from "lucide-react"

export default function AdminDashboard() {
  const adminFeatures = [
    {
      title: "Generator WhatsApp",
      description: "Buat link dan pesan WhatsApp untuk tamu undangan",
      icon: MessageCircle,
      href: "/admin/wa-generator",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      title: "Kelola Tamu",
      description: "Lihat dan kelola daftar tamu undangan",
      icon: Users,
      href: "/admin/guests",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      title: "Pesan Masuk",
      description: "Baca pesan dari tamu undangan",
      icon: Mail,
      href: "/admin/messages",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    {
      title: "Statistik RSVP",
      description: "Lihat statistik konfirmasi kehadiran",
      icon: BarChart3,
      href: "/admin/statistics",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    },
    {
      title: "Pengaturan",
      description: "Konfigurasi undangan dan template",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-gray-500",
      hoverColor: "hover:bg-gray-600"
    }
  ]

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
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Undangan
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-gray-600">Kelola undangan pernikahan Sarah & David</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tamu</p>
                    <p className="text-2xl font-bold text-gray-900">150</p>
                  </div>
                  <UserPlus className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Akan Hadir</p>
                    <p className="text-2xl font-bold text-green-600">85</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tidak Hadir</p>
                    <p className="text-2xl font-bold text-red-600">12</p>
                  </div>
                  <Users className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Belum Konfirmasi</p>
                    <p className="text-2xl font-bold text-yellow-600">53</p>
                  </div>
                  <Users className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${feature.color} ${feature.hoverColor} transition-colors group-hover:scale-110`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>
                  Lakukan tindakan umum dengan cepat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Link href="/admin/wa-generator">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Send className="w-4 h-4 mr-2" />
                      Buat Pesan WhatsApp
                    </Button>
                  </Link>
                  <Link href="/admin/guests">
                    <Button variant="outline">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Tambah Tamu
                    </Button>
                  </Link>
                  <Link href="/admin/statistics">
                    <Button variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Lihat Statistik
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
