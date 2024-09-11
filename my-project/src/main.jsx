import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the Provider
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
