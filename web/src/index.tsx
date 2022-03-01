import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import { queryClient } from 'utilities/react-query/query-client';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
