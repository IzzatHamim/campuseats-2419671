import { collection, doc, onSnapshot, query, where, writeBatch } from 'firebase/firestore'
import { db } from '../firebase.js'

// Every subscribe function returns an unsubscribe function for useEffect cleanup.
export function subscribeToVendors(onData, onError) {
 return onSnapshot(
  collection(db, 'vendors'),
  (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))),
  onError,
 )
}

export function subscribeToVendor(vendorId, onData, onError) {
 return onSnapshot(
  doc(db, 'vendors', vendorId),
  (snap) => onData(snap.exists() ? { id: snap.id, ...snap.data() } : null),
  onError,
 )
}

// Menus are a subcollection: vendors/{vendorId}/menu/{itemId}
// A category other than 'All' is filtered in the query itself.
export function subscribeToMenu(vendorId, onData, onError, category = 'All') {
 const menuRef = collection(db, 'vendors', vendorId, 'menu')
 const q = category === 'All' ? menuRef : query(menuRef, where('category', '==', category))
 return onSnapshot(
  q,
  (snapshot) => onData(snapshot.docs.map((d) => ({ id: d.id, vendorId, ...d.data() }))),
  onError,
 )
}

// One-off: copy public/api/vendors.json into Firestore. A batch writes all or nothing.
export async function seedDemoData(vendors) {
 const batch = writeBatch(db)
 for (const { menu, id, ...vendor } of vendors) {
  batch.set(doc(db, 'vendors', id), vendor)
  for (const { id: itemId, ...item } of menu) {
   batch.set(doc(db, 'vendors', id, 'menu', itemId), item)
  }
 }
 await batch.commit()
}
