import { ADD_TO_CART, REMOVE_FROM_CART } from '../types'

export const cartReducer = (
    state = { cartItems: localStorage.getItem('cartItems') ? 
                        JSON.parse(localStorage.getItem('cartItems')) : [] },
    action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return { cartItems: action.payload.cartItems }
        case REMOVE_FROM_CART:
            return { cartItems: action.payload.cartItems }
        default:
            return state
    }
}