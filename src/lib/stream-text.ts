import 'dotenv/config'
import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'

const answerMyQuestion = async (prompt: string) => {
  const { textStream } = await streamText({
    model: anthropic('claude-3-5-haiku-latest'),
    prompt
  })

  for await (const text of textStream) {
    process.stdout.write(text)
  }

  return textStream
}

const answer = await answerMyQuestion('what is the color of sun?')

console.log(answer)
