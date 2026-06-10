import { Text, TextInput, View, type KeyboardTypeOptions } from "react-native";

type AppInputProps = {
  error?: string;
  helperText?: string;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  value: string;
};

export function AppInput({
  error,
  helperText,
  keyboardType = "default",
  label,
  onChangeText,
  placeholder,
  value
}: AppInputProps) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-semibold text-neutral-700">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        className={`h-12 rounded-xl border bg-white px-4 text-base text-neutral-900 ${
          error ? "border-error" : "border-neutral-200 focus:border-primary-600"
        }`}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B7A88"
        value={value}
      />
      {error ? <Text className="text-sm text-error">{error}</Text> : null}
      {!error && helperText ? <Text className="text-sm text-neutral-500">{helperText}</Text> : null}
    </View>
  );
}
