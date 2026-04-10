import { TextInput, TextInputProps, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { cn } from '@/utils/cn';

type AppInputProps = TextInputProps & {
  label: string;
  hint?: string;
  errorMessage?: string;
};

function appInput({ label, hint, errorMessage, className, ...props }: AppInputProps) {
  return (
    <View className="gap-2">
      <AppText variant="label">{label}</AppText>
      <TextInput
        placeholderTextColor="#6b7c93"
        className={cn(
          'min-h-14 rounded-3xl border border-cloud bg-paper px-4 text-base text-ink',
          errorMessage ? 'border-red-400' : 'border-cloud',
          className,
        )}
        {...props}
      />
      {errorMessage ? <AppText variant="caption" className="text-red-500">{errorMessage}</AppText> : null}
      {!errorMessage && hint ? <AppText variant="caption">{hint}</AppText> : null}
    </View>
  );
}

const AppInput = appInput;

export { AppInput, appInput };