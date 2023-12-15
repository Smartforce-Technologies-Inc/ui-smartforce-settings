import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { App } from './App/App';
import { ThemeTypeProvider } from '../src';

const root = document.querySelector('#root');

ReactDOM.render(
  <ThemeTypeProvider>
    <App />
  </ThemeTypeProvider>,
  root
);
