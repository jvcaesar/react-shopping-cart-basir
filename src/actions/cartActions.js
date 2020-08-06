import { ADD_TO_CART, REMOVE_FROM_CART } from '../types'

export const addToCart = (newItem) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice()
    console.log('Action Add to Cart:', cartItems, newItem)
    let inCart = false
    cartItems.forEach(item => {
      if (item._id === newItem._id) {
        item.count++
        inCart = true
      }
    })
    if (!inCart) {
      cartItems.push({ ...newItem, count: 1 })
      //console.log('First time Cart item: ', cartItems)
    }
    dispatch({
        type: ADD_TO_CART,
        payload: { cartItems },
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const removeFromCart = (oldItem) => (dispatch, getState) => {
    console.log('Action Remove from Cart:', oldItem)
    let cartItems = getState().cart.cartItems.slice()
    cartItems = cartItems.filter(item => item._id !== oldItem._id)
    dispatch({
        type: REMOVE_FROM_CART,
        payload: { cartItems }
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}