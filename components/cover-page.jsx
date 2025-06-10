"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Mail, Calendar, User } from "lucide-react"

import { useEffect, useState } from "react";

export default function CoverPage({ onOpenInvitation, guestName }) {
  // Fix hydration mismatch: Only generate random positions on client
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    // Generate random positions and animation values for hearts on mount (client only)
    setHearts(
      Array.from({ length: 6 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 w-20 h-20 bg-sage-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 right-16 w-32 h-32 bg-cream-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-1/3 right-10 w-16 h-16 bg-sage-300 rounded-full opacity-15"
        />
      </div>

      <div className="text-center max-w-2xl mx-auto relative z-10 py-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-sage-100"
        >
          {/* Guest Greeting - Inside main card */}
          {guestName && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-6 p-2 bg-gradient-to-r from-sage-50 to-cream-50 rounded-lg border border-sage-200/50"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 3, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut" 
                  }}
                >
                  <User className="w-3 h-3 text-sage-500" />
                </motion.div>
                <span className="text-sage-600 font-medium text-xs">Kepada Yth.</span>
              </div>
              <motion.h3 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 1.0 }}
                className="font-serif text-lg text-sage-800 font-bold mb-1"
              >
                {guestName}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-sage-600 text-xs italic"
              >
                Di tempat
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "20px" }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="h-px bg-gradient-to-r from-sage-400 to-sage-600 mx-auto mt-1 rounded-full"
              />
            </motion.div>
          )}

          {/* Wedding Invitation Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: guestName ? 1.6 : 1 }}
            className="mb-6"
          >
            <h2 className="text-sage-600 font-medium tracking-widest uppercase text-sm">Wedding Invitation</h2>
          </motion.div>

          {/* Names */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: guestName ? 1.8 : 1.2 }}
            className="mb-6"
          >
            <h1 className="font-script text-5xl md:text-6xl text-sage-700 mb-4">Sarah & David</h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: guestName ? 2.0 : 1.8 }}
              className="flex justify-center mb-4"
            >
              <div className="relative w-32 h-48 sm:w-40 sm:h-40 lg:w-48 lg:h-48 overflow-hidden shadow-lg border-2 border-sage-200 rounded-t-full">
                <img
                  src="/cover/image.png"
                  alt="Sarah & David"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: guestName ? 2.2 : 1.4 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-3 text-sage-700 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-xl font-serif font-semibold">15 Juni 2024</span>
            </div>
            <p className="text-sage-600">Sabtu, 14:00 WIB</p>
          </motion.div>

          {/* Decorative Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: guestName ? 2.4 : 1.6 }}
            className="flex justify-center mb-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-sage-300"></div>
              <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-sage-300"></div>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: guestName ? 2.6 : 1.8 }}
            className="mb-3"
          >
            <Button
              onClick={onOpenInvitation}
              className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-sage-500 hover:border-sage-600"
            >
              <Heart className="w-5 h-5 mr-2" />
              {guestName ? `Buka Undangan Kami` : `Lihat Undangan`}
            </Button>
          </motion.div>

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: guestName ? 2.8 : 2 }}
          >
            <p className="text-sage-500 text-sm leading-relaxed">
              {guestName
                ? `Terima kasih ${guestName.split(" ")[0]}, kehadiran Anda sangat berarti bagi kami ❤️`
                : "Ketuk tombol di atas untuk membuka undangan"}
            </p>
          </motion.div>
        </motion.div>


      </div>

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((h, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: h.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: h.delay,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-4 h-4 text-sage-300 fill-current" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
