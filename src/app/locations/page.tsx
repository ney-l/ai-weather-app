import { AlertCard } from '@/components/AlertCard'
import { HumidityChart } from '@/components/HumidityChart'
import { InformationPanel } from '@/components/InfomationPanel'
import { RainChart } from '@/components/RainChart'
import { StatCard } from '@/components/StatCard'
import { TempChart } from '@/components/TempChart'
import { fetchWeatherQuery } from '@/graphql/queries'
import { getClient } from '@/lib/apollo'
import {
  CleanedData,
  cleanData,
  getBasePath,
} from '@/utils'

export const revalidate = 86400

type Props = {
  searchParams?: {
    city?: string
    lat?: string
    long?: string
  }
}

async function fetchAiSummary(weatherData: CleanedData) {
  try {
    const url = `${getBasePath()}/api/weather/summary`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        weatherData,
      }),
    })
    const data = await res.json()
    return data.content
  } catch (error) {
    console.error('Error in fetch AI Summary', error)
  }
}

const WeatherPage = async ({ searchParams }: Props) => {
  const client = getClient()

  const response = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: 'true',
      longitude: searchParams?.long,
      latitude: searchParams?.lat,
      timezone: 'GMT',
    },
  })

  const results: Root = response?.data?.weatherQuery

  const dataToSend = cleanData(
    results,
    searchParams?.city ?? ''
  )

  const aiSummary = await fetchAiSummary(dataToSend)

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InformationPanel
        city={searchParams?.city ?? ''}
        lat={searchParams?.lat ?? ''}
        long={searchParams?.long ?? ''}
        results={results}
      />
      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">
              Today&apos;s Overview
            </h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{' '}
              {new Date(
                results.current_weather.time
              ).toLocaleString()}
            </p>
          </div>

          <div className="m-2 mb-10">
            <AlertCard message={aiSummary} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${results.daily.temperature_2m_max[0].toFixed(
                1
              )}`}
              color="yellow"
            />
            <StatCard
              title="Minimum Temperature"
              metric={`${results.daily.temperature_2m_min[0].toFixed(
                1
              )}`}
              color="green"
            />

            <div>
              <StatCard
                title="UV Index"
                metric={results.daily.uv_index_max[0].toFixed(
                  1
                )}
                color="rose"
              />
              {Number(
                results.daily.uv_index_max[0].toFixed(1)
              ) > 5 && (
                <AlertCard
                  message="The UV is high today, be sure to wear SPF!"
                  warning
                />
              )}
            </div>

            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${results.current_weather.windspeed.toFixed(
                  1
                )}m/s`}
                color="cyan"
              />
              <StatCard
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(
                  1
                )}°`}
                color="violet"
              />
            </div>
          </div>

          <hr className="mb-5" />

          <div className="space-y-3">
            <TempChart results={results} />
            <RainChart results={results} />
            <HumidityChart results={results} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
