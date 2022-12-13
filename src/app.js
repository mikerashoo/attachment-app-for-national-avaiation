import React, {useState, useEffect} from 'react';
import {api} from './api';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Routes,
    BrowserRouter
  } from "react-router-dom";
import Home from './pages/home';
import ManageStudentPage from './pages/manage_students';
import Navbar from './components/navbar';
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
           
          <Route path="/student_managemenet" element={<ManageStudentPage />}/>
             
          <Route path="/" element={<Home />}/>
             
        </Routes> 
    </BrowserRouter>
      </div>
    );
};

export default App;
