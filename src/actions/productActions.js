import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types"

export const fetchProducts = () => async (dispatch) => {
    const result = await fetch('/api/products')
    const data = await result.json()
    console.log('Action data: ', data)
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    })
}

const sortProduct = (sort, prodList) => {
    const items = prodList.slice().sort((a, b) => (
    sort === 'lowest' ? ((a.price > b.price) ? 1 : -1) :
    sort === 'highest' ? ((a.price < b.price) ? 1 : -1) :
    ((a._id > b._id) ? 1 : -1)
    ))
    console.log('Sorted items: ', items)
    return items
}

export const filterProducts = (products, size, sort) => (dispatch) => {
    console.log('Action Filter:', products, size)
    const items = size === 'ALL' ? products : 
            products.filter(item => item.availableSizes.indexOf(size) >= 0)
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items: sortProduct(sort, items)
        }
    })
}

export const sortProducts = (prodList, sort) => (dispatch) => {
    console.log('Action Sort:', prodList, sort)
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortProduct(sort, prodList)
        }
    })
}

