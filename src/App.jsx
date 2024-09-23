// src/App.js
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CryptoDashboard from './CryptoDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CryptoDashboard />
    </QueryClientProvider> 
  );
}

export default App;
