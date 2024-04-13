import React from 'react'
import { Navigate, Redirect } from "react-router-dom";
import {useOktaAuth} from '@okta/okta-react';
import Spinner from '../utils/Spinner';
import OktaSigninWidget from './OktaSigninWidget';


const LoginWidget = ({config}) => {
    const {oktaAuth, authState} =useOktaAuth();
    const onSuccess=(tokens)=>{
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError=(err)=>{
        console.log('sign in error', err);
    }
    if (!authState) {
        return(
            <Spinner />
        )
        
    }

    return authState.isAuthenticated ? <Navigate  to={{pathname: '/'}}/> : <OktaSigninWidget config={config} onSuccess={onSuccess} onError={onError} />;

};
export default LoginWidget