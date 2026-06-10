export type AppScreen =
  | { name: "villas" }
  | { name: "villaDetails"; villaId: number | string }
  | { name: "booking" };

export type RootScreenName = AppScreen["name"];
