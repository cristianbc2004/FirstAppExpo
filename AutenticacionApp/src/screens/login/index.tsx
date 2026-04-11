import { startTransition, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { AuthShell } from "@/components/auth-shell";
import { FormTextField } from "@/components/form-text-field";
import { PrimaryButton } from "@/components/primary-button";
import { StatusMessage } from "@/components/status-message";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema, type LoginSchema } from "@/validations/login-schema";

export function LoginScreen() {
  const router = useRouter();
  const { isSupabaseConfigured, signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await signIn(values.email, values.password);
      router.replace("/home");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to login right now.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Login to continue"
      subtitle="Use your email and password to access the protected home screen."
      footer={
        <View className="flex-row items-center justify-center gap-1">
          <Text className="text-sm text-slate-400">Need an account?</Text>
          <Pressable
            onPress={() => {
              startTransition(() => router.push("/register"));
            }}
          >
            <Text className="text-sm font-semibold text-primary-300">Register</Text>
          </Pressable>
        </View>
      }
    >
      <View className="gap-4">
        {!isSupabaseConfigured ? (
          <StatusMessage
            message="Create a .env file from .env.example and add your Supabase credentials before testing auth."
          />
        ) : null}

        {errorMessage ? <StatusMessage message={errorMessage} tone="error" /> : null}

        <FormTextField
          autoCapitalize="none"
          control={control}
          keyboardType="email-address"
          label="Email"
          name="email"
          placeholder="you@example.com"
        />

        <FormTextField
          autoCapitalize="none"
          control={control}
          label="Password"
          name="password"
          placeholder="Minimum 6 characters"
          secureTextEntry
        />

        <PrimaryButton label="Login" loading={isSubmitting} onPress={onSubmit} />

        <Link href="/register" asChild>
          <Pressable className="items-center py-1">
            <Text className="text-sm font-medium text-slate-400">
              New here? <Text className="text-primary-300">Create an account</Text>
            </Text>
          </Pressable>
        </Link>
      </View>
    </AuthShell>
  );
}
