import { View, ViewProps, ViewStyle } from "react-native"
import { Shadows } from "./constants/shadows"
import { useThemesColors } from "./hooks/useThemesColors"

type Props = ViewProps

export function Card({style, ...rest}:Props){
    const colors = useThemesColors()
    return <View style={[style, styles, {backgroundColor:colors.white}]} {...rest} />
}
const styles= {
    borderRadius:8,
    ...Shadows.dp2,
    overflow:'hidden'

} satisfies ViewStyle