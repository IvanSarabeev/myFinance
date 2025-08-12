import { cleanUrl } from "../utils/index.js";
import {
  CLIENT_PORT,
  CLIENT_PROD_URL,
  CLIENT_URL,
  FIREBASE_URL,
  GOOGLE_API,
  PORT,
  SERVER_PROD_URL,
  SERVER_URL
} from "./env.js";

export const allowedOrigins = [
  `${CLIENT_URL + CLIENT_PORT}`,
  `${SERVER_URL + PORT}`,
  `${SERVER_PROD_URL + PORT}`,
  SERVER_PROD_URL,
  cleanUrl(FIREBASE_URL),
  cleanUrl(GOOGLE_API),
  CLIENT_PROD_URL,
];

const corsConfiguration = {
  // origin: (origin, callback) => {
  //   if (allowedOrigins.includes(origin) || !origin) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }

  //   console.log('CORS received origin:', origin);
  // },
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