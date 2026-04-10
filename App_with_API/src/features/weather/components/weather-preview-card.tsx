import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';

type WeatherPreviewCardProps = {
  city: string;
};

function weatherPreviewCard({ city }: WeatherPreviewCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(120).duration(500)} className="rounded-[32px] bg-storm p-6 shadow-soft">
      <View className="gap-3">
        <AppText variant="eyebrow" className="text-cloud">Starter flow</AppText>
        <AppText variant="title" className="text-paper">Default city: {city}</AppText>
        <AppText variant="body" className="text-cloud">
          Open the search form or jump directly into the details route to see the API integration in action.
        </AppText>
        <Link href={{ pathname: '/weather/[city]', params: { city } }} asChild>
          <Pressable className="mt-3 self-start rounded-full bg-paper px-4 py-3">
            <AppText variant="label" className="text-storm">Open weather details</AppText>
          </Pressable>
        </Link>
      </View>
    </Animated.View>
  );
}

const WeatherPreviewCard = weatherPreviewCard;

export { WeatherPreviewCard, weatherPreviewCard };