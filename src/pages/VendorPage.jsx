import { Link, useParams, useSearchParams } from 'react-router'
import { useVendor } from '../hooks/useVendor.js'
import { useMenuByCategory } from '../hooks/useMenuByCategory.js'
import { useAuth } from '../hooks/useAuth.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
 const { id } = useParams()
 const { user } = useAuth()
 const [savedCategory, setSavedCategory] = useLocalStorage('ce-category-' + (user ? user.uid : 'guest'), 'All')
 const [searchParams, setSearchParams] = useSearchParams()
 const { vendor, menu, loading, error } = useVendor(id)

 const categories = ['All', ...new Set(menu.map((item) => item.category))]
 // URL first, then the signed-in user's saved choice; guests start on "All"
 const wanted = searchParams.get('cat') ?? (user ? savedCategory : 'All')
 const selectedCategory = categories.includes(wanted) ? wanted : 'All'
 const shownMenu = useMenuByCategory(id, selectedCategory)

 function handleSelectCategory(category) {
  if (user) setSavedCategory(category)
  setSearchParams(category === 'All' ? {} : { cat: category })
 }

 if (loading) return <Loading />
 if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />
 if (!vendor) return <p className="muted">Vendor not found. <Link to="/">Back to vendors</Link></p>

 // Each cart line must know its vendor, so orders can be split per vendor.
 const items = shownMenu.map((item) => ({ ...item, vendorName: vendor.name }))

 return (
  <section>
   <p><Link to="/">&larr; All vendors</Link></p>
   <h2 className="section-title">{vendor.name}</h2>
   <p className="muted">{vendor.location} &middot; {vendor.openHours}</p>
   <MenuList
    items={items}
    categories={categories}
    selectedCategory={selectedCategory}
    onSelectCategory={handleSelectCategory}
   />
  </section>
 )
}

export default VendorPage
