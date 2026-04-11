import { startTransition, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { AuthShell } from "@/components/auth-shell";
import { FormTextField } from "@/components/form-text-field";
import { PrimaryButton } from "@/components/primary-button";
import { StatusMessage } from "@/components/status-message";
import { useAuth } from "@/hooks/use-auth";
import { registerSchema, type RegisterSchema } from "@/validations/register-schema";

export function RegisterScreen() {
  const router = useRouter();
  const { isSupabaseConfigured, signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<RegisterSchema>({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await signUp(values.fullName, values.email, values.password);
      reset();
      setSuccessMessage("Account created successfully. Redirecting you to login...");

      setTimeout(() => {
        startTransition(() => router.replace("/login"));
      }, 900);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to register right now.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <AuthShell
      eyebrow="New account"
      title="Register your profile"
      subtitle="Create a Supabase user and return to the login screen when registration finishes."
      footer={
        <View className="flex-row items-center justify-center gap-1">
          <Text className="text-sm text-slate-400">Already have an account?</Text>
          <Pressable
            onPress={() => {
              startTransition(() => router.replace("/login"));
            }}
          >
            <Text className="text-sm font-semibold text-primary-300">Login</Text>
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
        {successMessage ? <StatusMessage message={successMessage} tone="success" /> : null}

        <FormTextField
          autoCapitalize="words"
          control={control}
          label="Full name"
          name="fullName"
          placeholder="Cristian Example"
        />

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

        <PrimaryButton label="Register" loading={isSubmitting} onPress={onSubmit} />
      </View>
    </AuthShell>
  );
}
