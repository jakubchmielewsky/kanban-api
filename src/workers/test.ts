import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { queueEmail } from "../features/emails/email.queue";

queueEmail({
  to: "chmielewskijakub@hotmail.com",
  subject: "Witamy!",
  html: "<h1>Dziękujemy za rejestrację 🎉</h1>",
});
