import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store.js'; // Import the Redux store

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap App with Provider and pass the store */}
      <App />
    </Provider>
  </React.StrictMode>
);
