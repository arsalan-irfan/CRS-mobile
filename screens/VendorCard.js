import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image
} from "react-native";
import { formatImageString } from '../helper/helper'

export const VendorCard = ({ image, navigation, navigateTo, data }) => {
  console.log(data)
  return (
    <TouchableOpacity onPress={() => { navigation.navigate(`${navigateTo}`, { vendorId: data.id, company: `${data.firstName} ${data.lastName}` }) }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          height: 30,
          height: "100%",
          borderColor: "grey",
          borderWidth: 1,
          marginBottom: 10,
          //marginTop:100,

        }}

      >
        <View style={{ width: "25%", height: "100%", paddingTop: 10 }}>
          <Image

            style={{
              height: 60,
              width: 60,
              borderRadius: 50,
              marginTop: 10
            }}
            source={{
              uri:
                formatImageString(data.avatar),
            }}
          //activeOpacity={0.7}
          />
        </View>

        <View style={{ width: "50%", height: "100%", paddingTop: 20 }}>
          <Text
            style={{
              paddingTop: 5,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {data.firstName} {data.lastName}
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}
