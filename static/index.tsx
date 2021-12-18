import React from 'react';
import ReactDOM from 'react-dom';
import StaticPage from './StaticPage';
// import './global.css';

if (document.location.search === '?v=vYnWHzQvy58') {
  const body = document.getElementsByTagName('body')[0];

  body.innerHTML = '';

  ReactDOM.render(
    <React.StrictMode>
      <StaticPage />
    </React.StrictMode>,
    body
  );
}
