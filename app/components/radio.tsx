import { StyleSheet, View } from "react-native";
import { useThemesColors } from "./hooks/useThemesColors";

type Props = {
    checked:boolean
}

export default function Radio({checked}:Props){
    const colors = useThemesColors()
    return <View style={[styles.radio, {borderColor:colors.primary}]}>
         { checked && <View style={[styles.radioInner, {backgroundColor:colors.primary}]} /> }
    </View>
}

const styles = StyleSheet.create({
    radioInner:{
        width:8,
        height:8,
        borderRadius:7
    },
    radio:{
        width:16,
        height:16,
        borderRadius:8,
        borderStyle:"solid",
        borderWidth:2,
        alignItems:"center",
        justifyContent:"center"
    }
})
