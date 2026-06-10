import { Feather } from "@expo/vector-icons";

type IconProps = {
  color?: string;
  name:
    | "arrow-left"
    | "calendar"
    | "check-circle"
    | "credit-card"
    | "home"
    | "map-pin"
    | "search"
    | "shield"
    | "users";
  size?: number;
};

export function Icon({ color = "#637069", name, size = 20 }: IconProps) {
  return <Feather color={color} name={name} size={size} />;
}
