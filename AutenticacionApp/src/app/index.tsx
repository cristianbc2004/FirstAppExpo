import { Redirect } from "expo-router";

import { LoadingScreen } from "@/components/loading-screen";
import { useAuth } from "@/hooks/use-auth";

export default function IndexRoute() {
  const { initialized, session } = useAuth();

  if (!initialized) {
    return <LoadingScreen message="Checking your session..." />;
  }

  return <Redirect href={session ? "/home" : "/login"} />;
}
