"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, Send, Gift } from "lucide-react"

export default function RSVPSection({ guestName }) {
  const [formData, setFormData] = useState({
    name: guestName || "",
    attendance: "",
    guests: "1",
    message: "",
  })

  // Update form data when guestName prop changes
  useEffect(() => {
    if (guestName) {
      setFormData(prev => ({
        ...prev,
        name: guestName
      }))
    }
  }, [guestName])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("RSVP Data:", formData)
    alert("Terima kasih atas konfirmasi kehadiran Anda!")
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl text-sage-700 mb-3 sm:mb-4">Konfirmasi Kehadiran</h2>
          <p className="text-sage-600 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            Kehadiran dan doa restu Anda merupakan kebahagiaan terbesar bagi kami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg">
              <CardContent className="p-8">
                {guestName && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 p-4 bg-sage-50 rounded-lg border border-sage-200"
                  >
                    <p className="text-sage-700 text-center">
                      <span className="font-semibold">Halo {guestName.split(" ")[0]}!</span> 
                      <br />
                      <span className="text-sm">Silakan konfirmasi kehadiran Anda untuk acara pernikahan kami 💕</span>
                    </p>
                  </motion.div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sage-700 font-medium">
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="mt-2 border-sage-300 focus:border-sage-500"
                      placeholder="Masukkan nama lengkap Anda"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-sage-700 font-medium">Konfirmasi Kehadiran</Label>
                    <RadioGroup
                      value={formData.attendance}
                      onValueChange={(value) => handleInputChange("attendance", value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hadir" id="hadir" />
                        <Label htmlFor="hadir" className="text-sage-600">
                          Ya, saya akan hadir
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tidak-hadir" id="tidak-hadir" />
                        <Label htmlFor="tidak-hadir" className="text-sage-600">
                          Maaf, saya tidak dapat hadir
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="guests" className="text-sage-700 font-medium">
                      Jumlah Tamu
                    </Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="5"
                      value={formData.guests}
                      onChange={(e) => handleInputChange("guests", e.target.value)}
                      className="mt-2 border-sage-300 focus:border-sage-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sage-700 font-medium">
                      Pesan & Doa
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="mt-2 border-sage-300 focus:border-sage-500"
                      placeholder="Tuliskan pesan dan doa terbaik untuk kami..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Konfirmasi
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Wedding Gift Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-sage-100 to-cream-100 border-sage-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <Gift className="w-12 h-12 text-sage-600 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-sage-700 mb-4">Wedding Gift</h3>
                <p className="text-sage-600 mb-6 text-sm leading-relaxed">
                  Doa restu Anda adalah hadiah yang paling berharga bagi kami. Namun jika ingin memberikan hadiah, Anda
                  dapat mengirimkannya melalui:
                </p>

                <div className="space-y-4 text-left">
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="font-medium text-sage-700">Bank BCA</p>
                    <p className="text-sage-600 text-sm">1234567890</p>
                    <p className="text-sage-600 text-sm">a.n. Sarah Amelia</p>
                  </div>

                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="font-medium text-sage-700">Bank Mandiri</p>
                    <p className="text-sage-600 text-sm">0987654321</p>
                    <p className="text-sage-600 text-sm">a.n. David Rahman</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <Heart className="w-8 h-8 text-sage-500 mx-auto mb-4 fill-current" />
                <h3 className="font-serif text-xl text-sage-700 mb-3">Terima Kasih</h3>
                <p className="text-sage-600 text-sm leading-relaxed">
                  Kehadiran Anda dalam momen bahagia kami adalah berkah yang tak ternilai. Terima kasih atas doa dan
                  dukungan yang telah Anda berikan.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
