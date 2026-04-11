import { Redirect, Stack } from "expo-router";

import { LoadingScreen } from "@/components/loading-screen";
import { useAuth } from "@/hooks/use-auth";

export default function ProtectedLayout() {
  const { initialized, session } = useAuth();

  if (!initialized) {
    return <LoadingScreen message="Loading your home..." />;
  }

  if (!session) {
    return <Redirect href="/login" />;
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
