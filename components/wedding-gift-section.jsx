"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import invitationData from "../data/invitation-data.json"

export default function WeddingGiftSection() {
  const { weddingGiftSection } = invitationData
  const [copiedKey, setCopiedKey] = useState(null)

  const copyNumber = async (bankId, number) => {
    try {
      await navigator.clipboard.writeText(number.replace(/\s/g, ""))
      setCopiedKey(bankId)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch {
      // ignore
    }
  }

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
          <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-4">
            {weddingGiftSection.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            {weddingGiftSection.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {weddingGiftSection.accounts.map((acc, index) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg h-full">
                <CardContent className="p-6 sm:p-8 flex flex-col gap-4 text-center">
                  <h3 className="font-serif text-lg sm:text-xl text-foreground font-semibold">{acc.bank}</h3>
                  <p className="font-mono text-sm sm:text-base text-foreground tracking-wide break-all">
                    {acc.number}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {weddingGiftSection.accountHolderLabel} {weddingGiftSection.accountHolder}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-auto mx-auto"
                    onClick={() => copyNumber(acc.id, acc.number)}
                  >
                    {copiedKey === acc.id ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Salin rekening
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
