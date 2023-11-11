import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Helper function to wrap components with Router since we use 'useRouteMatch' hook in components
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};

describe('App Component', () => {
  test('renders the navigation bar and its links', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('My Properties')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Login/Register')).toBeInTheDocument();
  });
});

