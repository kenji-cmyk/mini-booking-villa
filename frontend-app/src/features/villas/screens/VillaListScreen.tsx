import { useCallback, useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";

import { VillaCard } from "@/features/villas/components/VillaCard";
import { listVillas } from "@/features/villas/services/villaService";
import { Icon } from "@/shared/components/Icon";
import { Screen } from "@/shared/components/Screen";
import { StateView } from "@/shared/components/StateView";
import { useAsync } from "@/shared/hooks/useAsync";

type VillaListScreenProps = {
  onOpenVilla: (villaId: number | string) => void;
};

export function VillaListScreen({ onOpenVilla }: VillaListScreenProps) {
  const [keyword, setKeyword] = useState("");
  const filters = useMemo(() => ({ keyword: keyword.trim() || undefined }), [keyword]);
  const loadVillas = useCallback(() => listVillas(filters), [filters]);
  const { data, error, isLoading, refetch } = useAsync(loadVillas);

  return (
    <Screen>
      <View className="mb-6 gap-2">
        <Text className="text-3xl font-bold text-ocean-900">Find a villa</Text>
        <Text className="text-base text-neutral-700">Browse premium coastal stays with transparent pricing.</Text>
      </View>

      <View className="mb-5 flex-row items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4">
        <Icon name="search" size={20} />
        <TextInput
          accessibilityLabel="Search villas"
          className="h-12 flex-1 text-base text-neutral-900"
          onChangeText={setKeyword}
          placeholder="Search by city or villa"
          placeholderTextColor="#6B7A88"
          value={keyword}
        />
      </View>

      <StateView
        emptyMessage="No villas found. Try another location or date range."
        error={error}
        isEmpty={!isLoading && !error && data?.length === 0}
        isLoading={isLoading}
        onRetry={refetch}
      />

      {data?.map((villa) => (
        <VillaCard key={villa.id} onPress={onOpenVilla} villa={villa} />
      ))}
    </Screen>
  );
}
