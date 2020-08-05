import React, { useState } from 'react'
import formatCurrency from '../util'
import CheckoutForm from './CheckoutForm'
import Fade from 'react-reveal/Fade'

const DisplayTotal = ({ cartItems, createOrder }) => {
    const [showCheckout, setShow] = useState(false)

    return (
        <div>
            <div className='cart'>
                <div className='total'>
                    <div>
                        Total: {'  '}
                        {formatCurrency(cartItems.reduce((total, item) => total + item.price * item.count, 0))}
                    </div>
                    <button onClick={() => setShow(showCheckout => !showCheckout)} className='button primary'>
                        {/* {showCheckout ? 'CheckOut' : 'Proceed'} */}
                        Proceed
                    </button>
                </div>
            </div>
            {showCheckout && <CheckoutForm cartItems={cartItems} createOrder={createOrder} />}
        </div>
    )
}

const DisplayItem = ({ item, removeFromCart }) => {
    return (
        <li key={item._id}>
        <div>
            <img src={item.image} alt={item.title}></img>
        </div>
        <div>
            <div>{item.title}</div>
            <div className='right'>
                {formatCurrency(item.price)} x {item.count}{' '}
                <button className='button' onClick={() => removeFromCart(item)}>
                    Remove
                </button>
            </div>
        </div>
    </li>
    )
}

const DisplayCartItems = ({ cartItems, removeFromCart }) => {
    return (
        <div className='cart'>
            <Fade left cascade>
            <ul className='cart-items'>
                {cartItems.map(item => (
                    <div key={item._id}>
                        <DisplayItem item={item} removeFromCart={removeFromCart} />
                    </div>
                ))}
            </ul>
            </Fade>
        </div>
    )
}

const Cart = ({ cartItems, removeFromCart, createOrder }) => {
    console.log('In the Cart: ', cartItems)
    return (
        <div>
            {cartItems.length === 0 ? ( <div className='cart cart-header'>Cart is Empty.</div> ) : 
            ( <div className='cart cart-header'>
                You have {cartItems.length} products in the cart.{' '}
            </div>
            )}
            <DisplayCartItems cartItems={cartItems} removeFromCart={removeFromCart} />
            {cartItems.length !== 0 && <DisplayTotal cartItems={cartItems} createOrder={createOrder} />}
        </div>
    )
}

export default Cart