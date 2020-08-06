import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types";

export const productsReducer = (state = {}, action) => {
    switch (action.type) {
        case FILTER_PRODUCTS_BY_SIZE:
            return {
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items,
                showProducts: action.payload.items
            }
        case ORDER_PRODUCTS_BY_PRICE:
            return {
                ...state,
                sort: action.payload.sort,
                sortedItems: action.payload.items,
                showProducts: action.payload.items
            }
        case FETCH_PRODUCTS:
            return { 
                items: action.payload,              // products fetched from the database
                showProducts: action.payload        // products to be displayed by <Products />
            }
        default:
            return state
    }
}