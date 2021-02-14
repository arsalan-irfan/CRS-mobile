import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import Counter from "react-native-counters";
export const ProductCard = ({ navigation }) => {
  function onChange(number, type) {
    console.log(number, type); // 1, + or -
  }

  return (
    <View
      style={{
        width: "50%",
        height: "100%",
      }}
    >
      <Card style={{ backgroundColor: "grey" }}>
        <View>
          <Card.Image
            source={{
              uri:
                "https://static.zajo.net/content/mediagallery/zajo_dcat/image/product/types/X/9088.png",
            }}
          ></Card.Image>
          <Card.Divider />
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>
            Product Name
          </Text>

          <Text style={{ color: "grey", fontSize: 16, marginBottom: 6 }}>
            Company
          </Text>

          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>
            $123
          </Text>
        </View>
        <View style={{marginBottom: 10, marginTop:10}}>
        <Counter
          start={1}
          onChange={onChange(1, 2)}
          buttonTextStyle={{ color: "black" }}
          countTextStyle={{ color: "black" }}
        />
        </View>
        <Button
          title="View"
          buttonStyle={{ marginBottom: 10 }}
          onPress={() => {
            navigation.navigate("ProductDescription");
          }}
        />
        <Button title="Add to Cart" />
      </Card>
    </View>
  );
};
