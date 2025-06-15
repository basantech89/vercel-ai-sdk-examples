import 'dotenv/config'
import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'

export const classifySentiment = async (text: string) => {
  const { object } = await generateObject({
    model: openai('gpt-4.1-nano'),
    output: 'enum',
    enum: ['positive', 'negative', 'neutral'],
    prompt: text,
    system:
      `Classify the sentiment of the text as either ` +
      `positive, negative, or neutral.`
  })

  return object
}

const result = await classifySentiment(`I love this so much`)

console.log(result)
