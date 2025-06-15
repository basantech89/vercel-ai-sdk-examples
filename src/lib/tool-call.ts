import 'dotenv/config'
import { generateText, tool } from 'ai'
import { z } from 'zod'
import { anthropic } from '@ai-sdk/anthropic'

const model = anthropic('claude-3-5-haiku-latest')

const logToConsoleTool = tool({
  description: 'Log a message to the console',
  parameters: z.object({
    message: z.string().describe('The message to log to the console')
  }),
  execute: async ({ message }) => {
    console.log(message)
  }
})

const logToConsole = async (prompt: string) => {
  const { steps } = await generateText({
    model,
    prompt,
    system:
      `Your only role in life is to log ` +
      `messages to the console. ` +
      `Use the tool provided to log the ` +
      `prompt to the console.`,
    tools: {
      logToConsole: logToConsoleTool
    }
  })

  console.dir(steps[0]?.toolCalls, { depth: null })
  console.dir(steps[0]?.toolResults, { depth: null })
}

await logToConsole('Hello world!')
