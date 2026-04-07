import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, writeBatch } from "firebase/firestore"
import { db, hasFirebaseConfig } from "@/lib/firebase"

const GUEST_COLLECTION = "guests"

export async function createGuestNames(names = []) {
  if (!hasFirebaseConfig || !db) {
    return []
  }

  const createdIds = []
  for (const name of names) {
    const docRef = await addDoc(collection(db, GUEST_COLLECTION), {
      name,
      source: "wa-generator",
      createdAt: serverTimestamp(),
    })
    createdIds.push(docRef.id)
  }
  return createdIds
}

export async function getGuestNames() {
  if (!hasFirebaseConfig || !db) {
    return []
  }

  const q = query(collection(db, GUEST_COLLECTION), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export async function updateGuestName(id, name) {
  if (!hasFirebaseConfig || !db) {
    throw new Error("Firebase belum dikonfigurasi. Lengkapi ENV Firebase terlebih dahulu.")
  }
  if (!id) {
    throw new Error("ID tamu tidak valid")
  }

  await updateDoc(doc(db, GUEST_COLLECTION, id), {
    name,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteGuestName(id) {
  if (!hasFirebaseConfig || !db) {
    throw new Error("Firebase belum dikonfigurasi. Lengkapi ENV Firebase terlebih dahulu.")
  }
  if (!id) {
    throw new Error("ID tamu tidak valid")
  }

  await deleteDoc(doc(db, GUEST_COLLECTION, id))
}

export async function deleteGuestNames(ids = []) {
  if (!hasFirebaseConfig || !db) {
    throw new Error("Firebase belum dikonfigurasi. Lengkapi ENV Firebase terlebih dahulu.")
  }

  const validIds = ids.filter(Boolean)
  if (validIds.length === 0) return

  const batch = writeBatch(db)
  validIds.forEach((id) => {
    batch.delete(doc(db, GUEST_COLLECTION, id))
  })
  await batch.commit()
}
