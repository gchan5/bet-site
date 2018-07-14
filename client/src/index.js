import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './UserContext';

ReactDOM.render(
    <BrowserRouter>
        <UserContext.Provider>
            <App />
        </UserContext.Provider>
    </BrowserRouter>
, document.getElementById('root'));
