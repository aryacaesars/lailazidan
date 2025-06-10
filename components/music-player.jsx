"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 3 }}
      className="fixed bottom-32 right-6 z-50"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-sage-200">
        <div className="flex items-center gap-2">
          <Button
            onClick={togglePlay}
            size="sm"
            className="bg-sage-600 hover:bg-sage-700 text-white rounded-full w-10 h-10 p-0"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          <Button
            onClick={toggleMute}
            size="sm"
            variant="ghost"
            className="text-sage-600 hover:text-sage-700 rounded-full w-8 h-8 p-0"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Audio element - you can replace with actual audio file */}
      <audio ref={audioRef} loop onEnded={() => setIsPlaying(false)}>
        <source src="/music/music.mp3" type="audio/mpeg" />
        {/* Fallback for browsers that don't support audio */}
      </audio>
    </motion.div>
  )
}
