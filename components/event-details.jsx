"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EventDetails() {
  const events = [
    {
      title: "Akad Nikah",
      date: "15 Juni 2024",
      time: "08:00 - 10:00 WIB",
      location: "Masjid Al-Ikhlas",
      address: "Jl. Dahlia Raya No. 45, Jakarta Selatan",
      description: "Prosesi akad nikah akan dilaksanakan secara khidmat",
    },
    {
      title: "Resepsi Pernikahan",
      date: "15 Juni 2024",
      time: "14:00 - 17:00 WIB",
      location: "Gedung Serbaguna Taman Bunga",
      address: "Jl. Melati Indah No. 123, Jakarta Selatan",
      description: "Resepsi pernikahan untuk merayakan kebahagiaan bersama",
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl text-sage-700 mb-3 sm:mb-4">Acara Pernikahan</h2>
          <p className="text-sage-600 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            Kami dengan hormat mengundang Anda untuk hadir dalam momen bahagia kami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg h-full">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="font-script text-2xl sm:text-3xl text-sage-700 mb-2">{event.title}</h3>
                    <p className="text-sage-600 text-xs sm:text-sm">{event.description}</p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 text-sage-700">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-sage-500 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">{event.date}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sage-700">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-sage-500 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">{event.time}</span>
                    </div>

                    <div className="flex items-start gap-3 text-sage-700">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-sage-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">{event.location}</p>
                        <p className="text-sage-600 text-xs sm:text-sm">{event.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-sage-200">
                    <Button
                      className="w-full bg-sage-600 hover:bg-sage-700 text-white text-sm sm:text-base"
                      onClick={() =>
                        window.open(`https://maps.google.com/?q=${encodeURIComponent(event.address)}`, "_blank")
                      }
                    >
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Lihat Lokasi
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12 lg:mt-16"
        >
          <Card className="bg-gradient-to-r from-sage-100 to-cream-100 border-sage-200 shadow-lg max-w-2xl mx-auto">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-sage-500 mx-auto mb-3 sm:mb-4 fill-current" />
              <h3 className="font-serif text-xl sm:text-2xl text-sage-700 mb-3 sm:mb-4">Protokol Kesehatan</h3>
              <p className="text-sage-600 text-xs sm:text-sm leading-relaxed">
                Demi kenyamanan bersama, kami menerapkan protokol kesehatan. Mohon gunakan masker dan jaga jarak selama
                acara berlangsung.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
