import React from 'react';
import { Navigate, useLocation  } from 'react-router';
import {useContext} from 'react';
import {UserContext} from '../../App'


const PrivateRoute = () => {
  const [ loggedInUser,setLoggedInUser ] =useContext(UserContext)
  let location = useLocation();
  
  if (!loggedInUser.email) {
    return(
      <div>
      <Navigate to="/login" state={{ from: location }} />
      </div>
    );
  }
  return null;
};

export default PrivateRoute;