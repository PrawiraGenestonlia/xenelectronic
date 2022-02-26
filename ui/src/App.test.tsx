/* eslint-disable no-undef */
import React from 'react';
// import { test , expect} from 'jest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

test('renders learn react link', () => {
  render(<BrowserRouter>
    <App />
  </BrowserRouter>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
