import {useState} from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import Shipment from './Components/Shipment/Shipment';
import Login from './Components/Login/Login';
import Review from './Components/Review/Review';
import {createContext} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Inventory from './Components/Inventory/Inventory';

export const UserContext = createContext();



function App(props) {

  const [loggedInUser,setLoggedInUser] = useState({});

  return (


      <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
    <h2>email:  { loggedInUser.email }</h2>
      <Header />
      <Router>
      <Routes>
      <Route path="/shop" element={ <Shop />}/>
      <Route path="/order-review" element={<Review />}/>
      <Route path="/login" element={<Private />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/Inventory" element={<Inventory />}/>
      </Routes>
      </Router>
     
      </UserContext.Provider>
  );
}
const Private = () => <div>{<Login/>}</div>;
export default App;
