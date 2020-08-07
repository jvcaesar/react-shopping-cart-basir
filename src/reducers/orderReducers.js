import { CREATE_ORDER, CLEAR_ORDER, CLEAR_CART } from '../types'

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            console.log('action load: ', action.payload)
            return { order: action.payload }
        case CLEAR_ORDER:
            return { order: null }
/*         case CLEAR_CART:
            return { cartItems: null } */
        default:
            return state
        }
    }
