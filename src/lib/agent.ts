import 'dotenv/config'
import { tool } from 'ai'
import { z } from 'zod'
import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'

const model = anthropic('claude-3-5-haiku-latest')

const getWeatherTool = tool({
  description: 'Get the current weather in the specified city',
  parameters: z.object({
    city: z.string().describe('The city to get the weather for')
  }),
  execute: async ({ city }) => {
    return `The weather in ${city} is 25°C and sunny.`
  }
})

const askAQuestion = async (prompt: string) => {
  const { textStream } = await streamText({
    model,
    prompt,
    tools: {
      getWeather: getWeatherTool
    },
    maxSteps: 10
  })

  for await (const text of textStream) {
    process.stdout.write(text)
  }
}

await askAQuestion(`What's the weather in London?`)
