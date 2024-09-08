import { useColorScheme } from "react-native";
import { Colors } from "../constants/colors";

export function useThemesColors() {
    const theme = useColorScheme() ?? 'light';
    return Colors[theme]
}