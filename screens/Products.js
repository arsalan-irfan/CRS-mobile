import React from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, BackHandler } from "react-native";

import { Header, Icon, SearchBar } from "react-native-elements";
import { ProductCard } from "../src/Cards/ProductCard";
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

import { apiDomain } from '../config'

import { connect } from 'react-redux'
import { addProduct, emptyCart, removeProduct } from '../actions/cartActions'


const Products = ({ navigation, route, cartItems, addProduct, removeProduct, emptyCart }) => {

  const [search, setSearch] = React.useState("");
  const { vendorId, company } = route.params;
  const [products, setProducts] = React.useState([]);
  const [productsFiltered, setProductsFiltered] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [backPressEnabled, setBackPressEnabled] = React.useState(true)

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        
        console.log("Hi")
        emptyCart();
        return false
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const addToCart = (prod) => {
    let obj = {
      productId: prod.id,
      quantity: 1,
      subtotal: prod.productPriceAffections[1].price,
      price: prod.productPriceAffections[1].price,
      name: prod.name,
      description: "For Construction"
    }
    addProduct(obj);
  }
  const removeFromCart = (prod) => {
    let obj = {
      productId: prod.id,
      quantity: 1,
      price: prod.productPriceAffections[1].price,
      subtotal: prod.productPriceAffections[1].price,
      name: prod.name,
      description: "For Construction"
    }
    removeProduct(obj);
  }

  const isAdded = (prod) => {
    console.log(prod.id)
    let index = cartItems.findIndex(obj => obj.productId == prod.id)
    console.log("Checking")
    console.log(index)
    if (index == -1)
      return false
    else
      return true
  }
  const onSearch = (text) => {
    setSearch(text)
    if (text.length !== 0) {
      const temp = products.filter(obj => {
        return obj.name.includes(text);
      })
      setProductsFiltered(temp)
    }
    else {
      setProductsFiltered(products);
    }

  }

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${apiDomain}/VendorProducts`);
      let res = response.data
      let temp = res.filter((obj) => {
        return obj.vendorId === vendorId
      })
      setIsLoading(false)
      setProducts(temp);
      setProductsFiltered(temp)
    } catch (error) {
      setIsLoading(false)
      console.log(error.message);
    }

  }

  React.useEffect(() => {
    fetchProducts();
    return function cleanup() {
      setProducts([]);
    };
  }, [vendorId]);

  React.useEffect(() => {
    console.log("Reload");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [cartItems || cartItems.length || totalPrice])

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
        rightComponent={<Icon name="cart-plus" type="font-awesome" color='white' onPress={() => { navigation.navigate('Checkout', { vendorId }) }} />}
      //        rightComponent={{ icon: "home", color: "#fff" }}
      />

      <SearchBar
        placeholder="Type Here..."
        lightTheme
        onChangeText={(text) => onSearch(text)}
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
                productsFiltered.map((obj, index) => {
                  return <ProductCard
                    company={company}
                    navigation={navigation}
                    data={obj} key={index}
                    removeFromCart={removeFromCart}
                    addToCart={addToCart}
                    isAdded={isAdded}
                  />
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


const mapStateToProps = state => ({
  cartItems: state.cartReducer.products,
  user: state.authReducer.user,
  totalPrice: state.cartReducer.totalPrice
})

export default connect(mapStateToProps, { addProduct, removeProduct, emptyCart })(Products)