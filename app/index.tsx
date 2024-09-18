import {StyleSheet, Text, View, Image, FlatList, ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import ThemedText from "./components/themedText";
import {Card} from "./components/card";
import {useThemesColors} from "./components/hooks/useThemesColors";
import {PokemonCard} from "./components/pokemons/pokemonCard";
import {useFetchQuery, useInfiniteFetchQuery} from "./components/hooks/useFetchQuery";
import {getPokemonId} from "./functions/pokemons";
import Row from "./components/row";
import TheSearchBar from "./components/theSearchBar";
import { useState } from "react";
import SortBotton from "./components/sortBotton";

export default function Index() {
    const colors = useThemesColors()
    // const pokemons = Array.from({length:36}, (_, k) =>({
    //   name: 'pokemon name',
    //   id:k+1
    // }) )

    /*const {data, isFetching} = useFetchQuery('/pokemon?limit=21')
    const pokemons = data?.results ?? []*/

    const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery('/pokemon?limit=21')

    const [search, setSearch] = useState("")
    const [sortKey, setSortKey] = useState<'id'|'name'>("id")

    const pokemons = data?.pages.flatMap(page => page.results.map(r=>({name : r.name, url : r.url, id : getPokemonId(r.url)}))) ?? []
    const filteredPokemons = [...(search ? 
        pokemons.filter(p => p.name.includes(search.toLocaleLowerCase()) || p.id.toString() === search ) 
        : pokemons )].sort((a, b) => (a[sortKey] < b[sortKey]?-1:1))

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: colors.primary}]}>
            <Row style={styles.header} gap={16}>
                <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}/>
                <ThemedText variant="headline" color="white" >Pokedex</ThemedText>
            </Row>

            <Row gap={16} style={styles.searchContainer}> 
                <TheSearchBar value={search} onChange={setSearch}></TheSearchBar>
                <SortBotton value={sortKey} onChange={setSortKey}></SortBotton>
            </Row>

            {/* <View style={styles.header}>
                <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}/>
                <ThemedText variant="headline" color="lightGray">Pokedex</ThemedText>
            </View> */}

            <Card style={styles.body}>
                <FlatList
                    data={filteredPokemons}
                    numColumns={3}
                    contentContainerStyle={[styles.gridGap, styles.list]}
                    columnWrapperStyle={styles.gridGap}
                    renderItem={({item}) => <PokemonCard id={item.id} name={item.name}
                                                         style={styles.card}/>}
                    keyExtractor={(item) => item.id.toString()}
                    ListFooterComponent={isFetching ? <ActivityIndicator color={colors.primary}/> : null}
                    //onEndReached={search ? undefined : () => fetchNextPage()}
                    onEndReached={ () => fetchNextPage() }
                    />

            </Card>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 12
    },
    body: {
        flex: 1,
    },
    gridGap: {
        gap: 8,
    },
    list: {
        padding: 12,
    },
    card: {
        flex: 1 / 3,
    },
    searchContainer:{
        paddingHorizontal:12,
        paddingBottom:24

    },
    searchBar:{
        flex:1
    }

})