import type { Control, FieldValues, Path } from "react-hook-form";

import { Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

type FormTextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address";
};

export function FormTextField<TFieldValues extends FieldValues>({
  autoCapitalize = "none",
  control,
  keyboardType = "default",
  label,
  name,
  placeholder,
  secureTextEntry = false,
}: FormTextFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
        <View className="gap-2">
          <Text className="text-sm font-medium text-slate-200">{label}</Text>
          <TextInput
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-base text-white"
            keyboardType={keyboardType}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor="#64748b"
            secureTextEntry={secureTextEntry}
            value={typeof value === "string" ? value : ""}
          />
          {error ? <Text className="text-sm text-rose-400">{error.message}</Text> : null}
        </View>
      )}
    />
  );
}
