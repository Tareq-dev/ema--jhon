import React from 'react';
import { Route, Navigate } from 'react-router';
import {useContext} from 'react';
import {UserContext} from '../../App'

const PrivateRoute = ({children, ...rest}) => {

     const [ loggedInUser,setLoggedInUser ] =useContext(UserContext)

     return (
          <Route
          {...rest}
          render={({ location }) =>
            loggedInUser.email ? (
              children
            ) : (
              <Navigate
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
          }
        />
     );
};

export default PrivateRoute;