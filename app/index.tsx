import { Link } from "expo-router";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "./components/themedText";
import { Card } from "./components/card";
import { useThemesColors } from "./components/hooks/useThemesColors";
import { PokemonCard } from "./components/pokemons/pokemonCard";

export default function Index() {
  const colors = useThemesColors()
  const pokemons = Array.from({length:36}, (_, k) =>({
    name: 'pokemon name',
    id:k+1
  }) )
  return (
    <SafeAreaView style={[styles.container, {backgroundColor:colors.primary}] }>
      <View style={styles.header}>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}/>
        <ThemedText variant="headline" color="lightGray">Pokedex</ThemedText>
      </View>
      <Card style={styles.body}>
        <FlatList 
          data={pokemons} 
          numColumns={3}
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={styles.gridGap}
          renderItem={({item}) => 
          <PokemonCard id={item.id} name={item.name} style={{flex:1/3}} />
        } keyExtractor={(item)=> item.id.toString()}

        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding:4
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    gap:16,
    padding:12
  },
  body:{
    flex:1
  },
  gridGap:{
    gap:8,
  }, 
  list:{
    padding:12,
  }

})