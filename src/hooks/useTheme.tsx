import { getTheme } from "../utils/theme";

export default function useTheme() {
  const theme = getTheme('light')
  return theme
}