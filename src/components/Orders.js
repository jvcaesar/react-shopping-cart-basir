import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../actions/orderActions";
import formatCurrency from "../util";

const Orders = (props) => {
    let fetching = true

    const fetchOrders = props.fetchOrders
    const orders = props.orders
    const fetched = props.fetched               // checking to see if fetching action is completed

    useEffect(() => {
        const callFetchOrders = async () => {
            await fetchOrders()
        }
        callFetchOrders()
    }, [])
    
    if (fetched)
        fetching = false

    if (fetching) {
        return <h2>Loading ...</h2>
    } else if (!orders) {
        return <h2>No orders placed yet!</h2>
    }
    const hlist = ['ID', 'DATE', 'TOTAL', 'NAME', 'EMAIL', 'ADDRESS', 'ITEMS']
    return (
        <div className='orders'>
            <h2>Orders</h2>
            <table>
                <TableHeaders hlist={hlist} />
                <tbody>
                    {orders.map((order) => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt}</td>
                        <td> {formatCurrency(order.total)}</td>
                        <td>{order.name}</td>
                        <td>{order.email}</td>
                        <td>{order.address}</td>
                        <td>
                        {order.cartItems.map((item) => (
                            <div key={item._id}>
                            {item.count} {" x "} {item.title}
                            </div>
                        ))}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const TableHeaders = ({ hlist }) => {
    return (
        <thead><tr>
            {hlist.map(item => <th key={item}>{item}</th>)}
        </tr></thead>
    )
}
export default connect(
    (state) => ({ orders: state.order.orders, fetched: state.order.fetched, }), 
                { fetchOrders,  })(Orders)