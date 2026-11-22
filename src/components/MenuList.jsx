import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'

function MenuList({ items, categories, selectedCategory, onSelectCategory }) {
 const { addToCart } = useCart()

 return (
 <>
 <div className="category-filter">
 {categories.map((category) => (
 <button
 type="button"
 key={category}
 className={selectedCategory === category ? 'filter-btn active' : 'filter-btn'}
 onClick={() => onSelectCategory(category)}
 >
 {category}
 </button>
 ))}
 </div>

 {items.length === 0 ? (
 <p className="muted">No items on this menu yet.</p>
 ) : (
 <div className="grid">
 {items.map((item) => (
 <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
 ))}
 </div>
 )}
 </>
 )
}

export default MenuList
