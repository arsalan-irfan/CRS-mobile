import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Icon } from "react-native-elements";

import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

var { height, width } = Dimensions.get("window");

function Drawer(props) {
  const { state, ...rest } = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter(
    (item) =>
      item.name !== "ProductMaker" &&
      item.name !== "Product" &&
      item.name !== "ProductDescription" &&
      item.name !== "Checkout" &&
      item.name !== "AgencyDetail" &&
      item.name !== "AgencyList" &&
      item.name !== "HomeDetail"
  );
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
      //  justifyContent: "space-between",
        backgroundColor: "#00b5ec",
        height: "100%",
        paddingTop: 40,
      }}
    >
      <View style={{ alignItems: "center" }}>
        {/* <Image
            source={require('../assets/images/profilePic.jpg')}
            style={{
              width: 100,
              height: 100,
              borderRadius: 90,
              margin: 10,
              // justifyContent: 'center',
              // alignItems: 'center',
            }}
          /> */}
        <Image
          style={{
            height: 60,
            width: 60,
            borderRadius: 50,
            marginTop: 10,
            marginBottom: 10,
          }}
          source={{
            uri:
              "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#fff",
            marginBottom: 10,
          }}
        >
          Name
        </Text>
      </View>
      <DrawerItemList state={newState} {...rest} />
      <DrawerItem
        label="Sign out"
        onPress={() => {
          props.navigation.navigate("Login");
        }}
        labelStyle={{ color: "#fff" }}
        // icon=
        icon={({ focused, color, size }) => (
          <Icon color={"#fff"} size={20} type="font-awesome" name="sign-out" />
        )}
      />
    </DrawerContentScrollView>
  );
}

export default Drawer;
