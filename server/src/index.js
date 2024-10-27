import express from "express";
import dotenv from "dotenv";
import path from "path";
import { client, connect } from "./db/connection.js";

// Express Routes
import statusRouter from "./middleware/HealthCheck.js";

dotenv.config();

const PORT = parseInt(process.env.PORT ?? process.env.RESERVE_PORT);

const __dirname = path.resolve();

const app = express();

async function main() {
    await connect();

    const dbName = process.env.ATLAS_DB_NAME ?? '';
    const collectionName = process.env.ATLAS_DB_COLLECTION ?? '';

  try {
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      
      const documents = await collection.find({}).toArray();
      console.log(documents);
    
  } catch (error) {
    console.error("Error accessing the database: ", error);
  } finally {
    await client.close();
  }
} 

app.use(express.static(path.join(__dirname, '/client/dust')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

app.use('/health', statusRouter); // Health check Route

main().catch(console.error);