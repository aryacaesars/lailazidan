"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)
  const hasTriedAutoplayRef = useRef(false)

  const attemptPlay = useCallback(async () => {
    if (!audioRef.current) return

    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch {
      // Browsers may block autoplay until user interaction.
      setIsPlaying(false)
    }
  }, [])

  useEffect(() => {
    if (hasTriedAutoplayRef.current) return
    hasTriedAutoplayRef.current = true
    attemptPlay()
  }, [attemptPlay])

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        attemptPlay()
      }
      window.removeEventListener("pointerdown", handleFirstInteraction)
    }

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true })
    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction)
    }
  }, [attemptPlay, isPlaying])

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
      className="mobile-fixed-boundary fixed bottom-28 z-50 flex justify-end px-3"
    >
      <div className="w-fit bg-card/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-border">
        <div className="flex items-center gap-2">
          <Button
            onClick={togglePlay}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-10 h-10 p-0"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          <Button
            onClick={toggleMute}
            size="sm"
            variant="ghost"
            className="text-primary hover:text-primary/80 rounded-full w-8 h-8 p-0"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} autoPlay loop onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}>
        <source src="/music/music.m4a" type="audio/mp4" />
      </audio>
    </motion.div>
  )
}
