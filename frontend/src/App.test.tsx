import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders product list  page by default', () => {
  render(
  <App />);
  const linkElement = screen.getByText(/Inventory/i);
  expect(linkElement).toBeInTheDocument();
});
