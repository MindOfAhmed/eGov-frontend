import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// add the Axios interceptors
import './refreshToken.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
