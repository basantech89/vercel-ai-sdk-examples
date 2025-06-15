import 'dotenv/config'
import { generateText } from 'ai'
import { readFileSync } from 'node:fs'
import { anthropic } from '@ai-sdk/anthropic'

const model = anthropic('claude-3-5-haiku-latest')

const systemPrompt =
  `You will receive an image. ` +
  `Please create an alt text for the image. ` +
  `Be concise. ` +
  `Use adjectives only when necessary. ` +
  `Do not pass 160 characters. ` +
  `Use simple language. `

export const describeImage = async (imagePath: string) => {
  const imageAsUint8Array = readFileSync(imagePath)

  const { text } = await generateText({
    model,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            image: imageAsUint8Array
          }
        ]
      }
    ]
  })

  return text
}

const description = await describeImage('./wall.jpeg')

console.log(description)
