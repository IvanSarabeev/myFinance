import mongoose from "mongoose";
import dotenv from 'dotenv';
import { MongoServerSelectionError } from "mongodb";

dotenv.config();

const URI = process.env.ATLAS_URI ?? "";

if (!URI) {
    console.error("Missing DB URI variable");
}

async function connect() {    
    try {
        await mongoose.connect(URI, {
            serverSelectionTimeoutMS: 10000,
        });
        
        console.log(`Connection to MongoDB was successful!`);
    } catch (error) {
        console.error("Database Connection Error: ", error);

        if (error instanceof MongoServerSelectionError) {
            console.error(`Mongo Server Selection Error : ${error}`);
        }
    }
}

export { connect };