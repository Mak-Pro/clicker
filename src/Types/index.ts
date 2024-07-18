import { HTMLAttributeAnchorTarget } from "react";

type ButtonType = "small" | "medium" | "large";
type ButtonVariant = "text" | "outlined" | "filled";

export interface ButtonProps {
  type?: ButtonType;
  variant?: ButtonVariant;
  href?: string;
  target?: HTMLAttributeAnchorTarget | undefined;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  color?: string;
  reset?: boolean;
  submit?: boolean;
}
