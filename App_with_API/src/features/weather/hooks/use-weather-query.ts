import { useEffect, useState } from 'react';

import { WeatherDetails, fetchWeatherByCity } from '@/features/weather/services/weather-service';

type WeatherQueryState = {
  data: WeatherDetails | null;
  isLoading: boolean;
  errorMessage: string | null;
};

function useWeatherQuery(city: string) {
  const [state, setState] = useState<WeatherQueryState>({
    data: null,
    isLoading: false,
    errorMessage: null,
  });

  useEffect(() => {
    let isMounted = true;

    if (!city) {
      setState({ data: null, isLoading: false, errorMessage: null });
      return;
    }

    const loadWeather = async () => {
      setState({ data: null, isLoading: true, errorMessage: null });

      try {
        const weather = await fetchWeatherByCity(city);

        if (isMounted) {
          setState({ data: weather, isLoading: false, errorMessage: null });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to load weather data.';

        if (isMounted) {
          setState({ data: null, isLoading: false, errorMessage: message });
        }
      }
    };

    loadWeather();

    return () => {
      isMounted = false;
    };
  }, [city]);

  return state;
}

export { useWeatherQuery };