import 'dotenv/config'
import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({
    model: anthropic('claude-3-5-haiku-latest'),
    prompt,
    system:
      `You are a text summarizer. ` +
      `Summarize the text you receive. ` +
      `Be concise. ` +
      `Return only the summary. ` +
      `Do not use the phrase "here is a summary". ` +
      `Highlight relevant phrases in bold. ` +
      `The summary should be two sentences long. `
  })

  return text
}

const answer = await answerMyQuestion(
  'what is the chemical formula for dihydrogen monoxide?'
)

const answerMyQuestion2 = async (prompt: string) => {
  const { text } = await generateText({
    model: anthropic('claude-3-5-haiku-latest'),
    messages: [
      {
        role: 'system',
        content:
          `You are a text summarizer. ` +
          `Summarize the text you receive. ` +
          `Be concise. ` +
          `Return only the summary. ` +
          `Do not use the phrase "here is a summary". ` +
          `Highlight relevant phrases in bold. ` +
          `The summary should be two sentences long. `
      },
      {
        role: 'user',
        content: prompt
      }
    ]
  })

  return text
}

console.log(answer)
