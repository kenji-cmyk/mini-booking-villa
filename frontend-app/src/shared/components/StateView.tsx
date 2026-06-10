import { ActivityIndicator, Text, View } from "react-native";

import { AppButton } from "@/shared/components/AppButton";

type StateViewProps = {
  emptyMessage?: string;
  error?: string | null;
  isEmpty?: boolean;
  isLoading?: boolean;
  onRetry?: () => void;
};

export function StateView({ emptyMessage = "No results found.", error, isEmpty = false, isLoading = false, onRetry }: StateViewProps) {
  if (isLoading) {
    return (
      <View className="min-h-80 items-center justify-center gap-3">
        <ActivityIndicator color="#1697A6" size="large" />
        <Text className="text-base text-neutral-500">Loading stays</Text>
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View className="min-h-80 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-6">
        <Text className="text-center text-base text-neutral-700">{emptyMessage}</Text>
      </View>
    );
  }

  if (!error) {
    return null;
  }

  return (
    <View className="min-h-80 items-center justify-center gap-4">
      <Text className="text-center text-base text-neutral-700">{error}</Text>
      {onRetry ? (
        <AppButton onPress={onRetry} variant="secondary">
          Try again
        </AppButton>
      ) : null}
    </View>
  );
}
