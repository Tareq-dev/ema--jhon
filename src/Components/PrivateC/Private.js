import React from 'react';
import Inventory from '../Inventory/Inventory';
import Login from '../Login/Login';
import OrderReview from '../OrderReveiw/OrderReveiw';
import Shipment from '../Shipment/Shipment';

const Private = () => {
     return (
          <div>
               <Login />
               <Shipment />
               <Inventory />
               <OrderReview />
          </div>
     );
};

export default Private;