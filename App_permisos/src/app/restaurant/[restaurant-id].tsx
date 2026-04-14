import { theme } from '@/constants/theme';
import { useRestaurants } from '@/context/restaurants-context';
import { formatDistance } from '@/utils/location';
import { useLocalSearchParams } from 'expo-router';
import * as Linking from 'expo-linking';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function RestaurantDetailsScreen() {
  const params = useLocalSearchParams<{ 'restaurant-id': string }>();
  const { restaurants } = useRestaurants();
  const restaurant = restaurants.find((item) => item.id === params['restaurant-id']);

  if (!restaurant) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackTitle}>Restaurant not available</Text>
        <Text style={styles.fallbackText}>
          Open this page from the nearby list after the restaurants finish loading.
        </Text>
      </View>
    );
  }

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`;

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.contentContainer}
      entering={FadeIn.duration(400)}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.duration(500)} style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Selected place</Text>
        <Text style={styles.heroTitle}>{restaurant.name}</Text>
        <Text style={styles.heroSubtitle}>{restaurant.cuisine}</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120).duration(500)} style={styles.infoCard}>
        <Text style={styles.label}>Distance</Text>
        <Text style={styles.value}>{formatDistance(restaurant.distanceMeters)}</Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{restaurant.address}</Text>

        <Text style={styles.label}>Hours</Text>
        <Text style={styles.value}>{restaurant.isOpenLabel}</Text>

        {restaurant.phone ? (
          <>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{restaurant.phone}</Text>
          </>
        ) : null}

        {restaurant.website ? (
          <>
            <Text style={styles.label}>Website</Text>
            <Text style={styles.linkText}>{restaurant.website}</Text>
          </>
        ) : null}
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(220).duration(500)} style={styles.actionsRow}>
        <Pressable
          onPress={() => {
            Linking.openURL(mapsUrl);
          }}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Open in Maps</Text>
        </Pressable>

        {restaurant.website ? (
          <Pressable
            onPress={() => {
              Linking.openURL(restaurant.website!);
            }}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Visit website</Text>
          </Pressable>
        ) : null}
      </Animated.View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: theme.spacing.lg,
    padding: theme.spacing.lg,
    paddingBottom: 80,
  },
  heroCard: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
  },
  heroEyebrow: {
    color: '#daf3ec',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#f7fffc',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
    marginTop: theme.spacing.sm,
  },
  heroSubtitle: {
    color: '#daf3ec',
    fontSize: 15,
    fontWeight: '600',
    marginTop: theme.spacing.sm,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    gap: 6,
    padding: theme.spacing.xl,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: theme.spacing.sm,
    textTransform: 'uppercase',
  },
  value: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  linkText: {
    color: theme.colors.primaryDark,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  actionsRow: {
    gap: theme.spacing.md,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  primaryButtonText: {
    color: '#fff8f3',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  secondaryButtonText: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  fallbackTitle: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  fallbackText: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: theme.spacing.sm,
  },
});
