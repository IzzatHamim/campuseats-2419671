import { useSearchParams } from 'react-router'
import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'

function MenuList({ items }) {
 const { addToCart } = useCart()
 const [searchParams, setSearchParams] = useSearchParams()
 const selectedCategory = searchParams.get('cat') ?? 'All'

 function setSelectedCategory(category) {
  setSearchParams(category === 'All' ? {} : { cat: category })
 }

 const categories = ['All', ...new Set(items.map((item) => item.category))]

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