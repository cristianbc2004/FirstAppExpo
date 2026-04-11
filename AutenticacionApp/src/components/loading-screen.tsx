import { ActivityIndicator, Text, View } from "react-native";

type LoadingScreenProps = {
  message: string;
};

export function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-950 px-6">
      <ActivityIndicator color="#60a5fa" size="large" />
      <Text className="mt-4 text-center text-base text-slate-200">{message}</Text>
    </View>
  );
}
