"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.push("/admin/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Mengalihkan ke dashboard admin...</p>
    </div>
  )
}
