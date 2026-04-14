import { theme } from '@/constants/theme';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>We could not load nearby places</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable onPress={onRetry} style={styles.button}>
        <Text style={styles.buttonText}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff4ef',
    borderColor: '#f1d4c8',
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.danger,
    fontSize: 19,
    fontWeight: '800',
  },
  message: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.danger,
    borderRadius: theme.radius.pill,
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  buttonText: {
    color: '#fff8f5',
    fontSize: 14,
    fontWeight: '700',
  },
});
