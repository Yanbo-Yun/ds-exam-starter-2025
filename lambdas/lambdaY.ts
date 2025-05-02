import { SNSEvent } from "aws-lambda";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqsClient = new SQSClient({ region: process.env.REGION });

export const handler = async (event: SNSEvent) => {
  try {
    for (const record of event.Records) {
      const snsMessage = record.Sns.Message;
      console.log("Message received from SNS Topic1:", snsMessage);

      let parsed: any;
      try {
        parsed = JSON.parse(snsMessage);
        console.log("Parsed SNS Payload:", parsed);
      } catch {
        console.warn("SNS message is not valid JSON. Skipping.");
        continue;
      }

      const hasEmail = !!parsed.email;
      console.log("Email exists?", hasEmail);

      if (!hasEmail) {
        
        const queueUrl = process.env.QUEUE_B_URL!;
        console.log("Forwarding to QueueB:", queueUrl);

        await sqsClient.send(
          new SendMessageCommand({
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify(parsed),
          })
        );

        console.log("Message successfully forwarded to QueueB.");
      }
    }
  } catch (error: any) {
    console.error("LambdaY Error:", error);
    throw new Error(JSON.stringify(error));
  }
};


