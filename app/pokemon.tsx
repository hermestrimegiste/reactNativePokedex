import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function PokemonDetails(){
    const params = useLocalSearchParams()
    return <View>
        <Text> details du pokemon {params.id}</Text>
    </View>
}