import { useSearchParams } from 'react-router'
import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function MenuList({ items }) {
 const { addToCart } = useCart()
 const { user } = useAuth()
 const [savedCategory, setSavedCategory] = useLocalStorage('ce-category-' + (user ? user.uid : 'guest'), 'All')
 const [searchParams, setSearchParams] = useSearchParams()
 const categories = ['All', ...new Set(items.map((item) => item.category))]
 // URL first, then the signed-in user's saved choice; guests start on "All"
 const wanted = searchParams.get('cat') ?? (user ? savedCategory : 'All')
 const selectedCategory = categories.includes(wanted) ? wanted : 'All'

 function setSelectedCategory(category) {
  if (user) setSavedCategory(category)
  setSearchParams(category === 'All' ? {} : { cat: category })
 }

 const visibleItems = items.filter((item) =>
  selectedCategory === 'All' || item.category === selectedCategory
 )

 if (items.length === 0) {
 return <p className="muted">No items on this menu yet.</p>
 }

 return (
 <>
 <div className="category-filter">
 {categories.map((category) => (
 <button
 type="button"
 key={category}
 className={selectedCategory === category ? 'filter-btn active' : 'filter-btn'}
 onClick={() => setSelectedCategory(category)}
 >
 {category}
 </button>
 ))}
 </div>

 <div className="grid">
 {visibleItems.map((item) => (
 <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
 ))}
 </div>
 </>
 )
}

export default MenuList