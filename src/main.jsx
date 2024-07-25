import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './styles/index.css';
import { Provider } from 'react-redux';
import dataStore from './features/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={dataStore}>
      <App />
    </Provider>
  </React.StrictMode>,
)
