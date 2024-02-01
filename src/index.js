import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NaverMap from './NaverMap';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NaverMap />
  </React.StrictMode>
);

reportWebVitals();
