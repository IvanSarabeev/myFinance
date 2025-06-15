import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

// # Region Routes
import statusRouter from "./middleware/HealthCheck.js";
import AuthenticationRouter from './routes/authRoute.js';
import OtpRouter from "./routes/otpRoute.js";
import WalletRouter from "./routes/walletRoute.js";
import UserRouter from "./routes/userRoute.js";
// # EndRegion Routes

// # Region Configurations
import corsConfiguration from "./config/cors.js";
import helmetConfiguration from "./config/helmet.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import arcjetMiddleware from "./middleware/arcjetMiddleware.js";
import { NODE_ENV } from "./config/env.js";
import {logMessage} from "./utils/helpers.js";
import {HTTP_RESPONSE_STATUS} from "./defines.js";
// # EndRegion Configurations

const __dirname = path.resolve();
const app = express();

app.use(
    express.json(),
    express.urlencoded({ extended: true }),
    cookieParser(),
    helmetConfiguration,
    cors(corsConfiguration),
    express.static(path.join(__dirname, "/client/dist")),
);

if (NODE_ENV === "prod") {
    app.use(arcjetMiddleware);
}

if (NODE_ENV === "dev") {
    app.use((req, res, next) => {
        console.log(`Incoming request: [${req.method}], ${req.path}`);
        next();
    });
}

app.use("/health", statusRouter);
app.use("/api/auth", AuthenticationRouter);
app.use("/api/v1/otp", OtpRouter);
app.use("/api/v1/wallet", WalletRouter);
app.use("/api/v1/user", UserRouter);

app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, "client", "dist", "index.html");

    res.sendFile(indexPath, (error) => {
        if (error) {
            logMessage(`Failed to send index.html: ${error}`, 'error');

            res.status(HTTP_RESPONSE_STATUS.NOT_FOUND).send('File not found');
        }
    });
});

app.use(errorMiddleware);

export default app;