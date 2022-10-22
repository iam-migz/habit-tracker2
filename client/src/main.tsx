import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TokenContextProvider } from './contexts/TokenContext';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TokenContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </TokenContextProvider>
  </React.StrictMode>,
);
