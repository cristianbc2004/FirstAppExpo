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

type OpenWeatherErrorResponse = {
  cod?: string | number;
  message?: string;
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

async function readErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as OpenWeatherErrorResponse;
    return payload.message?.trim() ?? '';
  } catch {
    return '';
  }
}

async function fetchWeatherByCity(city: string): Promise<WeatherDetails> {
  if (!env.openWeatherApiKey) {
    throw new Error('Missing EXPO_PUBLIC_OPENWEATHER_API_KEY. Add it to your .env file before running the app.');
  }

  const url = `${weatherBaseUrl}?q=${encodeURIComponent(city)}&appid=${env.openWeatherApiKey}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    const apiMessage = await readErrorMessage(response);

    if (response.status === 401) {
      throw new Error('OpenWeather rejected the API key. Confirm the key is correct and active, then try again in a few minutes.');
    }

    if (response.status === 404) {
      throw new Error('City not found. Try another search term.');
    }

    if (response.status === 429) {
      throw new Error('OpenWeather rate limit reached. Wait a moment and try again.');
    }

    if (apiMessage) {
      throw new Error(`OpenWeather error: ${apiMessage}.`);
    }

    throw new Error(`Weather service is unavailable right now (HTTP ${response.status}).`);
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