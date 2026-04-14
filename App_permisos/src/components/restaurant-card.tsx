import { theme } from '@/constants/theme';
import { Restaurant } from '@/types/restaurant';
import { formatDistance } from '@/utils/location';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type RestaurantCardProps = {
  restaurant: Restaurant;
  index: number;
  onPress: () => void;
};

export function RestaurantCard({ restaurant, index, onPress }: RestaurantCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInUp.delay(index * 70).springify()} style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.98);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        style={styles.card}
      >
        <View style={styles.row}>
          <View style={styles.content}>
            <Text numberOfLines={1} style={styles.name}>
              {restaurant.name}
            </Text>
            <Text numberOfLines={1} style={styles.cuisine}>
              {restaurant.cuisine}
            </Text>
          </View>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>{formatDistance(restaurant.distanceMeters)}</Text>
          </View>
        </View>

        <Text numberOfLines={2} style={styles.address}>
          {restaurant.address}
        </Text>
        <Text numberOfLines={1} style={styles.openingHours}>
          {restaurant.isOpenLabel}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    gap: theme.spacing.sm,
    padding: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 3,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  cuisine: {
    color: theme.colors.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  distanceBadge: {
    backgroundColor: '#efe3d0',
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
  },
  distanceText: {
    color: theme.colors.primaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  address: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  openingHours: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
});
