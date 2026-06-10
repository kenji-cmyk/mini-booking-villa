import type { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
};

export function Screen({ children, scroll = true }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const contentStyle = { paddingTop: Math.max(insets.top, 16), paddingBottom: 110 };

  if (!scroll) {
    return (
      <View className="flex-1 bg-neutral-50 px-5" style={contentStyle}>
        {children}
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-neutral-50" contentContainerStyle={contentStyle} showsVerticalScrollIndicator={false}>
      <View className="px-5">{children}</View>
    </ScrollView>
  );
}
