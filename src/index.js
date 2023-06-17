import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import {configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import TodoReducer from './TodoReducer';
import 'bootstrap/dist/css/bootstrap.css';

const store=configureStore({
  reducer:{
    todos:TodoReducer
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
    
  </React.StrictMode>
);

