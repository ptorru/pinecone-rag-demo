
import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.LLM_API_KEY,
  basePath: process.env.LLM_EMBEDDINGS_URL,
})
const openai = new OpenAIApi(config)

export async function getEmbeddings(input: string) {
  try {
    const response = await openai.createEmbedding({
      model: process.env.EMBEDDINGS_MODEL,
      input: [input.replace(/\n/g, ' ')]
    })

    const result = await response.json();
    return result.data[0].embedding as number[]

  } catch (e) {
    console.log("Error calling OpenAI embedding API: ", e);
    throw new Error(`Error calling OpenAI embedding API: ${e}`);
  }
}
