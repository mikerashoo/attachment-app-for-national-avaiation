import React, {useState, useEffect} from 'react';
import {api} from './api';
import { 
     HashRouter,
    Route, 
    Routes,
    BrowserRouter
  } from "react-router-dom";
import Home from './pages/home'; 
import Navbar from './components/navbar';
import ManagePage from './pages/manage'; 
import PrintPage from './pages/printPage';
import Reports from './pages/reports';
const App = () => {
    const [successText, setSuccessText] = useState(null);

    useEffect(() => {
        api.get('/test')
            .then(({data}) => setSuccessText(data))
            .catch(err => console.error(err));
    });

    return (
        <div className="bg-gray-200">
          <BrowserRouter>
       
        <Navbar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
           
          <Route path="/manage" element={<ManagePage />}/> 
          <Route path="/print" element={<PrintPage />}/> 
          <Route path="/reports" element={<Reports />}/> 
             
          <Route path="/" element={<Home />}/>
             
        </Routes> 
    </BrowserRouter>
      </div>
    );
};

export default App;
