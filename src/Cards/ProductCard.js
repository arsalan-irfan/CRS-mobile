import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import Counter from "react-native-counters";
import { formatImageString } from '../../helper/helper'
export const ProductCard = ({ navigation, data, company }) => {
  function onChange(number, type) {
    console.log(number, type); // 1, + or -
  }

  return (

    <Card containerStyle={{
      width: 160,
      height: 450,
      marginTop: 10
    }}>
      <View>
        <Card.Image
          style={{ width: 110 }}
          source={{
            uri: formatImageString(data.imagePath),
          }}
        ></Card.Image>
        <Card.Divider />
        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>
          {data.name}
        </Text>

        <Text style={{ color: "grey", fontSize: 16, marginBottom: 6 }}>
          {company}
        </Text>

        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>
          {data.productPriceAffections.length > 0 ? data.productPriceAffections[1].price : "0"} Rs
          </Text>
      </View>
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        {/* <Counter
            start={1}
            onChange={onChange(1, 2)}
            buttonTextStyle={{ color: "black" }}
            countTextStyle={{ color: "black" }}
          /> */}
      </View>
      <Button
        title="View"
        buttonStyle={{ marginBottom: 10 }}
        onPress={() => { 
          navigation.navigate("ProductDescription", {
            data: {
              imagePath: formatImageString(data.imagePath),
              name: data.name,
              price: data.productPriceAffections[1].price,
              company: company
            }
          });
        }}
      />
      <Button title="Add to Cart" />
    </Card>
  );
};
