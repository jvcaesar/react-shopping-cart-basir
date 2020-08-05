import React, { useState, useEffect, useRef, Fragment } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import Modal from './Modal'
import Zoom from 'react-reveal/Zoom'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/productActions'

let counter = 0

const Products = (props) => {
    const products = props.products
    const addToCart = props.addToCart
    const fetchProducts = props.fetchProducts
    const [product, setProduct] = useState(null)

    const modalRef = useRef()
    
    useEffect(() => {
        console.log('inside useEffect')
        fetchProducts()
    }, [])

    const openModal = product => {
        setProduct(product)
        console.log('Open modal: ', modalRef)
        // For some reason the first time it is undefined, so skipping the first one
        if (counter === 0){
            counter++
        } else {
            modalRef.current.openModal()
        }
    }

    const closeModal = () => {
        console.log('Close modal: ', modalRef)
        modalRef.current.closeModal()
        setProduct({ product:null })
    }

    const SizeList = allSizes => {
        const sizes = allSizes.sizes
        return (
            <Fragment>Available sizes: {' '}
                {sizes.map(size => (<span key={size}>{' '}<button className='sizeButton'>{size}</button></span>))}
            </Fragment>
        )
    }

    return (
        <div>
            <Fade bottom cascade>
                {!products ? ( <div> Loading ... </div>) : (
                <ul className='products'>
                    {/* the first time product is null, so map will fail. Fixing this... */}
                    {products.map(product => (
                        <li key={product._id}>
                            <div className='product'>
                                <a href={'#' + product._id} onClick={() => openModal(product)}>
                                    <img src={product.image} alt={product.title}></img>
                                    <p className='sizes'><SizeList sizes={product.availableSizes} /></p>
                                    <p className='product-title'>{product.title}</p>
                                </a>
                                <div className='product-price'>
                                    <div>{formatCurrency(product.price)}</div>
                                    <button onClick={() => addToCart(product)} className='button primary'>Add to Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                )}
            </Fade>
            {product ? (
                 
                <Modal ref={modalRef}>
                    <Zoom>
                        <button className='close-modal' onClick={closeModal}>X</button>
                        <div className='product-details'>
                            <img src={product.image} alt={product.title}></img>
                            <div className='product-description'>
                                <h2><strong>{product.title}</strong></h2>
                                <p>{product.description}</p>
                                <SizeList sizes={product.availableSizes} />
                                <div className='product-price'>
                                    <div>{formatCurrency(product.price)}</div>
                                    <button className='button primary' 
                                        onClick={() => {
                                            addToCart(product)
                                            closeModal()
                                        }}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </Zoom>
                </Modal>
            ) : null}
        </div>
    )

}

// connect products component to the products store
// connect(parameter1, parameter2) and returns another fuction whih also accepts a parameter i.e. name of component we're going to connect
// parameter1 = function that accepts state and returns an object that defines which part of redux state were using
// parameter2 = list of actions inside an object
export default connect((state) => ({ products: state.products.items }), { fetchProducts, })(Products)
