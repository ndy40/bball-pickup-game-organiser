import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ContextWrapper from 'ContextWrapper';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
);
