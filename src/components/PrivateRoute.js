import React from 'react';
import {
    Redirect
} from 'react-router-dom';

function PrivateRoute( {isAuthenticated, children}){
    if ( !isAuthenticated ){
        console.log( "NOT LOGGED IN");
        return <Redirect to="/home" />;
    }
    console.log( "logged in");
    return( {...children} );
}
export default PrivateRoute
