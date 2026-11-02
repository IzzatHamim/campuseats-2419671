import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
 const { orders } = useCart()

 if (orders.length === 0) {
  return <p className="muted">No orders yet.</p>
 }

 return (
  <section>
   <h2 className="section-title">Your orders</h2>
   {orders.map((order) => (
    <div className="card" key={order.id}>
     <p>{order.name} &middot; {order.mahallah} &middot; {order.pickupTime}</p>
     <ul>
      {order.items.map((line) => (
       <li key={line.item.id}>{line.qty} x {line.item.name}</li>
      ))}
     </ul>
     <p className="cart-total">Total: RM {order.total.toFixed(2)}</p>
    </div>
   ))}
  </section>
 )
}

export default OrdersPage
