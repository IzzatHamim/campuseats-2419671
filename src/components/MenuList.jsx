import { useState } from 'react'
import MenuItemCard from './MenuItemCard.jsx'

function MenuList({ items, onAdd }) {
 const [selectedCategory, setSelectedCategory] = useState('All')

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
 <MenuItemCard key={item.id} item={item} onAdd={onAdd} />
 ))}
 </div>
 </>
 )
}

export default MenuList