import dotenv from "dotenv";

// Helper Functions
import { cleanUrl } from "../helpers/utils.js";

// Load env variables
dotenv.config();

export const allowedOrigins = [
  `${process.env.CLIENT_URL + process.env.CLIENT_PORT}`,
  `${process.env.SERVER_URL + process.env.PORT}`,
  process.env.SERVER_PROD_URL,
  cleanUrl(process.env.FIREBASE_URL),
  cleanUrl(process.env.GOOGLE_API),
];

const corsConfiguration = {
  origin: (origin, callback) => {
    console.log('Server Expected Origin:', origin);
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }

    console.log('CORS received origin:', origin);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization', 
    'Referrer-Policy', 
    'Strict-Transport-Security', 
    'X-Content-Type-Options',
    'X-Frame-Options', 
    'X-XSS-Protection', 
    'Content-Security-Policy',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
  ],
  credentials: true,
};

export default corsConfiguration;