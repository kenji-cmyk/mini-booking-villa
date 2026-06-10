import "react-native";
import "react";

declare module "react" {
  interface Attributes {
    className?: string;
    contentContainerClassName?: string;
    indicatorClassName?: string;
  }
}

declare module "react-native" {
  interface PressableProps {
    className?: string;
  }

  interface ScrollViewProps {
    className?: string;
  }

  interface TextInputProps {
    className?: string;
  }

  interface TextProps {
    className?: string;
  }

  interface ViewProps {
    className?: string;
  }
}
