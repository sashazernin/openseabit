import { CSSProperties } from "react";

export interface IBaseProps {
  style?: CSSProperties
  className?: string,
}

export interface IInputBase extends IBaseProps {
  label?: string,
  placeholder?: string,
}