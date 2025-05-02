import { SQSEvent, Handler } from "aws-lambda";
export const handler: Handler = async (event: SQSEvent, context) => {
  try {
    console.log("LambdaX triggered via QueueA (SQS)");
    console.log("Event: ", JSON.stringify(event));
    
   for (const record of event.Records) {
      const body = record.body;
      console.log("Message received from QueueA:", body);
      try {
        const parsed = JSON.parse(body);
        console.log("Parsed SNS Message:", parsed?.Message || parsed);
      } catch (err) {
        console.log("Raw body (non-JSON):", body);
      }
    }
  } catch (error: any) {
    console.error("LambdaX Error:", error);
    throw new Error(JSON.stringify(error));
  }
};