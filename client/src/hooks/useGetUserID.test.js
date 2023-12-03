import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGetUserID } from './useGetUserID';

// Mock component to test the useGetUserID hook
function MockComponent() {
    const userID = useGetUserID();
    return <div>UserID: {userID}</div>;
}

describe('useGetUserID Hook', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    test('returns correct userID from localStorage', () => {
        // Set the expected value in localStorage
        const userID = '12345';
        localStorage.setItem('userID', userID);

        // Render the mock component
        render(<MockComponent />);

        // Check if the rendered output matches the value in localStorage
        expect(screen.getByText(`UserID: ${userID}`)).toBeInTheDocument();
    });

    test('returns null when no userID in localStorage', () => {
        // Ensure localStorage does not have the userID
        localStorage.removeItem('userID');

        // Render the mock component
        render(<MockComponent />);

        // Check if the rendered output reflects the absence of userID
        expect(screen.getByText('UserID:')).toBeInTheDocument();
    });
});