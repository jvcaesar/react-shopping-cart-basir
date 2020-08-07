import React from "react";
import Filter from "../components/Filter";
import Products from "../components/Products";
import Cart from "../components/Cart";

const HomeScreen = () => {
    return (
        <div className="content">
            <div className="main">
                <Filter />
                <Products />
            </div>
            <div className="sidebar">
                <Cart />
            </div>
        </div>
    )
}

export default HomeScreen