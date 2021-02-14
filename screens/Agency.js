import React from "react";
// import { Header } from "react-native-elements";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";

import { Header, Icon, SearchBar } from "react-native-elements";
import { TimelineCard } from "../Components/TimelineCard";
// import { FlatList } from "react-native-gesture-handler";

export const Agency = ({ navigation }) => {
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
          <Text style={{ fontSize: 18, color: "#fff" }}>Agency List</Text>
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
        <TimelineCard navigateTo='AgencyList' navigation={navigation}/>
        <TimelineCard navigateTo='AgencyList' navigation={navigation}/>
        <TimelineCard navigateTo='AgencyList' navigation={navigation}/>
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
