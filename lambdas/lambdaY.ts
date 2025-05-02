import { SNSEvent, Handler } from "aws-lambda";
export const handler: Handler = async (event: SNSEvent, context) => {
  try {
    console.log("LambdaY triggered by SNS");
    console.log("Event: ", JSON.stringify(event));
    for (const record of event.Records) {
      const snsMessage = record.Sns.Message;
      console.log("Message received from SNS Topic1:", snsMessage);
      try {
        const parsed = JSON.parse(snsMessage);
        console.log("Parsed SNS Payload:", parsed);
      } catch {
        console.log("Raw SNS Message:", snsMessage);
      }
    }
  } catch (error: any) {
    console.error("LambdaY Error:", error);
    throw new Error(JSON.stringify(error));
  }
};

