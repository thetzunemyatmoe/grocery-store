import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import groceryRoutes from './routes/grocery.route.js'

dotenv.config()
const app = express()


// Route
app.use(express.json())
app.use('/api/grocery', groceryRoutes)

app.listen(5100, () => {
  connectDB()
  console.log(`Server started on port 5100`);
});

// xpXDh1o8IOWt36di