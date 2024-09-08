import { Image, StyleSheet, ViewStyle } from "react-native"
import { Card } from "../card"
import ThemedText from "../themedText"

type Props = {
    style ?:ViewStyle,
    id:number,
    name:string
}
export function PokemonCard({style, id, name}:Props){
    return <Card style={[style, styles.card]}>
        <ThemedText style={styles.id} variant="caption" color="mediumGray">#{id.toString().padStart(3,'0')}
        </ThemedText>
        <Image 
        source={{uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}}
        width={72}
        height={72}
        />
        <ThemedText>{name}</ThemedText>
    </Card>
}

const styles = StyleSheet.create({
    card:{
        alignItems:'center',
        padding:4
    },
    id:{
        alignSelf:'flex-end'
    }
})