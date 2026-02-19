import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
dbConnection();

// Placeholder for routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
