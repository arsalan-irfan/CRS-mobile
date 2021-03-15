import React from "react";
import { View, Text } from "react-native";
import Counter from "react-native-counters";
import { Button, Divider } from "react-native-elements";
import { emptyCart } from "../../actions/cartActions";
export default function CheckoutItem({ data, addProduct, removeProduct, incQuantity, decQuantity, emptyCart, user }) {
  function onChange(number, type) {
    if (type === "+") {
      incQuantity(data)
    } else {
      if (number == 0) {
        removeProduct(data)
      } else {
        decQuantity(data)

      }
    }
  }
  return (
    <View>
      <Button
        buttonStyle={{
          width: 30,
          height: 30,
          alignSelf: "flex-end",
          backgroundColor: "black",
          //fontColor:'black',
          marginRight: 10,
          borderRadius: 10,
        }}
        onPress={() => { removeProduct(data) }}
        title="X"
      />
      <View style={{ flex: 1, flexDirection: "row", margin: 5, padding: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{data.name}</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
        >
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 20 }}>
            <Counter
              start={1}
              onChange={onChange}
              buttonTextStyle={{ color: "black", height: 30 }}
              countTextStyle={{ color: "black", height: 30 }}
              buttonStyle={{ backgroundColor: "white", height: 30 }}
            />

          </View>
          <View style={{ paddingRight: 10 }}>
            <Text style={{ fontSize: 25, color: "grey" }}>
              Rs <Text style={{ fontWeight: "bold" }}>{data.subtotal}</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={{ paddingRight: 30, paddingLeft: 30 }}>
        <Divider style={{ backgroundColor: "#000", height: 1 }} />
      </View>
    </View>
  );
}
