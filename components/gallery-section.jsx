"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function GallerySection() {
  const photos = [
    { id: 1, src: "/cover/image.png", alt: "Pre-wedding 1" },
    { id: 2, src: "/cover/image.png", alt: "Pre-wedding 2" },
    { id: 3, src: "/cover/image.png", alt: "Pre-wedding 3" },
    { id: 4, src: "/cover/image.png", alt: "Pre-wedding 4" },
    { id: 5, src: "/cover/image.png", alt: "Pre-wedding 5" },
    { id: 6, src: "/cover/image.png", alt: "Pre-wedding 6" },
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
          <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl text-sage-700 mb-3 sm:mb-4">Galeri Foto</h2>
          <p className="text-sage-600 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">Momen-momen indah perjalanan cinta kami</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12 lg:mt-16"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg max-w-2xl mx-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              <h3 className="font-script text-2xl sm:text-3xl text-sage-700 mb-3 sm:mb-4">Cerita Cinta Kami</h3>
              <p className="text-sage-600 leading-relaxed text-sm sm:text-base">
                Pertemuan pertama kami di kampus pada tahun 2019 menjadi awal dari perjalanan cinta yang indah. Dari
                persahabatan yang tulus, berkembang menjadi cinta yang mendalam. Kini kami siap melangkah bersama menuju
                jenjang yang lebih sakral.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
