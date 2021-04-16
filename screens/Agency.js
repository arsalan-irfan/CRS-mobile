import React, { useEffect, useState } from "react";
// import { Header } from "react-native-elements";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Picker,
} from "react-native";

import { Header, SearchBar, Text } from "react-native-elements";
// import { FlatList } from "react-native-gesture-handler";
import { TimelineCard } from "../Components/TimelineCard";
import axios from "axios";
import { apiDomain } from "../config";

export const Agency = ({ navigation }) => {
 // console.log("components has rerendered");
  const [selectedValue, setSelectedValue] = useState("java");
  const [search, setSearch] = React.useState("");
  const [agencies, setAgencies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [agenciesFiltered, setAgenciesFiltered] = React.useState([]);

  useEffect(() => {
    console.log('useEffect called')
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAgencies();
    });
    return unsubscribe;
  }, [fetchAgencies, navigation, agenciesFiltered]);




const calculateAverageRating = () => {
   let a=[];
    console.log('agenciesFiltered:',agenciesFiltered);
    agencies.map((agency, id) => {
      let agencyRatingSum = 0;
      let agencyCount = 0;
      let agencyRatingAverage;
      console.log('agency average calculation called')
        agency.agencyRatings.map((rating, id)=> {
        agencyCount++;
        agencyRatingSum = rating.ratingStars + agencyRatingSum;
      })
     agencyRatingAverage = agencyRatingSum / agencyCount;
     agency.agencyRatingAverage = agencyRatingAverage;
     console.log("rating average;", agencyRatingSum, agencyCount);
  
     // setAgencyRatingAverage(agencyRatingSum / agencyCount);
      console.log("\nagency rating averagE:", agency.agencyRatingAverage);
      a.push(agency);


    });
    setAgencies(a);
  }




  const fetchAgencies = async () => {
    try {
      console.log('fetch agencies called')
      setIsLoading(true);
      const response = await axios.get(`${apiDomain}/Agency`);
      let res = response.data;
      console.log('agency  data', res)
      setAgencies(res);
      calculateAverageRating();
      
      setAgenciesFiltered(agencies);

      
    //console.log('rating average added agencies filtered', agenciesFiltered);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };



  const onSearch = (text) => {
    setSearch(text);
    if (text.length !== 0) {
      const temp = agencies.filter((obj) => {
        return obj.firstName.includes(text) || obj.lastName.includes(text);
      });
      setAgenciesFiltered(temp);
    } else {
      setAgenciesFiltered(agencies);
    }
  };



  const filterbyStars = (star) => {
    console.log('filter by stars called')
    const temp = agencies.filter((obj) => {
      
      
      return obj.agencyRatingAverage == star || (obj.agencyRatingAverage < star && obj.agencyRatingAverage > star-1);
    });
  
    setAgenciesFiltered(temp);
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
      <View style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text h4 style={styles.filterStyle}>
          Filter by Stars
        </Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 30, width: 100,marginLeft: '30%' }}
          onValueChange={(itemValue, itemIndex) => {
            
            setSelectedValue(itemValue)
            if(itemValue== 'all'){
              setAgenciesFiltered(agencies);
            }
           else{
           filterbyStars(itemValue)
           }
          }}
          onClick={()=> {
            console.log('picker has been pressed')
          }}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="all" value="all" />
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
        <View>
          {agenciesFiltered.map((obj, index) => {
            console.log("timelinecard is calASdasdling", obj);
            
            return (
              <TimelineCard
                data={obj}
                navigation={navigation}
                navigateTo="AgencyDetail"
                key={index}
              />
            );
          })}
        </View>
      )}
    </View>
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
  },
});
