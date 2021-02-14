import React from "react";
import { Button, Image } from "react-native";
import { View } from "react-native";
import { Divider, Text } from "react-native-elements";
import Counter from "react-native-counters";
import { color } from "react-native-reanimated";
export function ProductDescription() {
  function onChange(number, type) {
    console.log(number, type); // 1, + or -
  }

  return (
    <View style={{ flex: 1 }}>
        <Image
          source={{
            uri:
              "https://static.zajo.net/content/mediagallery/zajo_dcat/image/product/types/X/9088.png",
          }}
          style={{
            backgroundColor: "#dbd0d0",
            marginTop: "5%",
            width: "100%",
            height: "50%",
            marginBottom:'5%'
          }}
        />

      <View
        style={{
          alignItems: "center",
          borderBottomWidth: 2,
          marginBottom:10,
          paddingBottom:10
        }}
      >
      
        <Text h3>Product Description</Text>

        <Text h4 style={{ color: "grey", marginBottom: 10 }}>
          Company
        </Text>
      
        <Text h4>$123</Text>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          flexDirection: "row",
          paddingTop: 20,
          paddingBottom:50
        }}
      >
        <Text style={{ marginRight: 150, marginLeft: 30 }} h4>
          Qty
        </Text>
        <Counter
          start={1}
          onChange={onChange(1, 2)}
          buttonTextStyle={{ color: "black", height: 30 }}
          countTextStyle={{ color: "black", height: 30 }}
          buttonStyle={{ backgroundColor: "white", height: 30 }}
        />
        {/* <Button buttonStyle={{ alignSelf:'flex-start'  }} title="Add to Cart" /> */}
      </View>
      <View
       
      >
        <Button title="+ Add to Cart" />
      </View>
    </View>
  );
}
