import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Helper function to render the app with router context
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};

describe('Home Page', () => {
  test('renders NavBar with Home link', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByText(/home/i); // This is case-insensitive
    expect(homeLink).toBeInTheDocument();
  });

  test('renders search bar', () => {
    renderWithRouter(<App />);
    const searchBar = screen.getByPlaceholderText(/search by location or address.../i);
    expect(searchBar).toBeInTheDocument();
  });

  test('renders Advanced Filters button', () => {
    renderWithRouter(<App />);
    const advancedFiltersButton = screen.getByText(/advanced filters/i);
    expect(advancedFiltersButton).toBeInTheDocument();
  });

  test('renders Search button', () => {
    renderWithRouter(<App />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  // Add more tests for other home page elements (Broker list, Team, Contact, Login/Register )
});

