import axios from 'axios';
import { google } from '../../src/app/api/auth';
import { describe, expect, jest, it } from "@jest/globals";
import { ExternalProviderResponse } from '../../src/types/authTypes';
import { GoogleUser } from '../../src/types/userTypes';

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Everything related to the auth.ts file", () => {

    const googleUser: GoogleUser = {
        name: 'John Doe',
        email: 'test@example.com',
        photo: 'RandomJohnDoe.jp',
        fingerPrint: {
            userAgent: "Mozzila Agent",
            timezone: 'UTC +2',
            os: 'Windows',
            language: 'English',
            lastActive: 'Dasdas',
            cpu: 'Intel',
            browser: 'Firefox',
            mobile: 1,
            deviceType: 1,
        },
    };
    describe("authenticated the User with Google, then return a response", async () => {
        const mockClientData: ExternalProviderResponse = {
            status: true,
            token: 'accessTokenStuff',
            message: 'API Response',
            data: {},
        };


        mockedAxios.post.mockResolvedValueOnce({data: mockClientData});

        const response = await google(googleUser);

        // Assert's
        expect(response.data).toEqual(mockClientData);
        expect(mockedAxios.post).toHaveBeenCalledWith("/auth/google-login", googleUser);
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
       
    });

    it("should throw an error if Google authentication fails", async () => {  
        mockedAxios.post.mockRejectedValueOnce(new Error("Invalid token"));
  
        await expect(google(googleUser)).rejects.toThrow("Invalid token");
        expect(mockedAxios.post).toHaveBeenCalledWith("/auth/google-login", googleUser);
      });
});