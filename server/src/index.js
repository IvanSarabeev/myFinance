import express from "express";
import dotenv from "dotenv";
import path from "path";
import helmet from "helmet";
import { connect } from "./database/connection.js";
import cors from "cors";

// Express Routes
import statusRouter from "./middleware/HealthCheck.js";
import AuthRoutes from './routes/authRoute.js';
import OtpRoutes from "./routes/otpRoute.js";

// Helper Functions
import { cleanUrl } from "./helpers/utils.js";

dotenv.config();

const PORT = parseInt(process.env.PORT ?? process.env.RESERVE_PORT);
const __dirname = path.resolve();
const app = express();

const allowedOrigins = [
  `${process.env.CLIENT_URL + process.env.CLIENT_PORT}`,
  `${process.env.SERVER_URL + process.env.PORT}`,
  process.env.SERVER_PROD_URL,
  cleanUrl(process.env.FIREBASE_URL),
  cleanUrl(process.env.GOOGLE_API),
];
const mapOrigin = allowedOrigins.map(origin => origin).filter(Boolean);

// Helmet Headers
app.use(helmet.noSniff());
app.use(helmet.frameguard({ action: "deny"}));
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(helmet({ 
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defauktSrc: ["'self'"],
      scriptSrc: ["'self'", process.env.CLOUDINARY_URL, "'unsafe-inline'"],
      imgSrc: ["'self'", process.env.CLOUDINARY_URL, "data"],    // Allow images from Cloudinary
      connectSrc: ["'self'",
        ...mapOrigin, 
        process.env.FIREBASE_URL,
        process.env.GOOGLE_API,
      ],
      styleSrc: ["'self'", "'unsafe-inline'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [], 
      referrerPolicy: ["strict-origin-when-cross-origin"],
    }
  }
  // contentSecurityPolicy: false,
}));

// Cors Configuration
app.use(cors({
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
    'Content-Type', 'Authorization', 'Referrer-Policy', 
    'Strict-Transport-Security', 'X-Content-Type-Options',
    'X-Frame-Options', 'X-XSS-Protection', 'Content-Security-Policy',
  ],
  credentials: true, // true
}));

// Handle Preflight Request
app.options('*', cors());

connect().then(() => {
  console.log("Database connected and it's ready to handle requests.")
}).catch ((error) => {
  console.error("Failed to connect to the database: ", error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

if (process.env.NODE_ENV === 'dev') { 
  app.use((req, res, next) => {
    console.log(`Incoming request: [${req.method}], ${req.path}`);
    next();
  })
};
  
app.use(express.json());

app.use('/health', statusRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'client', 'dist', 'index.html');
  
  console.log('Resolved index path:', indexPath);
  
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Failed to send index.html:", err);
      res.status(404).send('File not found');
    }
  });
});

// Express Route's
app.use("/api/auth", AuthRoutes);
app.use("/api/otp", OtpRoutes);