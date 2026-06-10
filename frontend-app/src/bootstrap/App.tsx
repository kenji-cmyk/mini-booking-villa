import "../../global.css";

import { useCallback, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { BookingScreen } from "@/features/booking/screens/BookingScreen";
import { VillaDetailsScreen } from "@/features/villas/screens/VillaDetailsScreen";
import { VillaListScreen } from "@/features/villas/screens/VillaListScreen";
import { BottomTabs } from "@/navigation/BottomTabs";
import type { AppScreen } from "@/navigation/types";

export default function App() {
  const [screen, setScreen] = useState<AppScreen>({ name: "villas" });

  const openVilla = useCallback((villaId: number | string) => {
    setScreen({ name: "villaDetails", villaId });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {screen.name === "villas" ? <VillaListScreen onOpenVilla={openVilla} /> : null}
      {screen.name === "villaDetails" ? (
        <VillaDetailsScreen villaId={screen.villaId} onBack={() => setScreen({ name: "villas" })} />
      ) : null}
      {screen.name === "booking" ? <BookingScreen /> : null}
      <BottomTabs activeScreen={screen.name} onChange={setScreen} />
    </SafeAreaProvider>
  );
}
