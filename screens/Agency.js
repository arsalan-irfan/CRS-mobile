import React, { useEffect } from "react";
// import { Header } from "react-native-elements";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { Header, SearchBar } from "react-native-elements";
// import { FlatList } from "react-native-gesture-handler";
import { TimelineCard } from "../Components/TimelineCard";
import axios from 'axios';
import { apiDomain } from '../config'



export const Agency = ({ navigation }) => {
  const [search, setSearch] = React.useState("");
  const [agencies, setAgencies] = React.useState([]);

  useEffect(() => {
    fetchAgencies();
  }, [])

  const fetchAgencies = async () => {
    try {
      const response = await axios.get(`${apiDomain}/Agency`);
      let res = response.data
      setAgencies(res);
    } catch (error) {
      console.log(error.message);
    }

  }
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
        {
          agencies.map((obj, index) => {
            return <TimelineCard data={obj} navigation={navigation} navigateTo="AgencyDetail" key={index} />
          })
        }

        {/* <TimelineCard navigation={navigation} navigateTo="HomeDetail" />
        <TimelineCard navigation={navigation} navigateTo="HomeDetail" /> */}
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
