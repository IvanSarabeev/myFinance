import mongoose from "mongoose";
import {MongoServerSelectionError} from "mongodb";
import {logMessage} from "../utils/helpers.js";
import dotenv from "dotenv";
import {HTTP_RESPONSE_STATUS} from "../defines.js";

dotenv.config();

// eslint-disable-next-line no-undef
const ATLAS_URL = process.env.ATLAS_URI;

if (!ATLAS_URL) {
    logMessage(ATLAS_URL, "⚠️ No database connection string found.", 'warn');
}

async function connect() {
    const SERVER_TIMEOUT = 10000;
    const POOL_SIZE = 10;

    try {
        await mongoose.connect(ATLAS_URL, {
            serverSelectionTimeoutMS: SERVER_TIMEOUT,
            retryWrites: true,
            maxPoolSize: POOL_SIZE,
            minPoolSize: 2,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4,
            retryReads: true,
            maxConnecting: 2,
            heartbeatFrequencyMS: 10000,
            autoIndex: false,
        });

        mongoose.connection.on('error', error => {
            logMessage(error, "❌ Database connection error occurred");
        });

        mongoose.connection.on('disconnected', () => {
            logMessage(false, "⚠️ Database disconnected", 'warn');
        });

        logMessage(true, "✅ Database connection successful.", 'success');
    } catch (error) {
        logMessage({
            name: error.name,
            message: error.message ?? 'Generic error',
            code: error.code ?? HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
        }, "❌ Database connection failed.");

        if (error instanceof MongoServerSelectionError) {
            logMessage(error, "⚠️ Database connection failed", 'warn');
        }
    }
}

export {connect};