import { Link } from "expo-router";
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "./components/themedText";
import { Card } from "./components/card";
import { useThemesColors } from "./components/hooks/useThemesColors";
import { PokemonCard } from "./components/pokemons/pokemonCard";
import { useFetchQuery, useInfiniteFetchQuery } from "./components/hooks/useFetchQuery";
import { getPokemonId } from "./functions/pokemons";
import { useInfiniteQuery, useIsFetching } from "@tanstack/react-query";

export default function Index() {
  const colors = useThemesColors()
  // const pokemons = Array.from({length:36}, (_, k) =>({
  //   name: 'pokemon name',
  //   id:k+1
  // }) )

  /*const {data, isFetching} = useFetchQuery('/pokemon?limit=21')
  const pokemons = data?.results ?? []*/

  const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery('/pokemon?limit=21')
  const pokemons = data?.pages.flatMap(page => page.results) ?? []

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
          renderItem={({item}) => <PokemonCard id={getPokemonId(item.url)} name={item.name} style={styles.card} />} 
          keyExtractor={(item)=> item.url}
          ListFooterComponent={ isFetching ? <ActivityIndicator color={colors.primary} /> : null}
          onEndReached={()=>fetchNextPage()}
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
    flex:1,
  },
  gridGap:{
    gap:8,
  }, 
  list:{
    padding:12,
  },
  card:{
    flex:1/3, 
  }

})