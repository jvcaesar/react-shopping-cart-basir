// Feature 1
import React from 'react';
//import data from './data.json'
import Products from './components/Products'
import Filter from './components/Filter';
import Cart from './components/Cart'
import store from './store'
import { Provider } from 'react-redux'

const App = () => {

  // updated shoppingList is only visible after useEffect
/*   useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(shoppingList.cartItems))
    console.log('Effect in shopping cart:', shoppingList)
  }, [shoppingList])
 */
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
              <Filter />
              <Products />
            </div>
            {/* <-- Column Two for Cart items --> */}
            <div className='sidebar'>
              <Cart />
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
