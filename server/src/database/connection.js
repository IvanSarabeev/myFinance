import { MongoClient, MongoServerSelectionError, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.ATLAS_URI ?? "";
const DB_NAME = process.env.ATLAS_DB_NAME ?? "";

const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connect() {    
    try {
        await client.connect();
        
        console.log(`Connection to MongoDB/${DB_NAME} was successful!`);
    } catch (error) {
        console.error("Database Connection Error: ", error);

        if (error instanceof MongoServerSelectionError) {
            console.error(`Mongo Server Selection Error : ${error}`);
        }
    }
}

export { client, connect };