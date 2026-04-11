import { Link } from 'expo-router';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ScreenContainer } from '@/components/ui/screen-container';
import { AppButton } from '@/components/ui/app-button';
import { AppText } from '@/components/ui/app-text';
import { WeatherPreviewCard } from '@/features/weather/components/weather-preview-card';

function homeScreen() {
  return (
    <ScreenContainer> {/* Esta componente es la de la vista, para que todas se vean asi */}
      <View className="flex-1 justify-between">
        <View className="gap-6">
          <Animated.View entering={FadeInDown.duration(500)} className="gap-3">
            <AppText variant="eyebrow">Weather dashboard</AppText>
            <AppText variant="hero">Track the forecast with a clean Expo starter.</AppText>
            <AppText variant="body" className="text-slate">
              NativeWind styles every screen, the search form uses React Hook Form + Zod, and weather data comes from OpenWeatherMap.
            </AppText>
          </Animated.View>

          <WeatherPreviewCard city="Madrid" />
        </View>

        <Link href="/search" asChild>
          <AppButton label="Search weather by city" />
        </Link>
      </View>
    </ScreenContainer>
  );
}

const HomeScreen = homeScreen;

export default HomeScreen;