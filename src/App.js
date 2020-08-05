// Feature 1
import React, { useState, useEffect } from 'react';
import data from './data.json'
import Products from './components/Products'
import Filter from './components/Filter';
import Cart from './components/Cart'
import store from './store'
import { Provider } from 'react-redux'

const App = () => {
  const [shoppingList, setShoppingList] = useState({
    products:   data.products,
    cartItems:  localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    size:       'ALL',
    sort:       ''
  })
  let newProducts               = ''
  let newObj                    = ''

  // Update the state of the shopping cart
  const updateCart = cartItems => {
      setShoppingList({
      ...shoppingList,
      cartItems
    })
    console.log('Updated Cart items to: ', cartItems)
  }

  const addToCart = product => {
    //console.log('AddToCart product: ', product)
    //console.log('start add to shopping cart:', shoppingList)
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
      //console.log('First time Cart item: ', cartItems)
    }
    //console.log('Cart items: ', cartItems)
    updateCart(cartItems)
    // This will not show the updated state of the shopping list
    // It is useless here. It will only be seen in after/in the useEffect
    //console.log('end add to shopping cart:', shoppingList)
  }

  const removeFromCart = product => {
    //console.log('Remove from cart: ', product)
    let cartItems = shoppingList.cartItems.slice()
    cartItems = cartItems.filter(item => item._id !== product._id)
    updateCart(cartItems)
    //console.log('Cart items after removal: ', cartItems)
  }

  // updated shoppingList is only visible after useEffect
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(shoppingList.cartItems))
    console.log('Effect in shopping cart:', shoppingList)
  }, [shoppingList])

  // Sort products
  const sortProduct = (sort, prodList) => {
    console.log('Before sort: ', sort, prodList)
    return prodList.slice().sort((a, b) => (
      sort === 'lowest' ? ((a.price > b.price) ? 1 : -1) :
      sort === 'highest' ? ((a.price < b.price) ? 1 : -1) :
      ((a._id > b._id) ? 1 : -1)
    ))
  }

  // Filter the products by size
  const filterProducts = (event) => {
    const size = event.target.value
    //console.log('event filterProducts by: ', size)
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
    setShoppingList(newObj)
  }

  // Sort the products handler on change event
  const sortProducts = (event) => {
    const sort = event.target.value
    newProducts = sortProduct(sort, shoppingList.products)
    //console.log('After sort: ', newProducts)
    newObj = {
      ...shoppingList,
      sort,
      products:   newProducts
    }
    setShoppingList(newObj)
  }

  const createOrder = order => {
    alert('Need to save order for: ' + order.formInputs.name)
  }

  return (
    <Provider store={store}>
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
              <Cart 
                cartItems={shoppingList.cartItems}
                removeFromCart={removeFromCart}
                createOrder={createOrder} />
            </div>
          </div>
        </main>
        <footer>
          All rights reserved ©Caesar Inc.
        </footer>
      </div>
    </Provider>
  );
}

export default App;
