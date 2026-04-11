import { router } from 'expo-router';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ScreenContainer } from '@/components/ui/screen-container';
import { AppText } from '@/components/ui/app-text';
import { CitySearchForm } from '@/features/weather/components/city-search-form';

function searchScreen() {
  return (
    <ScreenContainer scrollable keyboardShouldPersistTaps="handled">
      <View className="gap-8">
        <Animated.View entering={FadeInDown.duration(400)} className="gap-3">
          <AppText variant="eyebrow">Find a forecast</AppText>
          <AppText variant="title">Search by city</AppText>
          <AppText variant="body" className="text-slate">
            Type a city and we will validate the form before opening a dedicated weather details screen.
          </AppText>
        </Animated.View>

        {/* En esta parte es donde se valida con React Hook Form + Zod
        Ademas no podemos usar link directamente ya que no sabemos hacia donde vamos */}
        <CitySearchForm
          onSubmitCity={(city) => {
            router.push({ pathname: '/weather/[city]', params: { city } });
          }}
        />
      </View>
    </ScreenContainer>
  );
}

const SearchScreen = searchScreen;

export default SearchScreen;