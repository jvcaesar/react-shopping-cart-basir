import { CREATE_ORDER, CLEAR_ORDER, FETCH_ORDERS } from '../types'

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            console.log('action load: ', action.payload)
            return { order: action.payload }
        case CLEAR_ORDER:
            return { order: null }
        case FETCH_ORDERS:
            console.log('Done fetching')
            return { 
                orders: action.payload,
                fetched: true 
            }
        default:
            return state
        }
    }
