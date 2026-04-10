import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import type { WeatherDetails } from '@/features/weather/services/weather-service';

type WeatherDetailsCardProps = {
  weather: WeatherDetails;
};

function weatherDetailsCard({ weather }: WeatherDetailsCardProps) {
  return (
    <Animated.View entering={FadeInDown.duration(450)} className="gap-5 rounded-[32px] bg-paper p-6 shadow-soft">
      <View className="gap-1">
        <AppText variant="eyebrow">Current conditions</AppText>
        <AppText variant="hero">{Math.round(weather.temperature)}Â°C</AppText>
        <AppText variant="body" className="capitalize text-slate">
          {weather.description}
        </AppText>
      </View>

      <View className="flex-row flex-wrap gap-4">
        <View className="min-w-[45%] rounded-3xl bg-mist p-4">
          <AppText variant="label">Feels like</AppText>
          <AppText variant="title">{Math.round(weather.feelsLike)}Â°C</AppText>
        </View>
        <View className="min-w-[45%] rounded-3xl bg-mist p-4">
          <AppText variant="label">Humidity</AppText>
          <AppText variant="title">{weather.humidity}%</AppText>
        </View>
        <View className="min-w-[45%] rounded-3xl bg-mist p-4">
          <AppText variant="label">Wind</AppText>
          <AppText variant="title">{weather.windSpeed} m/s</AppText>
        </View>
        <View className="min-w-[45%] rounded-3xl bg-mist p-4">
          <AppText variant="label">Pressure</AppText>
          <AppText variant="title">{weather.pressure} hPa</AppText>
        </View>
      </View>
    </Animated.View>
  );
}

const WeatherDetailsCard = weatherDetailsCard;

export { WeatherDetailsCard, weatherDetailsCard };