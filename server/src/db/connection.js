import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.ATLAS_URI ?? "";

const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, // Add this if you're using SSL
});

async function connect() {    
    try {
        await client.connect();
        
        await client.db("admin").command({ ping: 1 });
        
        console.log("Connection to MongoDB was successful!");
    } catch (error) {
        console.error("Database Connection Error: ", error);
    }
}

export { client, connect };