import React from 'react'
import {useEffect, useRef} from 'react'
import OktaSignIn from '@okta/okta-signin-widget';
import { octaConfig } from '../lib/octaConfig';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';


const OktaSigninWidget = ({onSuccess,  onError}) => {
    const signInWidget = useRef();
    useEffect(()=> {
        if(!signInWidget.current){return false;}

        const widget= new OktaSignIn(octaConfig);
        widget.showSignInToGetTokens({
            el: signInWidget.current,
        }).then(onSuccess).catch(onError);
        
        return () => widget.remove(); //clean up when component unmounts
    },[onSuccess, onError])
  return (
    <div className='container mb-5'>
        <div ref={signInWidget}></div>
        </div>
  )
}

export default OktaSigninWidget