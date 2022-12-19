import React, { useEffect } from 'react';

import '../styles/globals.css';  
import '../styles/App.css';
import { checkAndInitializePaymentTypes } from '../services/payment-services';
function MyApp({ Component, pageProps }) {

  useEffect(() => {
     checkForPaymentTypes();
  }, [])
  
  const checkForPaymentTypes = async () => {
    await checkAndInitializePaymentTypes();
  }
  return <Component {...pageProps} />;
}

export default MyApp;
