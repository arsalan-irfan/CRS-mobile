import React, { useEffect } from "react";
// import { Header } from "react-native-elements";
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";

import { Header, SearchBar } from "react-native-elements";
// import { FlatList } from "react-native-gesture-handler";
import { TimelineCard } from "../Components/TimelineCard";
import axios from 'axios';
import { apiDomain } from '../config'



export const Agency = ({ navigation }) => {
  const [search, setSearch] = React.useState("");
  const [agencies, setAgencies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [agenciesFiltered, setAgenciesFiltered] = React.useState([]);


  useEffect(() => {
    fetchAgencies();
  }, [])

  const fetchAgencies = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${apiDomain}/Agency`);
      let res = response.data
      setAgencies(res);
      setAgenciesFiltered(res)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error.message);
    }

  }

  const onSearch = (text) => {
    setSearch(text)
    if (text.length !== 0) {
      const temp = agencies.filter(obj => {
        return obj.firstName.includes(text) || obj.lastName.includes(text);
      })
      setAgenciesFiltered(temp)
    }
    else {
      setAgenciesFiltered(agencies);
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
        onChangeText={(text) => onSearch(text)}
        autoCorrect={false}
        value={search}
      />
      {isLoading
        ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
            <ActivityIndicator size="large" color="#03254c" />
          </View>
        )
        : (
          <View>
            {
              agenciesFiltered.map((obj, index) => {
                return <TimelineCard data={obj} navigation={navigation} navigateTo="AgencyDetail" key={index} />
              })
            }


          </View>
        )
      }

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
