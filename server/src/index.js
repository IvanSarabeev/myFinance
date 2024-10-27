import express from "express";
import dotenv from "dotenv";
import path from "path";
import { client, connect } from "./database/connection.js";

// Express Routes
import statusRouter from "./middleware/HealthCheck.js";

dotenv.config();

const PORT = parseInt(process.env.PORT ?? process.env.RESERVE_PORT);
const __dirname = path.resolve();
const app = express();

async function clientConnection() {
  try {
    await connect();
  } catch (error) {
    console.error("Error accessing the database: ", error);
  } finally {
    await client.close();
  }
} 

clientConnection().catch(console.error);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

app.use('/health', statusRouter); // Health check Route

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