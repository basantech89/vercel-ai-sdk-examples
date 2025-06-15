import { streamText } from 'ai'
import 'dotenv/config'
import { ollama } from 'ollama-ai-provider'

const model = ollama('llama3.2')

export const askLocalLLMQuestion = async (input: string) => {
  const { textStream } = await streamText({
    model,
    prompt: input,
    maxRetries: 0
  })

  for await (const text of textStream) {
    process.stdout.write(text)
  }

  return textStream
}

const input = `Tell me a story about your grandmother.`
await askLocalLLMQuestion(input)
