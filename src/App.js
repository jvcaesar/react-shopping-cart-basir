// Feature 1
import React from 'react';
import data from './data.json'
import Products from './components/Products'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    }
  }
  render() {
    return (
      <div className="grid-container">
        <header className="App-header">
          <a href='/'>React Shopping Cart</a>
        </header>
        <main>
          <div className='content'>
            {/* <-- Column One for Product list --> */}
            <div className='main'>
              <Products products={this.state.products}></Products>
            </div>
            {/* <-- Column Two for Cart items --> */}
            <div className='sidebar'>
              Cart Items
            </div>
          </div>
        </main>
        <footer>
          All rights reserved ©Caesar Inc.
        </footer>
      </div>
    );
  }
}

export default App;
