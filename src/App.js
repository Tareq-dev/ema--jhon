import {useState} from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import Shipment from './Components/Shipment/Shipment';
import Login from './Components/Login/Login';
import Review from './Components/Review/Review';
import {createContext} from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Inventory from './Components/Inventory/Inventory';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export const UserContext = createContext();

function App(props) {

  const [loggedInUser,setLoggedInUser] = useState({});

  return (

      <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
      <h2>email:  { loggedInUser.email }</h2>
      <Router>
      <Header />
      <Routes>
      <Route path="/shop" element={ <Shop />}/>
      <Route path="/shipment" element={<Private />}/>
      <Route path="/intentory" element={<Private />}/>
      <Route path="/order-Review" element={<Private />}/>
      <Route path="/login" element={<Login />}/>
      </Routes>
      </Router>
      </UserContext.Provider>
  );
}
const Private = () => <div>{<PrivateRoute/>}</div>;
export default App;
