import {StyleSheet, View, ViewProps, ViewStyle} from "react-native";

type Props = ViewProps & {
    gap ?: number
}

export default function Row({style, gap, ...rest}:Props){
    return <View style={[style,rowStyles, gap? {gap:gap}: undefined]} {...rest}></View>
}

const rowStyles = {
        flexDirection: 'row',
        alignItems: 'center'    
} satisfies ViewStyle
