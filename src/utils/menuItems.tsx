import { JSX } from "react"
import { IconType } from "react-icons";

export interface IMenuItem {
  name: string,
  path: string,
  element: JSX.Element,
  icons?: {
    default: IconType,
    active: IconType
  },
  hide?: boolean
}