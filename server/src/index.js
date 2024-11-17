import express from "express";
import dotenv from "dotenv";
import path from "path";
import helmet from "helmet";
import { connect } from "./database/connection.js";

// Express Routes
import statusRouter from "./middleware/HealthCheck.js";
import AuthRoutes from './routes/authRoute.js';
import OtpRoutes from "./routes/otpRoute.js";

dotenv.config();

const PORT = parseInt(process.env.PORT ?? process.env.RESERVE_PORT);
const __dirname = path.resolve();
const app = express();

// Helmet Headers
app.use(helmet.noSniff());
app.use(helmet.frameguard({ action: "deny"}));
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());

connect().then(() => {
  console.log("Database connected and it's ready to handle requests.")
}).catch ((error) => {
  console.error("Failed to connect to the database: ", error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

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