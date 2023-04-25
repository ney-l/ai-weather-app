'use client'

import {
  Card,
  Divider,
  Subtitle,
  Text,
} from '@tremor/react'

import { CityPicker } from '@/components/CityPicker'

export default function Home() {
  return (
    <div className="min-h-screen p-10 flex flex-col justify-center items-center bg-gradient-primary bg-cover bg-no-repeat bg-fixed bg-center overflow-hidden">
      <Card className="max-w-4xl mx-auto  bg-white bg-opacity-20 backdrop-blur-md backdrop-filter shadow-sm border-none ring-0 p-7">
        <Text className="md:text-6xl font-bold text-center mb-10 text-slate-200 text-3xl mt-10">
          AI Weather App
        </Text>
        <Subtitle className="text-lg md:text-xl text-center text-slate-300">
          Powered by OpenAI, Next.js 13.3, Tailwind CSS,
          TypeScript, Tremor 2.0 & More!
        </Subtitle>

        <Divider className="my-10 opacity-20" />

        <Card className="bg-gradient-accent bg-cover bg-no-repeat bg-fixed bg-center ring-0 mb-5">
          <CityPicker />
        </Card>
      </Card>
    </div>
  )
}
