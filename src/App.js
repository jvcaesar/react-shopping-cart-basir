import React from 'react';
//import data from './data.json'

import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen"
import AdminScreen from "./screens/AdminScreen"

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="grid-container">
          <header className="App-header">
            <Link to='/'>React Shopping Cart</Link>
            <Link to='/admin'>Admin</Link>
          </header>
          <main>
            <Route path="/admin" component={AdminScreen} />
            <Route path="/" component={HomeScreen} exact />
          </main>
          <footer>
            All rights reserved ©Caesar Inc.
          </footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
