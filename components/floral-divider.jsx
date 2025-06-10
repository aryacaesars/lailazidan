"use client"

import { motion } from "framer-motion"

export default function FloralDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex justify-center py-4 sm:py-6 lg:py-8 px-4"
    >
      <div className="flex items-center gap-2 sm:gap-4 w-full max-w-xs sm:max-w-sm">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-sage-300"></div>
        <svg
          width="32"
          height="32"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-sage-400 flex-shrink-0 sm:w-10 sm:h-10"
        >
          <path
            d="M20 8C16 8 12 12 12 16C12 20 16 24 20 24C24 24 28 20 28 16C28 12 24 8 20 8Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path
            d="M20 16C16 16 12 20 12 24C12 28 16 32 20 32C24 32 28 28 28 24C28 20 24 16 20 16Z"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <circle cx="20" cy="20" r="3" fill="currentColor" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-sage-300"></div>
      </div>
    </motion.div>
  )
}
