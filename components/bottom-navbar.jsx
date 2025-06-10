"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Home, Users, Heart, MessageCircle, Settings, Calendar } from "lucide-react"

export default function BottomNavbar({ activeSection, onSectionChange }) {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [userClicked, setUserClicked] = useState(false)

  const navItems = [
    { id: "home", icon: Home, label: "Beranda", color: "text-sage-600" },
    { id: "couple", icon: Heart, label: "Mempelai", color: "text-rose-500" },
    { id: "events", icon: Calendar, label: "Acara", color: "text-amber-600" },
    { id: "gallery", icon: Users, label: "Galeri", color: "text-purple-600" },
    { id: "rsvp", icon: MessageCircle, label: "RSVP", color: "text-blue-600" },
  ]

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
    >
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-sage-100 mx-auto max-w-md">
        <div className="flex items-center justify-around py-3 px-2">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            const isHovered = hoveredItem === item.id

            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  setUserClicked(true);
                  onSectionChange(item.id);
                  // Reset after a short delay to allow for intersection observer updates
                  setTimeout(() => setUserClicked(false), 1000);
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                {/* Active Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-sage-100 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Hover Background */}
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-sage-50 rounded-xl"
                  />
                )}

                {/* Icon */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    rotate: isActive ? [0, -10, 10, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${isActive ? item.color : "text-gray-400"}`}
                  />
                </motion.div>

                {/* Label */}
                <motion.span
                  className={`text-xs font-medium mt-1 transition-colors duration-300 relative z-10 ${
                    isActive ? "text-sage-700" : "text-gray-500"
                  }`}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                  }}
                >
                  {item.label}
                </motion.span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 w-2 h-2 bg-sage-500 rounded-full"
                  />
                )}

                {/* Ripple Effect */}
                {isHovered && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    className="absolute inset-0 bg-sage-200 rounded-full"
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Bottom Indicator Line */}
        <motion.div
          className="h-1 bg-gradient-to-r from-sage-400 to-cream-400 rounded-b-2xl"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  )
}
