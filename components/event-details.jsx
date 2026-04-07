"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import invitationData from "../data/invitation-data.json"

export default function EventDetails() {
  const { eventSection } = invitationData
  const { events } = eventSection

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
          <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-4">{eventSection.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            {eventSection.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg h-full">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="font-script text-2xl sm:text-3xl text-foreground mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">{event.description}</p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 text-foreground">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">{event.date}</span>
                    </div>

                    <div className="flex items-center gap-3 text-foreground">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">{event.time}</span>
                    </div>

                    <div className="flex items-start gap-3 text-foreground">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">{event.location}</p>
                        <p className="text-muted-foreground text-xs sm:text-sm">{event.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white text-sm sm:text-base"
                      onClick={() => {
                        const mapUrl = event.mapLink || `https://maps.google.com/?q=${encodeURIComponent(event.address)}`
                        window.open(mapUrl, "_blank")
                      }}
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

      </div>
    </section>
  )
}
