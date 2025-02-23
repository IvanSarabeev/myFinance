import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connect } from "./database/connection.js";

// Express Routes
import statusRouter from "./middleware/HealthCheck.js";
import AuthenticationRouter from './routes/authRoute.js';
import OtpRouter from "./routes/otpRoute.js";

// Configuration's
import corsConfiguration from "./config/cors.js";
import helmetConfiguration from "./config/helmet.js";
import { NODE_ENV, PORT, RESERVE_PORT } from "./config/env.js";

// Middlewares
import errorMiddleware from "./middleware/errorMiddleware.js";
import arcjectMiddleware from './middleware/arcjetMiddleware.js';

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cors Configuration
app.use(helmetConfiguration);
app.options('*', cors(corsConfiguration));
app.use(cors(corsConfiguration));
app.use(arcjectMiddleware);

connect().then(() => {
  console.log("Database connected and it's ready to handle requests.")
}).catch ((error) => {
  console.error("Failed to connect to the database: ", error);
});

app.listen(PORT ?? RESERVE_PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

if (NODE_ENV === 'dev') { 
  app.use((req, res, next) => {
    console.log(`Incoming request: [${req.method}], ${req.path}`);
    next();
  })
};
  


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
// Add prefix of /v1
app.use("/api/auth", AuthenticationRouter);
app.use("/api/v1/otp", OtpRouter);
app.use('/health', statusRouter);

app.use(errorMiddleware);