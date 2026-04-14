import { theme } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

type LocationHeroProps = {
  restaurantCount: number;
};

export function LocationHero({ restaurantCount }: LocationHeroProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>NearBites</Text>
      <Text style={styles.title}>Restaurants close to your live location</Text>
      <Text style={styles.description}>
        We use your phone&apos;s GPS to find nearby places to eat and rank them by distance.
      </Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{restaurantCount} places loaded</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  eyebrow: {
    color: '#ffe7db',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#fff7f2',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },
  description: {
    color: '#ffe7db',
    fontSize: 15,
    lineHeight: 22,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 247, 242, 0.16)',
    borderRadius: theme.radius.pill,
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  badgeText: {
    color: '#fffaf3',
    fontSize: 13,
    fontWeight: '700',
  },
});
