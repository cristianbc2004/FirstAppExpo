import { Pressable, PressableProps, Text } from 'react-native';

import { cn } from '@/utils/cn';

type AppButtonProps = PressableProps & {
  label: string;
  className?: string;
};

function appButton({ label, disabled, className, ...props }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      {...props}
      className={cn(
        'min-h-14 items-center justify-center rounded-3xl bg-storm px-6',
        disabled ? 'opacity-50' : 'active:opacity-90',
        className,
      )}
    >
      <Text className="text-base font-semibold text-paper">{label}</Text>
    </Pressable>
  );
}

const AppButton = appButton;

export { AppButton, appButton };