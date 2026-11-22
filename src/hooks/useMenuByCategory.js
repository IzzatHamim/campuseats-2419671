import { useEffect, useState } from 'react'
import { subscribeToMenu } from '../services/vendors.js'

// The menu of one vendor, filtered by a Firestore query. A new category means a new query.
export function useMenuByCategory(vendorId, category) {
 const [menu, setMenu] = useState([])

 useEffect(() => {
  return subscribeToMenu(vendorId, setMenu, () => setMenu([]), category)
 }, [vendorId, category])

 return menu
}
