import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'

function App() {
 const [vendors, setVendors] = useState([])
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)
 const [reloadKey, setReloadKey] = useState(0)
 const [selectedVendorId, setSelectedVendorId] = useState(null)
 const [cart, setCart] = useState([])
 const [view, setView] = useState('menu')
 const [lastOrder, setLastOrder] = useState(null)

 useEffect(() => {
  const controller = new AbortController()
  setLoading(true)
  setError(null)

  fetch('/api/vendors.json', { signal: controller.signal })
   .then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
   })
   .then((data) => {
    setVendors(data)
    setSelectedVendorId((current) => current ?? data[0]?.id ?? null)
   })
   .catch((err) => {
    if (err.name !== 'AbortError') setError(err.message)
   })
   .finally(() => {
    if (!controller.signal.aborted) setLoading(false)
   })

  return () => controller.abort()
 }, [reloadKey])

 const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

 function handleAddToCart(item) {
  setCart((prev) => {
   const existing = prev.find((line) => line.item.id === item.id)

   if (existing) {
    return prev.map((line) =>
     line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
    )
   }

   return [...prev, { item, qty: 1 }]
  })
 }

 function handleChangeQty(itemId, delta) {
  setCart((prev) =>
   prev
    .map((line) =>
     line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
    )
    .filter((line) => line.qty > 0)
  )
 }

 function handleRemove(itemId) {
  setCart((prev) =>
   prev.filter((line) => line.item.id !== itemId)
  )
 }
function handlePlaceOrder(details) {
 const total = 0 // TODO: same reduce as CartPage
 setLastOrder({ ...details, total })
 setCart([])
 setView('done')
}

 const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

 return (
 <>
 <Header cartCount={cartCount} />
 <main className="container">
 {loading ? (
  <p className="muted">Loading menus...</p>
 ) : error ? (
  <div className="card error">
   <p>Could not load menus: {error}</p>
   <button className="btn" onClick={() => setReloadKey((k) => k + 1)}>
    Try again
   </button>
  </div>
 ) : (
 <>
 <section>
 <h2 className="section-title">Choose a vendor</h2>
 <div className="vendor-grid">
 {vendors.map((vendor) => (
 <VendorCard
 key={vendor.id}
 vendor={vendor}
 isSelected={vendor.id === selectedVendorId}
 onSelect={setSelectedVendorId}
 />
 ))}
 </div>
 </section>
 {selectedVendor && (
 <section>
 <h2 className="section-title">Menu: {selectedVendor.name}</h2>
  <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
 </section>
 )}
 </>
 )}
 </main>
 <Footer />
 </>
 )
}
export default App