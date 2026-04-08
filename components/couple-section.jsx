"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import invitationData from "../data/invitation-data.json"

export default function CoupleSection() {
  const { coupleSection } = invitationData
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
          <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-4">{coupleSection.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            {coupleSection.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                <h3 className="font-script text-2xl sm:text-3xl lg:text-4xl text-foreground mb-2">{coupleSection.bride.name}</h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">{coupleSection.bride.role}</p>
                <p className="text-foreground font-medium text-sm sm:text-base">{coupleSection.bride.parents}</p>
                <div className="w-16 mx-auto mt-3 mb-2 border-t border-border" />
                <p className="font-semibold text-foreground text-xs sm:text-sm">{coupleSection.bride.businessName}</p>
                <p className="text-muted-foreground text-xs sm:text-sm">{coupleSection.bride.businessAddress}</p>
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
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                <h3 className="font-script text-2xl sm:text-3xl lg:text-4xl text-foreground mb-2">{coupleSection.groom.name}</h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">{coupleSection.groom.role}</p>
                <p className="text-foreground font-medium text-sm sm:text-base">{coupleSection.groom.parents}</p>
                <div className="w-16 mx-auto mt-3 mb-2 border-t border-border" />
                <p className="font-semibold text-foreground text-xs sm:text-sm">{coupleSection.groom.businessName}</p>
                <p className="text-muted-foreground text-xs sm:text-sm">{coupleSection.groom.businessAddress}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
