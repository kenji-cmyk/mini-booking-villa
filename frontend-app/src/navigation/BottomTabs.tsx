import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/shared/components/Icon";
import type { AppScreen, RootScreenName } from "@/navigation/types";

type BottomTabsProps = {
  activeScreen: RootScreenName;
  onChange: (screen: AppScreen) => void;
};

const tabs = [
  { label: "Villas", icon: "home" as const, screen: { name: "villas" } as const },
  { label: "Book", icon: "calendar" as const, screen: { name: "booking" } as const }
];

export function BottomTabs({ activeScreen, onChange }: BottomTabsProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-5 pt-2"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      <View className="flex-row items-center justify-around">
        {tabs.map((tab) => {
          const isActive =
            activeScreen === tab.screen.name ||
            (activeScreen === "villaDetails" && tab.screen.name === "villas");
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              className="min-w-24 items-center gap-1 rounded-xl px-4 py-2"
              key={tab.label}
              onPress={() => onChange(tab.screen)}
            >
              <Icon color={isActive ? "#1697A6" : "#6B7A88"} name={tab.icon} size={22} />
              <Text className={isActive ? "text-sm font-semibold text-primary-600" : "text-sm text-neutral-500"}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
