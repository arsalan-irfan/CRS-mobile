import React from "react";
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
export const Vendor = ({ navigation }) => {
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
          category="Cement"
          image="https://image.freepik.com/free-vector/c-letter-icon-logo_6711-286.jpg"
          navigation={navigation}
          navigateTo="ProductMaker"
        />

        <VendorCard
          category="Sand"
          image="https://static.vecteezy.com/system/resources/thumbnails/000/599/745/small/03192019-03.jpg"
          navigation={navigation}
          navigateTo="ProductMaker"
        />

        <VendorCard
          category="Steel"
          image="https://static.vecteezy.com/system/resources/thumbnails/000/599/745/small/03192019-03.jpg"
          navigation={navigation}
          navigateTo="ProductMaker"
        />

        <VendorCard
          category="Block"
          image="https://image.freepik.com/free-vector/letter-b-logo-power-red_42564-7.jpg"
          navigation={navigation}
          navigateTo="ProductMaker"
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
