"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function CoupleSection() {
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
          <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl text-sage-700 mb-3 sm:mb-4">Mempelai</h2>
          <p className="text-sage-600 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            Dengan penuh rasa syukur, kami mengundang Anda untuk menyaksikan ikrar suci kami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg">
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-cream-200 to-sage-200 flex items-center justify-center">
                  <img
                    src="/cover/image.png"
                    alt="Sarah"
                    className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full object-cover"
                  />
                </div>
                <h3 className="font-script text-2xl sm:text-3xl lg:text-4xl text-sage-700 mb-2">Sarah Amelia</h3>
                <p className="text-sage-600 mb-3 sm:mb-4 text-sm sm:text-base">Putri dari</p>
                <p className="text-sage-700 font-medium text-sm sm:text-base">Bapak Ahmad Wijaya & Ibu Siti Nurhaliza</p>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-sage-200">
                  <p className="text-sage-600 text-xs sm:text-sm leading-relaxed">
                    "Cinta sejati adalah ketika dua jiwa bertemu dan menjadi satu dalam kebahagiaan dan kesedihan"
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-sage-200 shadow-lg">
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-cream-200 to-sage-200 flex items-center justify-center">
                  <img
                    src="/cover/image.png"
                    alt="David"
                    className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full object-cover"
                  />
                </div>
                <h3 className="font-script text-2xl sm:text-3xl lg:text-4xl text-sage-700 mb-2">David Rahman</h3>
                <p className="text-sage-600 mb-3 sm:mb-4 text-sm sm:text-base">Putra dari</p>
                <p className="text-sage-700 font-medium text-sm sm:text-base">Bapak Bambang Rahman & Ibu Dewi Sartika</p>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-sage-200">
                  <p className="text-sage-600 text-xs sm:text-sm leading-relaxed">
                    "Dalam setiap langkah hidup, aku ingin bersamamu hingga akhir waktu"
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
