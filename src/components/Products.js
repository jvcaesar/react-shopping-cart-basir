import React, { useState, useRef, Fragment } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import Modal from './Modal'
import Zoom from 'react-reveal/Zoom'

let counter = 0

const Products = ({ products, addToCart }) => {
    const [product, setProduct] = useState(null)

    const modalRef = useRef()
    
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
            <ul className='products'>
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
{/*             {product && (
                <Modal isOpen={true} onRequestClose={closeModal}>
                    <Zoom>
                        <button className='close-modal' onClick={closeModal}>X</button>
                        <div>
                            Moooodddddaaaaallllllll
                        </div>
                    </Zoom>
                </Modal>
            )} */}
        </div>
    )

}

export default Products