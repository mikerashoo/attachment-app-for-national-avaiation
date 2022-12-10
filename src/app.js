import React, {useState, useEffect} from 'react';
import {api} from './api';

const App = () => {
    const [successText, setSuccessText] = useState(null);

    useEffect(() => {
        api.get('/test')
            .then(({data}) => setSuccessText(data))
            .catch(err => console.error(err));
    });

    return (
        <div className="bg-purple-200">
            <h2 className="text-3xl font-bold underline">Electron is ! </h2>
            <p className="text-red-500">Fetched api response from server: {successText}</p>
        </div>
    );
};

export default App;
