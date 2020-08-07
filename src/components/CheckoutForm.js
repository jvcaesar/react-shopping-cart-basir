import React, { useState, useEffect, useRef, Fragment } from 'react'
import Fade from 'react-reveal/Fade'
import Modal from './Modal'
import Zoom from 'react-reveal/Zoom'
import { connect } from 'react-redux'
import { createOrder, clearOrder } from '../actions/orderActions'
import formatCurrency from '../util'

const CheckoutForm = (props) => {
    const cartItems = props.cartItems                   // from Cart.js
    let order1 = props.order    
    const order = props.order                        // from connect & orderReducer
    const [formInput, setForm] = useState({
        name: '',
        email: '',
        address: ''
    })

    const modalRef = useRef()

    const closeModal = () => {
        console.log('Close modal: ', modalRef)
        modalRef.current.closeModal()
    }

    useEffect(() => {
        console.log('State FormInput: ', formInput)
    }, [formInput])

    const ShowCreatedOrder = () => {
        return (
            <Fragment>
                {order1 && (           // hack with order1 just to display modal
                    <Modal ref={modalRef}>
                        <Zoom>
                            <button className='close-modal' onClick={closeModal}>X</button>
                            <div className='order-details'>
                                {/* <img src={product.image} alt={product.title}></img> */}
                                <h3 className='success-message'>Your order has been placed</h3>
                                <h2>Order {order._id}</h2>
                                <ul>
                                    <li><div>Name:</div> <div>{order.name}</div></li>
                                    <li><div>Email:</div> <div>{order.email}</div></li>
                                    <li><div>Address:</div> <div>{order.address}</div></li>
                                    <li><div>Date:</div> <div>{order.createdAt}</div></li>
                                    <li><div>Total:</div> <div>{formatCurrency(order.total)}</div></li>
                                    <li>
                                        <div>Cart Items:</div>
                                        <div>
                                            {order.cartItems.map(item => (
                                                <div key={item._id}>{item.count} {' x '} {item.title}</div>
                                             ))}
                                        </div>
                                    </li>
                                </ul>
                            </div>            
                        </Zoom>
                    </Modal>
                )}
            </Fragment>
        )
    }

    const createOrder = event => {
        event.preventDefault()
        const order = {
            name: formInput.name,
            email: formInput.email,
            address: formInput.address,
            total: cartItems.reduce((total, item) => total + item.price * item.count, 0),
            cartItems
        }
        console.log('Creating order for: ', order)
        props.createOrder(order)
        console.log('props.order: ', props.order)
        order1 = 1     // added this to trigger the modal as order is showing as undefined, even though it has all the fields.
    }

    const FormLine = ({ label, type, inputHandler }) => {
        const name = label.toLowerCase()
        return (
            <li>
                <label>{label}</label>
                <input name={name} type={type} 
                        value={formInput[name]} required onChange={inputHandler} />
            </li>
        )
    }

    const handleInput = event => {

        setForm({
            ...formInput,
            [event.target.name]: event.target.value
        })
        console.log('Handling the input')
        console.log('target name & value: ', event.target.name, event.target.value)
    }

    return (
        <Fragment>
        <ShowCreatedOrder />
        <Fade right cascade>
        <div className='cart'>
            <form onSubmit={createOrder}>
                <ul className='form-container'>
                    <FormLine label='Email' type='email' inputHandler={handleInput} />
                    <FormLine label='Name' type='text' inputHandler={handleInput} />
                    <FormLine label='Address' type='text' inputHandler={handleInput} />
                    <button className='button primary' type='submit'>Checkout</button>
                </ul>
            </form>
        </div>
        </Fade>
        </Fragment>
    )
}

export default connect(
    (state) => ({ order: state.order.order, }),
        { createOrder, clearOrder })(CheckoutForm)