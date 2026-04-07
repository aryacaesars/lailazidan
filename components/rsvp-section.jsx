"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CircleCheck, Heart, Send } from "lucide-react"
import invitationData from "../data/invitation-data.json"

export default function RSVPSection({ guestName }) {
  const { rsvpSection } = invitationData
  const [formData, setFormData] = useState({
    name: guestName || "",
    attendance: "hadir",
    guests: "1",
    message: "",
  })
  const [successMessage, setSuccessMessage] = useState("")

  // Update form data when guestName prop changes
  useEffect(() => {
    if (guestName) {
      setFormData(prev => ({
        ...prev,
        name: guestName
      }))
    }
  }, [guestName])

  useEffect(() => {
    if (!successMessage) return
    const timeout = setTimeout(() => {
      setSuccessMessage("")
    }, 4000)
    return () => clearTimeout(timeout)
  }, [successMessage])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/rsvps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result?.error || "Gagal mengirim RSVP")
      }
      setSuccessMessage(rsvpSection.submitSuccessMessage)
      setFormData((prev) => ({
        name: guestName || prev.name,
        attendance: "hadir",
        guests: "1",
        message: "",
      }))
    } catch (error) {
      alert(error.message || "Gagal mengirim RSVP")
    }
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
          <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-4">{rsvpSection.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            {rsvpSection.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
              <CardContent className="p-8">
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-xl bg-green-500 px-4 py-3 text-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-white p-2 text-green-500">
                        <CircleCheck className="h-5 w-5" />
                      </div>
                      <p className="text-base font-medium">{successMessage}</p>
                    </div>
                  </motion.div>
                )}
                {guestName && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 p-4 bg-muted rounded-lg border border-border"
                  >
                    <p className="text-foreground text-center">
                      <span className="font-semibold">Halo {guestName.split(" ")[0]}!</span> 
                      <br />
                      <span className="text-sm">{rsvpSection.guestGreetingTemplate}</span>
                    </p>
                  </motion.div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="mt-2 border-input"
                      placeholder="Masukkan nama lengkap Anda"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-foreground font-medium">Konfirmasi Kehadiran</Label>
                    <RadioGroup
                      value={formData.attendance}
                      onValueChange={(value) => handleInputChange("attendance", value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hadir" id="hadir" />
                        <Label htmlFor="hadir" className="text-muted-foreground">
                          Inshaallah hadir
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tidak-hadir" id="tidak-hadir" />
                        <Label htmlFor="tidak-hadir" className="text-muted-foreground">
                          Maaf, saya tidak dapat hadir
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="guests" className="text-foreground font-medium">
                      Jumlah Tamu
                    </Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="5"
                      value={formData.guests}
                      onChange={(e) => handleInputChange("guests", e.target.value)}
                      className="mt-2 border-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Pesan & Doa
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="mt-2 border-input"
                      placeholder="Tuliskan pesan dan doa terbaik untuk kami..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Konfirmasi
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Thank You Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
              <CardContent className="p-8 text-center">
                <Heart className="w-8 h-8 text-primary mx-auto mb-4 fill-current" />
                <h3 className="font-serif text-xl text-foreground mb-3">{rsvpSection.thankYouTitle}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {rsvpSection.thankYouText}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
