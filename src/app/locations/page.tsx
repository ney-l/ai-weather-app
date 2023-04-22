import React from 'react';

type Props = {
  searchParams?: {
    city?: string;
    lat?: string;
    long?: string;
  };
};

const WeatherPage = ({ searchParams }: Props) => {
  return (
    <div>
      WeatherPage
      <p>{JSON.stringify(searchParams, null, 4)}</p>
    </div>
  );
};

export default WeatherPage;
