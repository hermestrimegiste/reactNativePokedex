import { Image, Pressable, StyleSheet, View, ViewStyle } from "react-native"
import { Card } from "../card"
import ThemedText from "../themedText"
import { useThemesColors } from "../hooks/useThemesColors"
import { Link } from "expo-router"

type Props = {
    style ?:ViewStyle,
    id:number,
    name:string
}
export function PokemonCard({style, id, name}:Props){
    const colors = useThemesColors()

    return <Link href={{pathname:"/pokemon", params:{id:id}}} asChild>
        <Pressable android_ripple={{color:colors.white , foreground:true}} style={style}>
            <Card style={[styles.card]}>
                <ThemedText style={styles.id} variant="caption" color="mediumGray">#{id.toString().padStart(3,'0')}</ThemedText>
                <Image 
                    source={{uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}}
                    width={72}
                    height={72}
                />
                <ThemedText>{name}</ThemedText>
                <View style={[styles.shadow, {backgroundColor:colors.backgroundGray}]}/>
            </Card>
        </Pressable>
    </Link>
}

const styles = StyleSheet.create({
    card:{
        alignItems:'center',
        padding:4, 
        position:'relative'
    },
    id:{
        alignSelf:'flex-end'
    },
    shadow:{
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        height:44,
        borderRadius:7,
        zIndex:-1
    }
})