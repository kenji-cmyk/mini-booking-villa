import { Pressable, Text, View } from "react-native";
import { useCallback } from "react";

import { getVilla } from "@/features/villas/services/villaService";
import { AppButton } from "@/shared/components/AppButton";
import { Icon } from "@/shared/components/Icon";
import { Screen } from "@/shared/components/Screen";
import { StateView } from "@/shared/components/StateView";
import { useAsync } from "@/shared/hooks/useAsync";
import { formatCurrency, formatGuests } from "@/shared/lib/format";

type VillaDetailsScreenProps = {
  onBack: () => void;
  villaId: number | string;
};

export function VillaDetailsScreen({ onBack, villaId }: VillaDetailsScreenProps) {
  const loadVilla = useCallback(() => getVilla(villaId), [villaId]);
  const { data: villa, error, isLoading, refetch } = useAsync(loadVilla);

  return (
    <Screen>
      <Pressable accessibilityLabel="Back to villas" accessibilityRole="button" className="mb-5 h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white" onPress={onBack}>
        <Icon color="#1F2A37" name="arrow-left" size={22} />
      </Pressable>

      <StateView error={error} isLoading={isLoading} onRetry={refetch} />

      {villa ? (
        <View className="gap-5">
          <View className="h-56 rounded-2xl bg-neutral-100" />
          <View className="gap-3">
            <Text className="text-3xl font-bold text-ocean-900">{villa.name}</Text>
            <View className="flex-row items-center gap-2">
              <Icon name="map-pin" size={18} />
              <Text className="text-base text-neutral-500">{villa.location}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Icon name="users" size={18} />
              <Text className="text-base text-neutral-500">{formatGuests(villa.capacity)}</Text>
            </View>
          </View>
          <Text className="text-base leading-6 text-neutral-700">{villa.description || "No description available."}</Text>
          <View className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-subtle">
            <Text className="text-sm text-neutral-500">Price per night</Text>
            <Text className="mt-1 text-2xl font-bold text-primary-700">{formatCurrency(villa.pricePerNight)}</Text>
          </View>
          <AppButton onPress={onBack}>Continue booking</AppButton>
        </View>
      ) : null}
    </Screen>
  );
}
