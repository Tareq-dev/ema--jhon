import React from 'react';
import './Product.css';

const Product = (props) => {
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className="product">
            <div>
            <img src={img} alt="" />
            </div>
            <div>
            <h4 className="product-name">{name}</h4>
            <p><small>by: {seller}</small></p>
            <p><small>$ {price}</small></p>
            <p><small>Only {stock} left in stock - Order soon</small></p>
            <button
             className="main-button" 
             onClick = {() =>props.handleAddProduct(props.product)}
             ><i class="fas fa-shopping-cart"></i> add to cart</button>
            </div>
        </div>
    );
};

export default Product;