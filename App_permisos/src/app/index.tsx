import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { LocationHero } from '@/components/location-hero';
import { RestaurantCard } from '@/components/restaurant-card';
import { theme } from '@/constants/theme';
import { useNearbyRestaurants } from '@/hooks/use-nearby-restaurants'; // logica de obtencion de permisos.
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { restaurants, isLoading, errorMessage, refreshRestaurants, userLocation } =
    useNearbyRestaurants();

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <LocationHero restaurantCount={restaurants.length} />

      {userLocation ? (
        <View style={styles.locationBanner}>
          <Text style={styles.locationTitle}>Your current coordinates</Text>
          <Text style={styles.locationValue}>
            {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
          </Text>
        </View>
      ) : null}

      {isLoading ? <LoadingState /> : null}

      {!isLoading && errorMessage ? (
        <ErrorState message={errorMessage} onRetry={refreshRestaurants} />
      ) : null}

      {!isLoading && !errorMessage ? (
        <View style={styles.list}>
          <Text style={styles.sectionTitle}>Closest restaurants</Text>
          {restaurants.map((restaurant, index) => (
            <RestaurantCard
              index={index}
              key={restaurant.id}
              onPress={() => {
                router.push({
                  pathname: '/restaurant/[restaurant-id]', // teniendo ya la info de los restaurantes, los devolvemos.
                  params: { 'restaurant-id': restaurant.id },
                });
              }}
              restaurant={restaurant}
            />
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: theme.spacing.lg,
    padding: theme.spacing.lg,
    paddingBottom: 80,
  },
  locationBanner: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  locationTitle: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  locationValue: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  list: {
    gap: theme.spacing.md,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
});
