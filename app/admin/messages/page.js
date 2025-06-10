"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AdminMessagePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Here you would typically send the message to your backend
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      toast({
        title: "Pesan Terkirim",
        description: "Pesan Anda telah berhasil dikirim ke admin.",
      })
      setFormData({
        name: "",
        email: "",
        message: "",
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream-50 to-sage-50 p-4 flex flex-col items-center justify-center">
      <div className="max-w-lg w-full">
        <Link href="/admin/dashboard" className="inline-flex items-center text-sage-600 hover:text-sage-700 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Dashboard
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-sage-200 shadow-lg">
            <CardHeader className="bg-sage-50 rounded-t-lg">
              <CardTitle className="text-sage-800">Hubungi Admin</CardTitle>
              <CardDescription>
                Kirim pesan kepada admin untuk pertanyaan atau bantuan terkait undangan pernikahan
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-sage-700" htmlFor="name">
                      Nama
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-sage-200 focus:border-sage-500 focus:ring-sage-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-sage-700" htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Masukkan email Anda"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-sage-200 focus:border-sage-500 focus:ring-sage-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-sage-700" htmlFor="message">
                      Pesan
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tuliskan pesan Anda kepada admin"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="border-sage-200 focus:border-sage-500 focus:ring-sage-500"
                    />
                  </div>
                </div>
                
                <CardFooter className="flex justify-end px-0 pt-6 pb-0">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-sage-600 hover:bg-sage-700 text-white"
                  >
                    {isLoading ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
