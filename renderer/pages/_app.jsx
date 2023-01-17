import React, { useEffect } from 'react';

import '../styles/globals.css';  
import '../styles/App.css';
import '../styles/management.css'
import Navbar from '../components/layouts/navbar';
import { AuthProvider } from '../auth';
 
function MyApp({ Component, pageProps }) {

    
  return (<AuthProvider>
    <div className='h-screen'> 
      <Navbar />
      <Component {...pageProps} /> 
  </div>
  </AuthProvider>);
}
 
export default MyApp;
