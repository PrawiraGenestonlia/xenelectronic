/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import RouterApp from './index';

test('renders entire routers', () => {
  render(<RouterApp />);
  const element = screen.getByText(/react/i);
  expect(element).toBeInTheDocument();
});
