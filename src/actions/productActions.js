import { FETCH_PRODUCTS } from "../types"

export const fetchProducts = () => async (dispatch) => {
    const result = await fetch('/api/products')
    const data = await result.json()
    console.log('Action data: ', data)
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    })
}