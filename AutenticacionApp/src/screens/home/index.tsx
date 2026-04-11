import { useState } from "react";

import Animated, { FadeInDown, FadeInUp, LinearTransition } from "react-native-reanimated";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/primary-button";
import { useAuth } from "@/hooks/use-auth";

export function HomeScreen() {
  const { session, signOut } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignOut = async () => {
    setIsSubmitting(true);

    try {
      await signOut();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="flex-1 px-6 py-10">
        <Animated.View entering={FadeInUp.duration(650)} className="gap-3">
          <Text className="text-sm font-semibold uppercase tracking-[2px] text-primary-300">
            Home
          </Text>
          <Text className="text-4xl font-bold text-white">You are logged in.</Text>
          <Text className="text-base leading-6 text-slate-300">
            This screen is protected by Expo Router route groups and the current Supabase session.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(100).duration(700)}
          layout={LinearTransition.springify()}
          className="mt-8 gap-4 rounded-[28px] border border-white/10 bg-slate-900/90 p-6"
        >
          <View className="gap-2">
            <Text className="text-sm font-medium text-slate-400">User name</Text>
            <Text className="text-lg font-semibold text-white">
              {session?.name ?? "No name available"}
            </Text>
          </View>

          <View className="gap-2">
            <Text className="text-sm font-medium text-slate-400">Authenticated email</Text>
            <Text className="text-lg font-semibold text-white">
              {session?.email ?? "No email available"}
            </Text>
          </View>

          <View className="gap-2">
            <Text className="text-sm font-medium text-slate-400">User id</Text>
            <Text className="text-sm text-slate-200">{session?.id ?? "No user id"}</Text>
          </View>

          <PrimaryButton label="Sign out" loading={isSubmitting} onPress={handleSignOut} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
