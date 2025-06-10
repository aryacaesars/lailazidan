"use client"

import { motion } from "framer-motion"
import { Heart, Calendar } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-2 sm:px-4 py-12 sm:py-16 lg:py-20">
      <div className="text-center max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <p className="text-sage-600 font-medium tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4">The Wedding of</p>
          <h1 className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-sage-700 mb-4 sm:mb-6 px-2">Sarah & David</h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-sage-500 fill-current" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-sage-100 mx-2 sm:mx-0"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-sage-700">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            <div className="text-center">
              <p className="text-lg sm:text-xl lg:text-2xl font-serif font-semibold">15 Juni 2024</p>
              <p className="text-sage-600 text-sm sm:text-base">Sabtu, 14:00 WIB</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-sage-200">
            <p className="text-sage-600 font-medium text-sm sm:text-base">Gedung Serbaguna Taman Bunga</p>
            <p className="text-sage-500 text-xs sm:text-sm">Jl. Melati Indah No. 123, Jakarta Selatan</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8 sm:mt-10 lg:mt-12 px-4 sm:px-0"
        >
          <p className="text-sage-600 italic font-serif text-sm sm:text-base lg:text-lg leading-relaxed">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri,
            supaya kamu cenderung dan merasa tenteram kepadanya"
          </p>
          <p className="text-sage-500 text-xs sm:text-sm mt-2">- QS. Ar-Rum: 21 -</p>
        </motion.div>
      </div>
    </section>
  )
}
