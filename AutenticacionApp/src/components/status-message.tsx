import { Text, View } from "react-native";

type StatusMessageProps = {
  tone?: "error" | "info" | "success";
  message: string;
};

export function StatusMessage({ message, tone = "info" }: StatusMessageProps) {
  const toneClassName =
    tone === "error"
      ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
      : tone === "success"
        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
        : "border-primary-500/40 bg-primary-500/10 text-primary-100";

  return (
    <View className={`rounded-2xl border px-4 py-3 ${toneClassName}`}>
      <Text className="text-sm">{message}</Text>
    </View>
  );
}
