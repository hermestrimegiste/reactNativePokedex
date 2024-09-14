import { ViewStyle } from "react-native";

export const Shadows = {
    dp2:{
        shadowOpacity: 0.5,
        shadowColor: '#000',
        shadowOffset:{  width:0, height:0 },
        shadowRadius:3,
        elevation:3
    } satisfies Record <string, ViewStyle> 
}