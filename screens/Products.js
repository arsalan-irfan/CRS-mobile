import React from "react";
// import { Header } from "react-native-elements";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";

import { Header, Icon, SearchBar } from "react-native-elements";
import { ProductCard } from "../src/Cards/ProductCard";
// import { FlatList } from "react-native-gesture-handler";

export const Products = ({ navigation }) => {
  const [search, setSearch] = React.useState("");

  return (
    <ScrollView>
      <Header
        // backgroundColor={"black"}
        // containerStyle={{ height: "10%" }}
        leftComponent={{
          icon: "menu",
          color: "#fff",
          onPress: () => {
            navigation.toggleDrawer();
          },
        }}
        centerComponent={
          <Text style={{ fontSize: 18, color: "#fff" }}>ConstructTo</Text>
        }
        rightComponent={<Icon name="cart-plus" type="font-awesome" color='white' onPress={()=>{navigation.navigate('Checkout')}}/>}
        //        rightComponent={{ icon: "home", color: "#fff" }}
      />

      <SearchBar
        placeholder="Type Here..."
        lightTheme
        onChangeText={(text) => setSearch(text)}
        autoCorrect={false}
        value={search}
      />
      <ScrollView horizontal={true}>
        <ProductCard navigation={navigation} />
        <ProductCard navigation={navigation} />
      </ScrollView>

      <ScrollView horizontal={true}>
        <ProductCard navigation={navigation} />
        <ProductCard navigation={navigation} />
      </ScrollView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  headerTitleStyle: {
    color: "black",
    //fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
});
