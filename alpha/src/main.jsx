import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';

// Import de css das fontes para o MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <CssBaseline />
    <App />
    <ToastContainer pauseOnHover hideProgressBar position='top-center' autoClose={2500} />
  </React.Fragment>,
);
