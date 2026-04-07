"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import HeroSection from "./hero-section"
import CoupleSection from "./couple-section"
import EventDetails from "./event-details"
import RSVPSection from "./rsvp-section"
import FloralDivider from "./floral-divider"
import CoverPage from "./cover-page"
import MusicPlayer from "./music-player"
import BottomNavbar from "./bottom-navbar"
import AdminPanel from "./admin-panel"

export default function WeddingInvitation() {
  const [showCover, setShowCover] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [guestName, setGuestName] = useState("")
  
  useEffect(() => {
    // Get guest name from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const guest = urlParams.get("guest")

    if (guest) {
      setGuestName(decodeURIComponent(guest))
    }
  }, [])
  
  // Setup intersection observer for section detection
  useEffect(() => {
    if (showCover) return // Don't observe if cover is still showing
    
    const sections = ["home", "couple", "events", "rsvp"]
    const sectionElements = sections.map(id => document.getElementById(id))
    
    const options = {
      root: null, // viewport
      rootMargin: "0px 0px -50% 0px", // Consider section in view when it's in the top half of viewport
      threshold: 0.1 // 10% of the section must be visible
    }
    
    const handleIntersect = (entries) => {
      // Find the section that is most visible (highest intersection ratio)
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        const mostVisibleEntry = visibleEntries.reduce((prev, current) => {
          return prev.intersectionRatio > current.intersectionRatio ? prev : current;
        });
        
        setActiveSection(mostVisibleEntry.target.id);
      }
    }
    
    const observer = new IntersectionObserver(handleIntersect, options)
    
    sectionElements.forEach(element => {
      if (element) observer.observe(element)
    })
    
    return () => {
      if (observer) {
        sectionElements.forEach(element => {
          if (element) observer.unobserve(element)
        })
      }
    }
  }, [showCover])

  const handleOpenInvitation = () => {
    setShowCover(false)
    setActiveSection("home")
  }

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    
    const element = document.getElementById(sectionId)
    if (element) {
      // Use setTimeout to avoid conflicting with the intersection observer
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" })
      }, 10)
    }
  }

  const renderContent = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col min-h-[calc(100vh-64px)] w-full" // 64px = navbar height
      >
        <div className="flex-1 w-full">
          <div id="home" className="w-full">
            <HeroSection />
          </div>
          <FloralDivider />
          <div id="couple" className="w-full">
            <CoupleSection />
          </div>
          <FloralDivider />
          <div id="events" className="w-full">
            <EventDetails />
          </div>
          <FloralDivider />
          <div id="rsvp" className="w-full">
            <RSVPSection guestName={guestName} />
          </div>
        </div>
        {/* Bottom padding for navbar, if needed */}
        <div className="h-12 sm:h-16" />
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-cream-50 to-sage-50 overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 ornament opacity-30 pointer-events-none" />

      {showCover ? (
        <CoverPage onOpenInvitation={handleOpenInvitation} guestName={guestName} />
      ) : (
        <>
          <div className="flex-1 flex flex-col">
            {renderContent()}
          </div>
          <BottomNavbar activeSection={activeSection} onSectionChange={scrollToSection} />
          <MusicPlayer />
        </>
      )}
    </div>
  )
}
