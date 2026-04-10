import { env } from '@/config/env';

const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

type OpenWeatherResponse = {
  name: string;
  weather: Array<{ description: string }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
};

type WeatherDetails = {
  city: string;
  description: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
};

async function fetchWeatherByCity(city: string): Promise<WeatherDetails> {
  if (!env.openWeatherApiKey) {
    throw new Error('Missing EXPO_PUBLIC_OPENWEATHER_API_KEY. Add it to your .env file before running the app.');
  }

  const url = `${weatherBaseUrl}?q=${encodeURIComponent(city)}&appid=${env.openWeatherApiKey}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Try another search term.');
    }

    throw new Error('Weather service is unavailable right now.');
  }

  const payload = (await response.json()) as OpenWeatherResponse;

  return {
    city: payload.name,
    description: payload.weather[0]?.description ?? 'No description available',
    temperature: payload.main.temp,
    feelsLike: payload.main.feels_like,
    humidity: payload.main.humidity,
    pressure: payload.main.pressure,
    windSpeed: payload.wind.speed,
  };
}

export { fetchWeatherByCity };
export type { WeatherDetails };