import React, {useState} from "react";
// import { Header } from "react-native-elements";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { Header, SearchBar } from "react-native-elements";
// import { FlatList } from "react-native-gesture-handler";
import { TimelineCard } from "../Components/TimelineCard";
import { VendorCard } from "./VendorCard";
const users = [
  {
    name: "brynn",
    avatar:
      "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
  },

  // more users here
];
export const ProductMaker = ({ navigation }) => {
  const [search, setSearch] = React.useState("");

  return (
    <View>
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
        //        rightComponent={{ icon: "home", color: "#fff" }}
      />

      <SearchBar
        placeholder="Type Here..."
        lightTheme
        onChangeText={(text) => setSearch(text)}
        autoCorrect={false}
        value={search}
      />
      <View>
        <VendorCard
          category="lucky Cement"
          image="https://www.lucky-cement.com/wp-content/uploads/2017/02/cropped-lucky-logo.png"
          navigateTo="Product"
          navigation={navigation}
        />

        <VendorCard
          category="Textile industry"
          image="https://thumbs.dreamstime.com/b/black-textile-isolated-vector-icon-simple-element-illustration-industry-concept-icons-editable-logo-symbol-design-white-143598601.jpg"
          navigateTo="Product"
          navigation={navigation}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerTitleStyle: {
    color: "black",
    //fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
});
