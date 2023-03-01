// import { Configuration, OpenAIApi } from "openai";
import { CreateCompletionRequest } from "openai";

export interface OpenAIRequestPayload {
  model: string;
  prompt: string;
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}

export async function OpenAIRequest(payload: OpenAIRequestPayload) {
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion(payload);
    console.log("This is response", response);
    return new Response(response);
  } catch (err) {
    console.log(err);
  }
}
