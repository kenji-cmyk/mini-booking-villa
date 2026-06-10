import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

type AppButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  size?: "small" | "medium" | "large";
  variant?: "danger" | "ghost" | "primary" | "secondary";
};

export function AppButton({
  children,
  disabled = false,
  isLoading = false,
  onPress,
  size = "large",
  variant = "primary"
}: AppButtonProps) {
  const sizeClassName = {
    small: "h-9 px-4",
    medium: "h-11 px-5",
    large: "h-[52px] px-6"
  }[size];
  const variantClassName = {
    danger: "bg-error active:opacity-90",
    ghost: "bg-transparent active:bg-neutral-100",
    primary: "bg-primary-600 active:bg-primary-700",
    secondary: "border border-primary-600 bg-white active:bg-neutral-50"
  }[variant];
  const textClassName = {
    danger: "font-semibold text-white",
    ghost: "font-semibold text-primary-700",
    primary: "font-semibold text-white",
    secondary: "font-semibold text-primary-700"
  }[variant];

  return (
    <Pressable
      accessibilityRole="button"
      className={`${sizeClassName} flex-row items-center justify-center rounded-xl ${variantClassName} ${disabled ? "opacity-60" : ""}`}
      disabled={disabled || isLoading}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === "primary" || variant === "danger" ? "#ffffff" : "#1697A6"} />
      ) : (
        <Text className={textClassName}>{children}</Text>
      )}
    </Pressable>
  );
}
