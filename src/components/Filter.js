import React from 'react'
import { connect } from 'react-redux'
import { filterProducts, sortProducts } from '../actions/productActions'

// const Filter = ({ count, size, sort, filterProducts, sortProducts }) => {
const Filter = (props) => {
    // all these props are coming from state
    const filteredItems = props.filteredProducts        // is undefined until a filter happens
    const sortedItems = props.sortedProducts        // is undefined until a filter happens
    const sort = props.sort
    const size = props.size
    const products = props.products
    const showProducts = props.showProducts
    const sortProducts = props.sortProducts
    const filterProducts = props.filterProducts
    let count = 6
    console.log('Filtered -> ', filteredItems)
    console.log('Sorted -> ', sortedItems)
    console.log('ShowProducts -> ', showProducts)
    
    if (showProducts && showProducts.length)
        count = showProducts.length

    const sorting = (event) => {
        console.log('sorting by:', event.target.value)
        sortProducts(showProducts, event.target.value)
    }

    const filtering = (event) => {
        const filter = event.target.value
        console.log(`filtering by: ${filter} and sorting by: ${sort}`)
        filterProducts(products, filter, sort)
    }

    return  (
        <div className='filter'>
            <div className='filter-result'>{count}  - Products</div>
            <div className='filter-sort'>
                Order {'   - '}
                <select value={sort} onChange={(event) => sorting(event)}>
                    <option value='latest'>Latest</option>
                    <option value='lowest'>Lowest</option>
                    <option value='highest'>Highest</option>
                </select>
            </div>
            <div className='filter-size'>
                Filter {'   - '}
                <select value={size} onChange={(event) => filtering(event)}>
                    <option value='ALL'>ALL</option>
                    <option value='X'>XS</option>
                    <option value='S'>S</option>
                    <option value='M'>M</option>
                    <option value='L'>L</option>
                    <option value='XL'>XL</option>
                    <option value='XXL'>XXL</option>
                </select>
            </div>
        </div>
    )

}

export default connect((state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    showProducts: state.products.showProducts,
    filteredProducts: state.products.filteredItems,
    sortedProducts: state.products.sortedItems
}), { filterProducts, sortProducts })(Filter)