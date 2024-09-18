import { Image, StyleSheet, Text, TextInput, ViewStyle, View } from "react-native";
import Row from "./row";
import { useThemesColors } from "./hooks/useThemesColors";

type Props = {
    value: string,
    onChange: (s:string)=>void
}
export default function TheSearchBar({value, onChange}:Props){
    const colors = useThemesColors()
    return <Row gap={10}  style={[styles.container, {backgroundColor:colors.white}] }>
        <Image source={require("@/assets/images/search.png")} width={16} height={16} />
        <TextInput style={styles.input} placeholder="Search" onChangeText={onChange} value={value}></TextInput>
    </Row>
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        height:32,
        // backgroundColor:"#ffffff",
        borderRadius:20,
        paddingVertical:8,
        paddingHorizontal:12,
        //marginBottom:24,
        overflow:"hidden",
    },
    input:{
        flex:1,
        height:16,
        //backgroundColor:"#380b1c",
    }

});

