import { Text, TextProps } from 'react-native';

import { cn } from '@/utils/cn';

type AppTextProps = TextProps & {
  variant?: 'hero' | 'title' | 'eyebrow' | 'body' | 'label' | 'caption';
};

const variantStyles: Record<NonNullable<AppTextProps['variant']>, string> = {
  hero: 'text-4xl font-bold leading-tight text-ink',
  title: 'text-3xl font-bold leading-tight text-ink',
  eyebrow: 'text-sm font-semibold uppercase tracking-[2px] text-rain',
  body: 'text-base leading-7 text-ink',
  label: 'text-sm font-semibold text-ink',
  caption: 'text-sm leading-6 text-slate',
};

function appText({ variant = 'body', className, ...props }: AppTextProps) {
  return <Text className={cn(variantStyles[variant], className)} {...props} />;
}

const AppText = appText;

export { AppText, appText };