import express from "express";
import dotenv from "dotenv";

// Express Routes
import statusRouter from "middleware/HealthCheck";

dotenv.config();

const PORT = parseInt(process.env.NODE_ENV ?? process.env.RESERVE_PORT);

const app = express();

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port: ${PORT}`);
});

app.use('/health', statusRouter);
