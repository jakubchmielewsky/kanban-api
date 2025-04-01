import dotenv from "dotenv";

dotenv.config({ path: ".env" });

import app from "./app";
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
