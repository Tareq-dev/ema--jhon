import React from 'react';
import useProducts from '../../Hook/UseProducts';
import useCart from '../../Hook/UseCart';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReveiwItem/ReveiwItem';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import { useHistory, useLocation } from 'react-router';

const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    console.log(products);

   

    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);
    }
    let history = useHistory();
    const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };
    const handleProceedToShipping = () => {
        setCart([]);
        clearTheCart();
        history.replace(from);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem
                        key={product.key}
                        product={product}
                        handleRemove={handleRemove}
                    ></ReviewItem>)
                }
                <h1> Iam Order OrderReview</h1>
            </div>
            
            <div className="cart-container">
                <Cart cart={cart}>
                </Cart>
                <button onClick={handleProceedToShipping} className="btn-regular">Proceed to Shipping</button>
            </div>
        </div>
    );
};

export default OrderReview;