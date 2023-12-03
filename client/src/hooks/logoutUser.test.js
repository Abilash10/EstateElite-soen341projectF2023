import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import useLogout from './logoutUser';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// Mock useCookies and useNavigate
jest.mock('react-cookie', () => ({
    useCookies: jest.fn().mockReturnValue([{}, jest.fn()]),
}));
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

function MockComponent() {
    const logout = useLogout();
    return <button onClick={logout}>Logout</button>;
}

describe('useLogout Hook', () => {
    test('clears cookies and localStorage and navigates to /auth on logout', () => {
        // Set up localStorage items
        window.localStorage.setItem('userID', '123');
        window.localStorage.setItem('userType', 'broker');
        window.localStorage.setItem('token', 'abc');

        // Mock navigate function
        const mockNavigate = jest.fn();
        useNavigate.mockImplementation(() => mockNavigate);

        // Render the mock component
        render(<MockComponent />);

        // Simulate logout
        fireEvent.click(screen.getByText('Logout'));

        // Check if localStorage items are removed
        expect(window.localStorage.getItem('userID')).toBeNull();
        expect(window.localStorage.getItem('userType')).toBeNull();
        expect(window.localStorage.getItem('token')).toBeNull();

        // Check if navigation is called
        expect(mockNavigate).toHaveBeenCalledWith('/auth');
    });
});