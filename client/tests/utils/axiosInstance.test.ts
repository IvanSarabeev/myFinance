import axios from "axios";
import { describe, expect, it, jest } from "@jest/globals";
import api from './../../src/utils/axiosInstance';
import dotenv from "dotenv";

dotenv.config();

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Reusable API Instance", () => {
    it("should have base URL, they should not be empty", () => {
        const URL = process.env.VITE_CLIENT_NODE_ENV === "development"
            ? `${process.env.VITE_BACKEND_URL}/api`
            : `${process.env.VITE_RESERVER_BACKEND_URL}/api`;

        expect(api.defaults.baseURL).toBe(URL);
    });

    it("should have correct Headers, they should not be empty", () => {
        const expectedHeaders = {
            "Content-Type": String(process.env.VITE_CONTENT_TYPE),
            "X-Frame-Options": String(process.env.VITE_X_OPTIONS),
            "X-XSS-Protection": `${process.env.VITE_X_PROTECTION_ONE}; ${process.env.VITE_X_PROTECTION_TWO}=${process.env.VITE_X_PROTECTION_THREE}`,
            "X-Content-Type-Options": String(process.env.VITE_X_CONTENT_OPTIONS),
            "Referrer-Policy": String(process.env.VITE_REF_POLICY),
            "Strict-Transport-Security": `${process.env.VITE_STRICT_TSP}=${process.env.VITE_STRICT_TSP_AGE}; ${process.env.VITE_STRICT_TSP_DOM}`,
            "Accept": String(process.env.VITE_CONTENT_TYPE),
        };

        expect(api.defaults.headers).toMatchObject(expectedHeaders);
    });

    it("should handle sucessful response using Axios interceptors", async () => {
        const mockResponse = { data: { success: true }};
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const response = await api.get('/test-endpoint');

        expect(response).toEqual(mockResponse);
        expect(mockedAxios.get).toHaveBeenCalledWith('/test-endpoint');
    });

    it("should handle API error response using interceptors", async () => {
        const mockErrorResponse = {
          response: {
            data: { message: "API Error Message" },
          },
        };
    
        mockedAxios.get.mockRejectedValueOnce(mockErrorResponse);
    
        await expect(api.get("/test-endpoint")).rejects.toEqual({
          message: new Error("API Error Message"),
          response: mockErrorResponse.response.data,
        });
    });

    it("should handle network errors using interceptors", async () => {
        mockedAxios.get.mockRejectedValueOnce({
          request: {},
        });
    
        await expect(api.get("/test-endpoint")).rejects.toThrow(
          "Network error: Unable establish connection."
        );
      });
    
      it("should handle unexpected errors using interceptors", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("Unexpected error."));
    
        await expect(api.get("/test-endpoint")).rejects.toThrow("Unexpected error.");
    });
});