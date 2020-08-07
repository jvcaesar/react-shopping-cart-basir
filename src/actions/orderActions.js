import { CREATE_ORDER, CLEAR_ORDER, CLEAR_CART } from '../types'


export const createOrder = (order) => (dispatch) => {
    console.log('Action Create Order:', order)
    console.log('Action Create stringify Order:', JSON.stringify(order))
    // Post the order to the api for saving in the backend DB
    fetch('api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
    })
    .then((res) => res.json())              // response from fetch is converted to json
    .then((orderData) => {                  // returned data is orderDat in json format
        console.log('before dispatch, orderData', orderData)
        dispatch({
            type: CREATE_ORDER,
            payload: orderData
        })
        localStorage.clear('cartItems')
        dispatch({ type: CLEAR_CART })
    })
}

export const clearOrder = () => (dispatch) => {
    dispatch({ type: CLEAR_ORDER })
}