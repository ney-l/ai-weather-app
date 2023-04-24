interface CurrentWeather {
  is_day: number
  temperature: number
  time: string
  weathercode: number
  winddirection: number
  windspeed: number
}

interface DailyUnits {
  apparent_temperature_max: string
  apparent_temperature_min: string
  sunrise: string
  sunset: string
  temperature_2m_max: string
  temperature_2m_min: string
  time: string
  uv_index_clear_sky_max: string
  uv_index_max: string
  weathercode: string
}

interface Daily {
  apparent_temperature_max: [number]
  apparent_temperature_min: [number]
  sunrise: [string]
  sunset: [string]
  temperature_2m_max: [number]
  temperature_2m_min: [number]
  time: Array<string>
  uv_index_clear_sky_max: [number]
  uv_index_max: [number]
  weathercode: [number]
}

interface Hourly {
  apparent_temperature: Array<number>
  precipitation: Array<number>
  precipitation_probability: Array<number>
  rain: Array<number>
  relativehumidity_2m: Array<number>
  showers: Array<number>
  snow_depth: Array<number>
  snowfall: Array<number>
  temperature_2m: Array<number>
  time: Array<string>
  uv_index: Array<number>
  uv_index_clear_sky: Array<number>
  windgusts_10m: Array<number>
}

interface HourlyUnits {
  apparent_temperature: string
  precipitation: string
  precipitation_probability: string
  rain: string
  relativehumidity_2m: string
  showers: string
  snow_depth: string
  snowfall: string
  temperature_2m: string
  time: string
  uv_index: string
  uv_index_clear_sky: string
  windgusts_10m: string
}

interface Root {
  current_weather: CurrentWeather
  daily: Daily
  daily_units: DailyUnits
  elevation: number
  generationtime_ms: number
  hourly: Hourly
  hourly_units: HourlyUnits
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
}
