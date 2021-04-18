import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  TextInput,
  Button,
  Picker,
  Dimensions,
} from "react-native";

import { Header, Icon, SearchBar, Card, Rating } from "react-native-elements";
import { ProductCard } from "../src/Cards/ProductCard";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

import { apiDomain } from "../config";

import { connect } from "react-redux";
import { addProduct, emptyCart, removeProduct } from "../actions/cartActions";
import { setVendorRating } from "../actions/authActions";
import Snackbar from "../Components/Snackbar";
const Products = ({
  navigation,
  route,
  cartItems,
  addProduct,
  removeProduct,
  emptyCart,
  setVendorRating,
  user,
}) => {
  const [search, setSearch] = React.useState("");

  const [selectedValue, setSelectedValue] = useState("random");
  const { vendorId, company, vendorRatingAverage } = route.params;
  const [products, setProducts] = React.useState([]);
  const [productsFiltered, setProductsFiltered] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [backPressEnabled, setBackPressEnabled] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        console.log("Hi");
        emptyCart();
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const addToCart = (prod) => {
    let obj = {
      productId: prod.id,
      quantity: 1,
      subtotal: prod.productPriceAffections[1].price,
      price: prod.productPriceAffections[1].price,
      name: prod.name,
      description: "For Construction",
    };
    addProduct(obj);
  };
  const removeFromCart = (prod) => {
    let obj = {
      productId: prod.id,
      quantity: 1,
      price: prod.productPriceAffections[1].price,
      subtotal: prod.productPriceAffections[1].price,
      name: prod.name,
      description: "For Construction",
    };
    removeProduct(obj);
  };

  const isAdded = (prod) => {
    console.log(prod.id);
    let index = cartItems.findIndex((obj) => obj.productId == prod.id);
    console.log("Checking");
    console.log(index);
    if (index == -1) return false;
    else return true;
  };

  const onSearch = (text) => {
    setSearch(text);
    if (text.length !== 0) {
      const temp = products.filter((obj) => {
        return obj.name.includes(text);
      });
      setProductsFiltered(temp);
    } else {
      setProductsFiltered(products);
    }
  };

  const sortProducts = (products, price) => {
    console.log("sorting!!!!", products);
    if (price == "low") {
      products.sort((a, b) =>
        a.productPriceAffections[1].price > b.productPriceAffections[1].price
          ? 1
          : b.productPriceAffections[1].price >
            a.productPriceAffections[1].price
          ? -1
          : 0
      );
      console.log("products filtered are:", products);
    }
    if (price == "high") {
      console.log("from high to low");
      products.sort((a, b) =>
        a.productPriceAffections[a.productPriceAffections.length - 1 ].price < b.productPriceAffections[b.productPriceAffections.length - 1].price
          ? 1
          : b.productPriceAffections[b.productPriceAffections.length - 1].price <
            a.productPriceAffections[a.productPriceAffections.length - 1].price
          ? -1
          : 0
      );
      setProductsFiltered(products)
      console.log("products filtered are:", products);
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiDomain}/VendorProducts`);
      let res = response.data;
      let temp = res.filter((obj) => {
        return obj.vendorId === vendorId;
      });
      setIsLoading(false);
      setProducts(temp);
      setProductsFiltered(temp);
      // sortProducts(products);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  const [text, onChangeText] = React.useState("");
  const [ratingCounted, setRatingCounted] = React.useState(2);
  const { width } = Dimensions.get("screen");
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
    setRatingCounted(rating);
  };

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
    }, 1000);
  }, [cartItems || cartItems.length || totalPrice]);

  return (
    <ScrollView>
      <Snackbar />
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
        rightComponent={
          <Icon
            name="cart-plus"
            type="font-awesome"
            color="white"
            onPress={() => {
              navigation.navigate("Checkout", { vendorId });
            }}
          />
        }
        //        rightComponent={{ icon: "home", color: "#fff" }}
      />

      <SearchBar
        placeholder="Type Here..."
        lightTheme
        onChangeText={(text) => onSearch(text)}
        autoCorrect={false}
        value={search}
      />
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 2,
          borderTopWidth: 2,
        }}
      >
        <Text style={styles.filterStyle}>Sort by Price</Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 30, width: "42%", marginLeft: "30%" }}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            console.log("value changed");
            sortProducts(productsFiltered, itemValue);
          }}
          mode={"dropdown"}
        >
          <Picker.Item label="Low to High" value="low" />
          <Picker.Item label="High to Low" value="high" />
          <Picker.Item label="random" value="random" />
        </Picker>
      </View>

      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <ActivityIndicator size="large" color="#03254c" />
        </View>
      ) : (
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {productsFiltered.map((obj, index) => {
            return (
              <ProductCard
                company={company}
                navigation={navigation}
                data={obj}
                key={index}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
                isAdded={isAdded}
              />
            );
          })}
        </View>
      )}
      <Card>
        <Card.Title
          style={{
            //alignSelf: "flex-start"
            fontSize: 18,
          }}
        >
          Rating
        </Card.Title>

        <TextInput
          style={{
            borderWidth: 1,
            marginTop: 5,
            marginBottom: 10,
          }}
          onChangeText={onChangeText}
          value={text}
          placeholder="Description"
        />
        <Rating
          // fractions="{1}"
          style={{ marginBottom: 10 }}
          startingValue={vendorRatingAverage}
          //showRating
          onFinishRating={ratingCompleted}
        />
        <Button
          buttonStyle={
            {
              // marginTop: 100,
              // paddingTop:10,
              // width: width / 3,
              // marginLeft: width / 5,
              // marginBottom: 30,
            }
          }
          onPress={() => {
            //console.log(agencyData, '\n user:', user)
            console.log("pressed!");

            setVendorRating(
              vendorId,
              1,
              ratingCounted,
              user.id,
              user.middleName,
              text
            );
            setRatingCounted(2);
            onChangeText("");
          }}
          title="Submit Rating"
        />
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  headerTitleStyle: {
    color: "black",
    //fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  filterStyle: {
    marginLeft: 10,
    fontSize: 18,
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => ({
  cartItems: state.cartReducer.products,
  user: state.authReducer.user,
  totalPrice: state.cartReducer.totalPrice,
});

export default connect(mapStateToProps, {
  addProduct,
  removeProduct,
  emptyCart,
  setVendorRating,
})(Products);
