import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  Card,
  ListItem,
  Button,
  Icon,
  Header,
  Avatar,
  Rating,
} from "react-native-elements";
import { formatImageString } from "../helper/helper";

export const TimelineCard = ({ navigateTo, navigation, data }) => {
  
  const [agencyRatingAverage, setAgencyRatingAverage] = useState(3);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(`${navigateTo}`, { data });
      }}
       style={{ backgroundColor: "white" }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          height: 100,
          // backgroundColor: "black",
          borderColor: "grey",
          borderWidth: 1,
          marginBottom: 100,
          //marginTop:100,
          borderRadius: 10,
        }}
      >
        <View style={{ width: "25%", height: "100%", paddingTop: 10 }}>
          <Image
            style={{
              height: 60,
              width: 60,
              borderRadius: 50,
              marginTop: 10,
            }}
            source={{
              uri: formatImageString(data.avatar),
            }}
            //activeOpacity={0.7}
          />
        </View>

        <View style={{ width: "50%", height: "100%", paddingTop: 10 }}>
          <Text
            style={{
              paddingTop: 5,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {data.middleName}
          </Text>
          <Text numberOfLines={3}>{data.description}</Text>
        </View>
      </View>
      <View 
     style={{ alignSelf: "flex-end" }}
      >
        <Rating
        //ratingCount={5}
          imageSize={30}
          startingValue={data.agencyRatingAverage}
        //tintColor={"white"}
        />
        
      </View>
    </TouchableOpacity>
  );
};
