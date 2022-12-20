import React, { useEffect } from 'react';

import '../styles/globals.css';  
import '../styles/App.css';
import '../styles/management.css'
import Navbar from '../components/layouts/navbar';
 
function MyApp({ Component, pageProps }) {

    
  return (<> 
  <Navbar />
  <Component {...pageProps} /> </>);
}

export default MyApp;
