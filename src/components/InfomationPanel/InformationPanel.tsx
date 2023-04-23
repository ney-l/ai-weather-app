import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { CityPicker } from '@/components/CityPicker';
import { parseWeatherCode } from '@/utils';

type Props = {
  city: string;
  results: Root;
  lat: string;
  long: string;
};

export const InformationPanel = ({ city, lat, long, results }: Props) => {
  const weather = parseWeatherCode[results.current_weather.weathercode];
  return (
    <div className="bg-gradient-to-br text-white p-10">
      <div className="pb-5">
        <h1 className="text-6xl font-bold">{decodeURI(city)}</h1>
        <p className="text-xs text-gray-400 pt-5">
          Long/Lat: {long}, {lat}
        </p>
      </div>

      <CityPicker />

      <hr className="my-10" />

      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString('en-DE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <p className="font-extralight">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>

        <p className="text-xl font-bold uppercase">
          {new Date().toLocaleTimeString('en-DE', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })}
        </p>
      </div>

      <hr className="mt-10 mb-5" />

      <div className="flex items-center justify-between">
        <div>
          {/* image */}
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${weather.icon}.png`}
            alt={weather.label}
            width={75}
            height={75}
          />
          <div className="flex items-center justify-between space-x-10">
            <p className="text-6xl font-semibold">
              {results.current_weather.temperature.toFixed(1)}°C
            </p>
            <p className="text-right font-extralight text-lg">
              {/* weather code */}
              {weather.label}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 py-5">
        <SolarTile date={results.daily.sunrise[0]} label="Sunrise">
          <SunIcon className="h-10 w-10 text-gray-400" />
        </SolarTile>
        <SolarTile date={results.daily.sunset[0]} label="Sunset">
          <MoonIcon className="h-10 w-10 text-gray-400" />
        </SolarTile>
      </div>
    </div>
  );
};

type SolarTileProps = {
  date: string;
  label: string;
  children: React.ReactNode;
};

function SolarTile({ date, label, children }: SolarTileProps) {
  const time = new Date(date).toLocaleTimeString('en-DE', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  return (
    <div className="flex items-center space-x-2 px-4 py-3 border border-[#6f90cd] rounded-md text-gray-400 bg-[#405885]">
      {children}

      <div className="flex flex-1 justify-between items-center">
        <p className="font-extralight">Sunrise</p>
        <p className="uppercase text-2xl text-white">{time}</p>
      </div>
    </div>
  );
}
