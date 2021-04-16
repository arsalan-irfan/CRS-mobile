import React, { useEffect, useState } from "react";
// import { Header } from "react-native-elements";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Picker,
} from "react-native";

import { Header, SearchBar, Text } from "react-native-elements";
// import { FlatList } from "react-native-gesture-handler";
import { TimelineCard } from "../Components/TimelineCard";
import { VendorCard } from "./VendorCard";
import axios from "axios";
import { apiDomain } from "../config";

const users = [
  {
    name: "brynn",
    avatar:
      "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
  },

  // more users here
];
export const ProductMaker = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("all");
  const [search, setSearch] = React.useState("");
  const [vendors, setVendors] = React.useState([]);
  const [vendorsFiltered, setVendorsFiltered] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    //console.log("useEffect called");
    const unsubscribe = navigation.addListener("focus", () => {
      fetchVendors();
    });
    return unsubscribe;
  }, [fetchVendors, navigation]);

  const onSearch = (text) => {
    setSearch(text);
    if (text.length !== 0) {
      const temp = vendors.filter((obj) => {
        // console.log("obj", obj);
        return obj.firstName.includes(text) || obj.lastName.includes(text);
      });
      setVendorsFiltered(temp);
    } else {
      setVendorsFiltered(vendors);
    }
  };

  const filterbyStars = (star) => {
    // console.log("filter by stars called");
    const temp = vendors.filter((obj) => {
      console.log("temp array:", obj);
      return (
        obj.vendorRatingAverage == star ||
        (obj.vendorRatingAverage < star && obj.vendorRatingAverage > star - 1)
      );
    });

    setVendorsFiltered(temp);
  };

  const fetchVendors = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiDomain}/Vendor`);
      let res = response.data;
      setIsLoading(false);
      calculateAverageRating(res);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const calculateAverageRating = (res) => {
    let a = [];
    console.log("vendors:", res);
    res.map((vendor, id) => {
      let vendorRatingSum = 0;
      let vendorCount = 0;
      let vendorRatingAverage;
      console.log("vendor average calculation called");
      vendor.vendorRatings.map((rating, id) => {
        vendorCount++;
        vendorRatingSum = rating.ratingStars + vendorRatingSum;
      });
      console.log(
        "vendor rating sum:",
        vendorRatingSum,
        "vendor rating count:",
        vendorCount
      );
      vendorRatingAverage = vendorRatingSum / vendorCount;
      vendor.vendorRatingAverage = vendorRatingAverage;
      //console.log("rating average;", vendorRatingSum, vendorCount);

      // setvendorRatingAverage(vendorRatingSum / vendorCount);
      console.log("\nvendor rating averagE:", vendor.vendorRatingAverage);
      a.push(vendor);
    });
    setVendors(a);
    setVendorsFiltered(a);
  };

  return (
    <View>
      <Header
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

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text h4 style={styles.filterStyle}>
            Filter by Stars
          </Text>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 30, width: 100, marginLeft: "30%" }}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue);
              if (itemValue == "all") {
                setVendorsFiltered(vendors);
              } else {
                filterbyStars(itemValue);
              }
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
            {vendorsFiltered.map((obj, index) => {
              console.log('vendors are:',obj)
              return (
                <VendorCard
                  category="lucky Cement"
                  image="https://www.lucky-cement.com/wp-content/uploads/2017/02/cropped-lucky-logo.png"
                  navigateTo="Product"
                  navigation={navigation}
                  key={index}
                  data={obj}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
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
