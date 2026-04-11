import type { PropsWithChildren } from "react";
import type { Session } from "@supabase/supabase-js";

import { createContext, useEffect, useState } from "react";

import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type AuthContextValue = {
  initialized: boolean;
  isSupabaseConfigured: boolean;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (fullName: string, email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [initialized, setInitialized] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setInitialized(true);
      return;
    }

    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (isMounted) {
          setSession(data.session);
          setInitialized(true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setInitialized(true);
        }
      });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    initialized,
    isSupabaseConfigured,
    session,
    signIn: async (email, password) => {
      if (!isSupabaseConfigured) {
        throw new Error("Add your Supabase URL and anon key to start authenticating.");
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }
    },
    signOut: async () => {
      if (!isSupabaseConfigured) {
        return;
      }

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }
    },
    signUp: async (fullName, email, password) => {
      if (!isSupabaseConfigured) {
        throw new Error("Add your Supabase URL and anon key before creating users.");
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            fullName,
          },
        },
      });

      if (error) {
        throw error;
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
