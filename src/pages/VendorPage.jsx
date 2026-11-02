import { useParams } from 'react-router'
import MenuList from '../components/MenuList.jsx'
import { useVendors } from '../hooks/useVendors.js'

function VendorPage() {
 const { id } = useParams()
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

 const vendor = vendors.find((v) => v.id === id)

 if (!vendor) return <p className="muted">Vendor not found</p>

 return (
  <section>
   <h2 className="section-title">Menu: {vendor.name}</h2>
   <MenuList items={vendor.menu} />
  </section>
 )
}

export default VendorPage
