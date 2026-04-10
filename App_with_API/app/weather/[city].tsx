import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ScreenContainer } from '@/components/ui/screen-container';
import { AppText } from '@/components/ui/app-text';
import { WeatherDetailsCard } from '@/features/weather/components/weather-details-card';
import { WeatherState } from '@/features/weather/components/weather-state';
import { useWeatherQuery } from '@/features/weather/hooks/use-weather-query';

function weatherDetailsScreen() {
  const params = useLocalSearchParams<{ city?: string }>();
  const city = Array.isArray(params.city) ? params.city[0] : params.city ?? '';
  const weatherQuery = useWeatherQuery(city);

  return (
    <ScreenContainer scrollable>
      <Stack.Screen options={{ headerShown: true, title: city || 'Weather details' }} />

      <View className="gap-6">
        <Animated.View entering={FadeInDown.duration(400)} className="gap-3">
          <AppText variant="eyebrow">Live weather</AppText>
          <AppText variant="title">{city}</AppText>
          <AppText variant="body" className="text-slate">
            Forecast data is fetched from OpenWeatherMap using an API key loaded from environment variables.
          </AppText>
        </Animated.View>

        <WeatherState
          isLoading={weatherQuery.isLoading}
          errorMessage={weatherQuery.errorMessage ?? undefined}
          hasData={Boolean(weatherQuery.data)}
          loadingLabel="Loading latest forecast..."
        >
          {weatherQuery.data ? <WeatherDetailsCard weather={weatherQuery.data} /> : null}
        </WeatherState>
      </View>
    </ScreenContainer>
  );
}

const WeatherDetailsScreen = weatherDetailsScreen;

export default WeatherDetailsScreen;