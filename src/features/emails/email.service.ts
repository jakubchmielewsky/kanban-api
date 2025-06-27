import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { SendEmailPayload } from "./email.types";

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function sendEmail(payload: SendEmailPayload) {
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [payload.to],
    },
    Message: {
      Body: {
        Html: { Data: payload.html },
      },
      Subject: { Data: payload.subject },
    },
    Source: process.env.AWS_SES_FROM as string,
  });

  await ses.send(command);
}
