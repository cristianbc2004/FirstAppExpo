// este archivo lo unico que hace es mostrar que se esta buscando restaurantes cercanos.
import { theme } from '@/constants/theme';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export function LoadingState() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
      <Text style={styles.title}>Looking for nearby restaurants...</Text>
      <Text style={styles.description}>
        Please keep location enabled while we get the closest spots.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
});
