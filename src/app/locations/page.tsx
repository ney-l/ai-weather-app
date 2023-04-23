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

  try {
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

    console.log(results);
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      WeatherPage
      <p>{JSON.stringify(searchParams, null, 4)}</p>
    </div>
  );
};

export default WeatherPage;
