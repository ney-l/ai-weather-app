import { AlertCard } from '@/components/AlertCard';
import { InformationPanel } from '@/components/InfomationPanel';
import { StatCard } from '@/components/StatCard';
import { fetchWeatherQuery } from '@/graphql/queries';
import { getClient } from '@/lib/apollo';

type Props = {
  searchParams?: {
    city?: string;
    lat?: string;
    long?: string;
  };
};

const WeatherPage = async ({ searchParams }: Props) => {
  const client = getClient();

  const response = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: 'true',
      longitude: searchParams?.long,
      latitude: searchParams?.lat,
      timezone: 'GMT',
    },
  });

  const results: Root = response?.data?.weatherQuery;

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InformationPanel
        city={searchParams?.city ?? ''}
        lat={searchParams?.lat ?? ''}
        long={searchParams?.long ?? ''}
        results={results}
      />
    </div>
  );
};

export default WeatherPage;
