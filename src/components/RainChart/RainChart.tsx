'use client';

import { Card, AreaChart, Title } from '@tremor/react';

type Props = {
  results: Root;
};

export const RainChart = ({ results }: Props) => {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString('en-DE', {
        hour: 'numeric',
        hour12: false,
      })
    )
    .slice(0, 24)
    .map((hour, i) => ({
      time: Number(hour),
      'Rain (%)': results.hourly.precipitation_probability[i],
    }));

  const dataFormatter = (number: Number) => `${number} %`;

  return (
    <Card>
      <Title>Chances of Rain</Title>
      <AreaChart
        data={hourly}
        showLegend
        index="time"
        categories={['Rain (%)']}
        colors={['blue']}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};
