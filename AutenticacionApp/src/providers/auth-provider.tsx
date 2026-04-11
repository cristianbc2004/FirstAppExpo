import type { PropsWithChildren } from "react";

import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const sessionStorageKey = "autentication-app-expo-session";

type AppUser = {
  email: string;
  id: number;
  name: string;
};

type AuthContextValue = {
  initialized: boolean;
  isSupabaseConfigured: boolean;
  session: AppUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;

    if (typeof message === "string" && message.trim().length > 0) {
      return message;
    }
  }

  return fallbackMessage;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [initialized, setInitialized] = useState(false);
  const [session, setSession] = useState<AppUser | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(sessionStorageKey)
      .then((storedSession) => {
        if (storedSession) {
          setSession(JSON.parse(storedSession) as AppUser);
        }
      })
      .finally(() => {
        setInitialized(true);
      });
  }, []);

  const value: AuthContextValue = {
    initialized,
    isSupabaseConfigured,
    session,
    signIn: async (email, password) => {
      if (!isSupabaseConfigured) {
        throw new Error("Add your Supabase URL and publishable key to start authenticating.");
      }

      const { data, error } = await supabase
        .from("User")
        .select("id, name, email")
        .eq("email", email)
        .eq("password", password)
        .maybeSingle();

      if (error || !data) {
        throw new Error("Invalid email or password.");
      }

      const nextSession: AppUser = {
        email: data.email,
        id: data.id,
        name: data.name,
      };

      await AsyncStorage.setItem(sessionStorageKey, JSON.stringify(nextSession));
      setSession(nextSession);
    },
    signOut: async () => {
      await AsyncStorage.removeItem(sessionStorageKey);
      setSession(null);
    },
    signUp: async (name, email, password) => {
      if (!isSupabaseConfigured) {
        throw new Error("Add your Supabase URL and publishable key before creating users.");
      }

      const { data: existingUser, error: existingUserError } = await supabase
        .from("User")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (existingUserError) {
        throw new Error(getErrorMessage(existingUserError, "Unable to validate this email."));
      }

      if (existingUser) {
        throw new Error("This email is already registered.");
      }

      const { data: lastUser, error: lastUserError } = await supabase
        .from("User")
        .select("id")
        .order("id", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (lastUserError) {
        throw new Error(getErrorMessage(lastUserError, "Unable to prepare the new user id."));
      }

      const nextId = (lastUser?.id ?? 0) + 1;

      const { error } = await supabase.from("User").insert({
        email,
        id: nextId,
        name,
        password,
      });

      if (error) {
        throw new Error(getErrorMessage(error, "Unable to create the account."));
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
