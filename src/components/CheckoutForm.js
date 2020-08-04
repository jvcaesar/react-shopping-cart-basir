import React, { useState, useEffect } from 'react'

const CheckoutForm = (props) => {
    const cartItems = props.cartItems
    const [formInput, setForm] = useState({
        name: '',
        email: '',
        address: ''
    })

    useEffect(() => {
        console.log('State FormInput: ', formInput)
    }, [formInput])


    const createOrder = event => {
        event.preventDefault()
        const order = {
            formInputs: formInput,
            cartItems
        }
        console.log('Creating order for: ', order)
        props.createOrder(order)
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
    )
}

export default CheckoutForm