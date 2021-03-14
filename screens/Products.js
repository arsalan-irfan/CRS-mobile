import React from "react";
// import { Header } from "react-native-elements";
import { StyleSheet, Text, View,  ScrollView, ActivityIndicator,BackHandler } from "react-native";

import { Header, Icon, SearchBar } from "react-native-elements";
import { ProductCard } from "../src/Cards/ProductCard";
// import { FlatList } from "react-native-gesture-handler";
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

import { apiDomain } from '../config'

export const Products = ({ navigation, route }) => {
  const [search, setSearch] = React.useState("");
  const { categoryId,company } = route.params;
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [backPressEnabled,setBackPressEnabled]=React.useState(true)

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       if (backPressEnabled) {
          
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     };

  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, [])
  // );
  

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${apiDomain}/VendorProducts`);
      let res = response.data
      let temp = res.filter((obj) => {
        return obj.categoryId === categoryId
      })
      setIsLoading(false)
      setProducts(temp);
    } catch (error) {
      setIsLoading(false)
      console.log(error.message);
    }

  }

  React.useEffect(() => {
    fetchProducts();
  }, []);

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
        rightComponent={<Icon name="cart-plus" type="font-awesome" color='white' onPress={() => { navigation.navigate('Checkout') }} />}
      //        rightComponent={{ icon: "home", color: "#fff" }}
      />

      <SearchBar
        placeholder="Type Here..."
        lightTheme
        onChangeText={(text) => setSearch(text)}
        autoCorrect={false}
        value={search}
      />
      {
        isLoading
          ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
              <ActivityIndicator size="large" color="#03254c" />
            </View>
          )
          : (
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {
                products.map((obj, index) => {
                  return <ProductCard company={company} navigation={navigation} data={obj} key={index} />
                })
              }
            </View>
          )
      }


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
