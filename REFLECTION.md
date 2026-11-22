# Week 1 reflection
1. What is the difference between building a UI imperatively (plain DOM code) and
declaratively (React)?
Imperative code manually updates the DOM step-by-step, while declarative React describes what the UI should look like based on state.


2. Why must a component name start with a capital letter?
React requires capitalized names to differentiate custom React components from standard lowercase HTML elements.


3. What does a fragment <>...</> do, and why not just use a <div>?
Fragments group multiple elements without adding an extra node to the DOM, avoiding broken CSS layouts or clutter.


4. Name one benefit of splitting the UI into small components.
Breaking UI into small components makes code reusable, easier to debug, and simple to maintain.



# Week 6 reflection
1. When I click the Place order button, the handlePlaceOrder function in CartPage.jsx runs. It then calls placeOrders(user, cart, details) from services/orders.js. This function groups the cart items by vendor and saves each order into Firestore using writeBatch. Each order is saved with the status 'Received' and the current server time using serverTimestamp(). After that, clearCart() empties the shopping cart, and navigate('/orders') takes the user to the Orders page. I do not use setOrders because Firestore updates the Orders page automatically through the onSnapshot listener in subscribeToMyOrders. It detects new orders and displays them without me having to update the orders manually.

2. The orders collection is placed at the top level because each order belongs to a student and can contain items from one vendor. This makes it easier to get all orders from a student using their studentUid. Each order also saves a copy of the vendor name, item name and price. This is important because the menu or prices might change later. By saving a copy, the old order will still show the correct items and prices that the student bought. It also means the system does not need to read the menu again.

3. The data is stored in Firestore under this path: vendors/{vendorId}/menu/{itemId}

The field used is category, which stores the food category, such as "Rice" or "Noodles".

The line of code that reads the data is in services/vendors.js: query(menuRef, where('category', '==', category))

This code gets only the menu items that match the selected category. The useMenuByCategory function uses it through subscribeToMenu, while VendorPage gets the selected category from the URL (?cat=) or localStorage. This makes it easier to display food based on the selected category without filtering all the items in the browser.