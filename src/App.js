// Feature 1
import React, { useState } from 'react';
import data from './data.json'
import Products from './components/Products'
import Filter from './components/Filter';
import Cart from './components/Cart'

const App = () => {
  const [shoppingList, setShoppingList] = useState({
    products:   data.products,
    cartItems:  [],
    size:       'ALL',
    sort:       ''
  })
  let newProducts               = ''
  let newObj                    = ''

  const addToCart = product => {
    console.log('AddToCart product: ', product)
    const cartItems = shoppingList.cartItems.slice()
    let inCart = false
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++
        inCart = true
      }
    })
    if (!inCart) {
      cartItems.push({ ...product, count: 1 })
      console.log('First time Cart item: ', cartItems)
    }
    console.log('Cart items: ', cartItems)
    setShoppingList({
      ...shoppingList,
      cartItems
    })
  }

  const removeFromCart = product => {
    console.log('Remove from cart: ', product)
    const cartItems = shoppingList.cartItems.slice()
    setShoppingList({
      ...shoppingList,
      cartItems: cartItems.filter(item => item._id !== product._id)
    })
    console.log('Cart items after removal: ', shoppingList.cartItems)
  }

  // Sort products
  const sortProduct = (sort, prodList) => {
    console.log('sorter: ', sort, prodList)
    return prodList.slice().sort((a, b) => (
      sort === 'lowest' ? ((a.price > b.price) ? 1 : -1) :
      sort === 'highest' ? ((a.price < b.price) ? 1 : -1) :
      ((a._id > b._id) ? 1 : -1)
    ))
  }

  // Filter the products by size
  const filterProducts = (event) => {
    const size = event.target.value
    console.log('event filterProducts by: ', size)
     if (size === 'ALL') {
       newProducts = data.products
     } else {
      newProducts = data.products.filter(product => product.availableSizes.indexOf(size) >= 0)
     }
     newProducts = sortProduct(shoppingList.sort, newProducts)
     newObj = {
      ...shoppingList,
      size,
      products:   newProducts
    }
    console.log('filtered Products: ', newProducts, newObj)
    setShoppingList(newObj)
  }

  // Sort the products handler on change event
  const sortProducts = (event) => {
    const sort = event.target.value
    console.log('event sortProducts by: ', sort)
    newProducts = shoppingList.products.slice().sort((a, b) => (
      sort === 'lowest' ? ((a.price > b.price) ? 1 : -1) :
      sort === 'highest' ? ((a.price < b.price) ? 1 : -1) :
      ((a._id > b._id) ? 1 : -1)
    ))
    newObj = {
      ...shoppingList,
      sort,
      products:   newProducts
    }
    console.log('Sorted Products: ', newProducts, newObj)
    setShoppingList(newObj)
  }

  return (
    <div className="grid-container">
      <header className="App-header">
        <a href='/'>React Shopping Cart</a>
      </header>
      <main>
        <div className='content'>
          {/* <-- Column One for Product list --> */}
          <div className='main'>
            <Filter count={shoppingList.products.length} size={shoppingList.size} sort={shoppingList.sort}
                filterProducts={filterProducts} sortProducts={sortProducts} />
            <Products products={shoppingList.products} addToCart={addToCart} />
          </div>
          {/* <-- Column Two for Cart items --> */}
          <div className='sidebar'>
            <Cart cartItems={shoppingList.cartItems} removeFromCart={removeFromCart}/>
          </div>
        </div>
      </main>
      <footer>
        All rights reserved ©Caesar Inc.
      </footer>
    </div>
  );
}

export default App;
