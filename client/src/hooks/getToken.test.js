import { getToken } from './getToken';

describe('getToken Function', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    test('retrieves token from localStorage', () => {
        // Set up a fake token
        const fakeToken = '123abc';
        localStorage.setItem('token', fakeToken);

        // Call the function and check the result
        const token = getToken();
        expect(token).toBe(fakeToken);
    });

    test('returns null when no token in localStorage', () => {
        // Ensure localStorage does not have the token
        localStorage.removeItem('token');

        // Call the function and check the result
        const token = getToken();
        expect(token).toBeNull();
    });

});