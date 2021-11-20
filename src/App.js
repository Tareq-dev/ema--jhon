import React, { createContext, useState } from "react";
import Shop from './Components/Shop/Shop'
import Header from './Components/Header/Header'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import Private from './Components/PrivateC/Private'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import Login from "./Components/Login/Login";
import OrderReview from "./Components/OrderReveiw/OrderReveiw";
import Inventory from "./Components/Inventory/Inventory";
import Shipment from "./Components/Shipment/Shipment";

 export const UserContext = createContext();


function App() {
  const [loggedInUser,setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
    <h2>email: { loggedInUser.email }</h2>
    <Router>
    <Header />
    <Switch>
    <Route path="/order-review">
       <OrderReview />
    </Route>
    <Route path="/inventory">
       <Inventory />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <PrivateRoute path="/shipment">
      <Shipment />
    </PrivateRoute>
    <PrivateRoute path="/protected">
      <Private />
    </PrivateRoute>
    <Route exact path="/shop">
      <Shop />
    </Route>
  </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;







// function App() {

  
//   return (

     
//       <Router>
//      <Header />
//      <Routes>
//      <Route path="/shop" element={<Public />} />
//         <Route path="/private" element={<Private />} />
//         <Route path="/shipment" element={<Shipment />} />
//         <Route path="/Order-review" element={<Review />} />
//         <Route path="/inventory" element={<Inventory />} />
//         <Route path="/login" element={<Login />} />
        
//      </Routes>
//       </Router>
      
//   );
// }
