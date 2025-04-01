import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config({ path: ".env" });

import app from "./app";

connectDB();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
