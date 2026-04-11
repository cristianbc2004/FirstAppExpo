import type { PropsWithChildren } from "react";

import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AuthShellProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
}>;

export function AuthShell({ children, eyebrow, title, subtitle, footer }: AuthShellProps) {
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-10"
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-8">
            <Animated.View entering={FadeInUp.duration(650)} className="gap-3">
              <Text className="text-sm font-semibold uppercase tracking-[2px] text-primary-300">
                {eyebrow}
              </Text>
              <Text className="text-4xl font-bold text-white">{title}</Text>
              <Text className="text-base leading-6 text-slate-300">{subtitle}</Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(700)}
              className="rounded-[28px] border border-white/10 bg-slate-900/90 p-6 shadow-card"
            >
              {children}
            </Animated.View>

            {footer ? (
              <Animated.View entering={FadeInDown.delay(150).duration(650)}>
                {footer}
              </Animated.View>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
