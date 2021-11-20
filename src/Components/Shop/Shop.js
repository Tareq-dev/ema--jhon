import React from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link ,useHistory, useLocation  } from 'react-router-dom';


const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] =useState([]);
    
const handleAddProduct =(product) =>{
    const newCart = [...cart, product];
    setCart(newCart);
    }
    const history = useHistory();
   
    const handlePlaceOrder = () => {
      history.push("/shipment")
      };
    

return (
    <div className="shop-container">
    <div className ="product-container">
    
    {
        products.map(pd => <Product key={pd.key}
             handleAddProduct = {handleAddProduct}
              product={pd}
              ></Product>)
    }
        
    </div>
        <div className="cart-container">
        <Cart cart={cart}>
        </Cart>
        <button onClick={handlePlaceOrder}>Review Items</button>
      </div>
    </div>
    );
};

export default Shop;