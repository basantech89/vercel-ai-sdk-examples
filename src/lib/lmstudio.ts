import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { streamText } from 'ai'

const lmstudio = createOpenAICompatible({
  name: 'lmstudio',
  baseURL: `http://localhost:1234/v1`
})

const model = lmstudio('')

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
