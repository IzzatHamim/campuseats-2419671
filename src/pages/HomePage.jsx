import VendorCard from '../components/VendorCard.jsx'
import { useVendors } from '../hooks/useVendors.js'

function HomePage() {
 const { vendors, loading, error, reload } = useVendors()

 if (loading) return <p className="muted">Loading menus...</p>

 if (error) {
  return (
   <div className="card error">
    <p>Could not load menus: {error}</p>
    <button className="btn" onClick={reload}>
     Try again
    </button>
   </div>
  )
 }

 return (
  <section>
   <h2 className="section-title">Choose a vendor</h2>
   <div className="vendor-grid">
    {vendors.map((vendor) => (
     <VendorCard key={vendor.id} vendor={vendor} />
    ))}
   </div>
  </section>
 )
}

export default HomePage
