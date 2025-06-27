import { emailQueue } from "../../config/bullmq";
import { SendEmailPayload } from "./email.types";

export async function queueEmail(payload: SendEmailPayload) {
  await emailQueue.add("sendEmail", payload);
}
