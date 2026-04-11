import type { ComponentProps } from "react";

import { ActivityIndicator, Pressable, Text } from "react-native";

type PrimaryButtonProps = ComponentProps<typeof Pressable> & {
  label: string;
  loading?: boolean;
  tone?: "primary" | "secondary";
};

export function PrimaryButton({
  disabled,
  label,
  loading = false,
  tone = "primary",
  ...props
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;
  const toneClassName =
    tone === "primary"
      ? "bg-primary-500 active:bg-primary-600"
      : "bg-slate-800 active:bg-slate-700";

  return (
    <Pressable
      accessibilityRole="button"
      className={`min-h-14 items-center justify-center rounded-2xl ${toneClassName} ${isDisabled ? "opacity-60" : ""}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className="text-base font-semibold text-white">{label}</Text>
      )}
    </Pressable>
  );
}
