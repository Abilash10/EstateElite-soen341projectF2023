import axios from 'axios';
import { getUserName } from './getUserName';

jest.mock('axios');

describe('getUserName Function', () => {
    const mockUserID = '12345';

    beforeEach(() => {
        localStorage.setItem('userID', mockUserID);
        jest.clearAllMocks();
    });

    test('handles network error gracefully', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        await expect(getUserName()).rejects.toThrow('Network Error');
    });

    test('returns undefined for invalid userID', async () => {
        axios.get.mockResolvedValue({ data: {} }); // Simulating no username returned

        const username = await getUserName();
        expect(username).toBeUndefined();
    });

    test('returns undefined when userID is not in localStorage', async () => {
        localStorage.removeItem('userID');

        const username = await getUserName();
        expect(username).toBeUndefined();
    });

    test('handles malformed userID', async () => {
        const malformedUserID = '!@#$%^&*';
        localStorage.setItem('userID', malformedUserID);
        axios.get.mockRejectedValue(new Error('Invalid UserID'));

        await expect(getUserName()).rejects.toThrow('Invalid UserID');
    });

    test('handles empty or missing response data', async () => {
        // Simulate an empty response with a data object
        axios.get.mockResolvedValue({ data: {} });

        const username = await getUserName();
        expect(username).toBeUndefined();
    });

});