import { ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';

type WeatherStateProps = {
  isLoading: boolean;
  errorMessage?: string;
  hasData: boolean;
  loadingLabel: string;
  children: ReactNode;
};

function weatherState({ isLoading, errorMessage, hasData, loadingLabel, children }: WeatherStateProps) {
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (isLoading) {
    return (
      <Animated.View style={animatedStyle} className="gap-3 rounded-[32px] bg-paper p-6 shadow-soft">
        <View className="h-5 w-32 rounded-full bg-cloud" />
        <View className="h-12 w-24 rounded-full bg-cloud" />
        <View className="h-4 w-48 rounded-full bg-cloud" />
        <AppText variant="caption">{loadingLabel}</AppText>
      </Animated.View>
    );
  }

  if (errorMessage) {
    return (
      <View className="rounded-[32px] bg-paper p-6 shadow-soft">
        <AppText variant="title">Something went wrong</AppText>
        <AppText variant="body" className="mt-2 text-slate">
          {errorMessage}
        </AppText>
      </View>
    );
  }

  if (!hasData) {
    return (
      <View className="rounded-[32px] bg-paper p-6 shadow-soft">
        <AppText variant="body">Search for a city to load forecast data.</AppText>
      </View>
    );
  }

  return <>{children}</>;
}

const WeatherState = weatherState;

export { WeatherState, weatherState };