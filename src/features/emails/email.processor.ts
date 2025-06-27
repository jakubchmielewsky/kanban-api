import { Worker } from "bullmq";
import redis from "../../config/redis";
import { sendEmail } from "./email.service";
import { SendEmailPayload } from "./email.types";

const worker = new Worker(
  "emailQueue",
  async (job) => {
    const payload = job.data as SendEmailPayload;
    await sendEmail(payload);
  },
  { connection: redis }
);

worker.on("completed", (job) => {
  console.log(`✅ Email job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Email job ${job?.id} failed:`, err);
});
