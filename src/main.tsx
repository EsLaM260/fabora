import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {HelmetProvider} from 'react-helmet-async';
import App from './App';
import {AppProvider} from './context/AppContext';
import './index.css';

const queryClient=new QueryClient({defaultOptions:{queries:{staleTime:60_000,retry:1}}});
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><HelmetProvider><QueryClientProvider client={queryClient}><AppProvider><BrowserRouter><App/></BrowserRouter></AppProvider></QueryClientProvider></HelmetProvider></React.StrictMode>);
