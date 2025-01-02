import helmet from "helmet";
import dotenv from "dotenv";
import { allowedOrigins } from "./cors.js";

// Load env variables
dotenv.config();

const originsData = allowedOrigins.map((origin) => origin).filter(Boolean);

const helmetConfiguration = helmet({
    noSniff: true,
    frameguard: {action: "deny"},
    xssFilter: true,
    hidePoweredBy: true,
    crossOriginEmbedderPolicy: false,
    // contentSecurityPolicy: {
    //     directives: {
    //         defaultSrc: ["'self'"],
    //         scriptSrc: ["'self'", process.env.CLOUDINARY_URL, "'unsafe-inline'"],
    //         imgSrc: ["'self'", process.env.CLOUDINARY_URL, "data"],    // Allow images from Cloudinary
    //         connectSrc: ["'self'",
    //           ...originsData, 
    //           process.env.FIREBASE_URL,
    //           process.env.GOOGLE_API,
    //         ],
    //         styleSrc: ["'self'", "'unsafe-inline'"],
    //         objectSrc: ["'none'"],
    //         upgradeInsecureRequests: [], 
    //         referrerPolicy: ["strict-origin-when-cross-origin"],
    //     },
    // },
    contentSecurityPolicy: false,
});

export default helmetConfiguration;