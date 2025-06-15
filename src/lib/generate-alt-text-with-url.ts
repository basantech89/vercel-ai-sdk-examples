import 'dotenv/config'
import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'

const model = anthropic('claude-3-5-haiku-latest')

const systemPrompt =
  `You will receive an image. ` +
  `Please create an alt text for the image. ` +
  `Be concise. ` +
  `Use adjectives only when necessary. ` +
  `Do not pass 160 characters. ` +
  `Use simple language. `

export const describeImage = async (imageUrl: string) => {
  const { text } = await generateText({
    model,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            image: imageUrl
          }
        ]
      }
    ]
  })

  return text
}

const description = await describeImage(
  'https://github.com/ai-hero-dev/ai-hero/blob/main/internal/assets/image.jpg?raw=true'
)

console.log(description)
