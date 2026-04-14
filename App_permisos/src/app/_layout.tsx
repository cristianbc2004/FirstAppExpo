import { theme } from '@/constants/theme';
import { RestaurantsProvider } from '@/context/restaurants-context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <RestaurantsProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            color: theme.colors.text,
            fontWeight: '700',
          },
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'NearBites',
            headerLargeTitle: true,
          }}
        />
        <Stack.Screen
          name="restaurant/[restaurant-id]"
          options={{
            title: 'Restaurant details',
          }}
        />
      </Stack>
    </RestaurantsProvider>
  );
}
