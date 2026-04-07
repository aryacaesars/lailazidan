import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore"
import { db, hasFirebaseConfig } from "@/lib/firebase"

const RSVP_COLLECTION = "rsvps"

export async function createRsvp(payload) {
  if (!hasFirebaseConfig || !db) {
    throw new Error("Firebase belum dikonfigurasi. Lengkapi ENV Firebase terlebih dahulu.")
  }

  const allowedAttendance = ["hadir", "tidak-hadir"]
  if (!allowedAttendance.includes(payload.attendance)) {
    throw new Error("Status kehadiran harus dipilih: hadir atau tidak-hadir.")
  }

  const rsvpData = {
    name: payload.name || "",
    attendance: payload.attendance,
    guests: Number(payload.guests || 1),
    message: payload.message || "",
    createdAt: serverTimestamp(),
  }

  const docRef = await addDoc(collection(db, RSVP_COLLECTION), rsvpData)
  return docRef.id
}

export async function getRsvps() {
  if (!hasFirebaseConfig || !db) {
    throw new Error("Firebase belum dikonfigurasi. Lengkapi ENV Firebase terlebih dahulu.")
  }

  const q = query(collection(db, RSVP_COLLECTION), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}
