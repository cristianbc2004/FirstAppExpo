import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { AppInput } from '@/components/ui/app-input';
import { citySchema, type CitySchema } from '@/features/weather/schemas/city-schema';

type CitySearchFormProps = {
  onSubmitCity: (city: string) => void;
};

function citySearchForm({ onSubmitCity }: CitySearchFormProps) {
  const form = useForm<CitySchema>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      city: '',
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    onSubmitCity(values.city.trim());
  });

  return (
    <View className="gap-5 rounded-[32px] bg-paper p-5 shadow-soft">
      <AppInput
        label="City"
        placeholder="Example: Madrid"
        autoCapitalize="words"
        autoCorrect={false}
        returnKeyType="search"
        value={form.watch('city')}
        onChangeText={(value) => form.setValue('city', value, { shouldValidate: true })}
        onSubmitEditing={handleSubmit}
        errorMessage={form.formState.errors.city?.message}
        hint="Use the city name only for the OpenWeatherMap demo endpoint."
      />

      <AppButton
        label={form.formState.isSubmitting ? 'Searching...' : 'See forecast'}
        onPress={handleSubmit}
        disabled={form.formState.isSubmitting}
      />
    </View>
  );
}

const CitySearchForm = citySearchForm;

export { CitySearchForm, citySearchForm };