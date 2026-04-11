import { Redirect, Stack } from "expo-router";

import { LoadingScreen } from "@/components/loading-screen";
import { useAuth } from "@/hooks/use-auth";

export default function AuthLayout() {
  const { initialized, session } = useAuth();

  if (!initialized) {
    return <LoadingScreen message="Preparing authentication..." />;
  }

  if (session) {
    return <Redirect href="/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    />
  );
}
