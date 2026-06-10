import { Pressable, Text, View } from "react-native";

import type { Villa } from "@/features/villas/types/villa";
import { Icon } from "@/shared/components/Icon";
import { formatCurrency, formatGuests } from "@/shared/lib/format";

type VillaCardProps = {
  onPress: (villaId: number | string) => void;
  villa: Villa;
};

export function VillaCard({ onPress, villa }: VillaCardProps) {
  return (
    <Pressable className="mb-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-card active:bg-neutral-50" onPress={() => onPress(villa.id)}>
      <View className="mb-4 h-40 rounded-2xl bg-neutral-100" />
      <View className="gap-2">
        <Text className="text-xl font-bold text-ocean-900">{villa.name}</Text>
        <View className="flex-row items-center gap-2">
          <Icon name="map-pin" size={17} />
          <Text className="text-sm text-neutral-500">{villa.location}</Text>
        </View>
        <View className="flex-row items-center justify-between pt-2">
          <View className="flex-row items-center gap-2">
            <Icon name="users" size={17} />
            <Text className="text-sm text-neutral-500">{formatGuests(villa.capacity)}</Text>
          </View>
          <Text className="text-base font-semibold text-primary-700">{formatCurrency(villa.pricePerNight)}/night</Text>
        </View>
      </View>
    </Pressable>
  );
}
