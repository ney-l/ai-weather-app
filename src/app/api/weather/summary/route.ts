import { NextResponse } from 'next/server'

import { openAiApi } from '@/lib/openai'

/**
 *
 * @note
 * Access this route at: https://<your-domain>/api/weather/summary
 */
export async function POST(request: Request) {
  // weather data in the body of the POST req
  const { weatherData } = await request.json()

  const { data } = await openAiApi.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content: `Pretend you're a weather news presenter presenting LIVE on television. Be energetic, witty and full of charisma. Introduce yourself as an AI Weather reporter and say that you are LIVE. State the city you are providing the summary for. Then give a summary of today's weather only. Make it easy for the viewer to understand and know what to do to prepare for those weather conditions such as wear SPF if the UV is high. Use the uv_index data provided to provide UV advice. PRovide a joke regarding the weather. Assume the data came from your team at the news office and not the user.`,
      },
      {
        role: 'user',
        content: `Hi, there, can I get a summary of today's weather, use the following information to get the weather data: ${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  })

  return NextResponse.json(data.choices[0].message)
}
