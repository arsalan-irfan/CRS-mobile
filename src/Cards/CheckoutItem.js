import React from "react";
import { View, Text } from "react-native";
import Counter from "react-native-counters";
import { Button, Divider } from "react-native-elements";
export default function CheckoutItem(props) {
  function onChange(number, type) {
    console.log(number, type); // 1, + or -
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
        title="X"
      />
      <View style={{ flex: 1, flexDirection: "row", margin: 5, padding: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}> T Shirt</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
        >
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 20 }}>
            <Counter
              start={1}
              onChange={onChange(1, 2)}
              buttonTextStyle={{ color: "black", height: 30 }}
              countTextStyle={{ color: "black", height: 30 }}
              buttonStyle={{ backgroundColor: "white", height: 30 }}
            />
            {/* <Button
              title="+"
              color="#fff"
              accessibilityLabel="Learn more about this purple button"
              buttonStyle={{
                height: 30,
                width: 30,
                color: "#000",
                backgroundColor: "#fff",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderColor: "grey",
                borderWidth: 1,
              }}
              titleStyle={{ color: "#000" }}
            />
            <Button
              title="2"
              color="#fff"
              accessibilityLabel="Learn more about this purple button"
              buttonStyle={{
                height: 30,
                width: 35,
                color: "#000",
                backgroundColor: "#fff",
                borderColor: "grey",
                borderWidth: 1,
              }}
              titleStyle={{ color: "#000" }}
              disabled={true}
              disabledStyle={{ backgroundColor: "#fff", color: "#000" }}
            />
            <Button
              title="- "
              color="#fff"
              accessibilityLabel="Learn more about this purple button"
              buttonStyle={{
                height: 30,
                width: 30,
                color: "#000",
                backgroundColor: "#fff",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderColor: "grey",
                borderWidth: 1,
              }}
              titleStyle={{ color: "#000" }}
            /> */}
          </View>
          <View style={{ paddingRight: 10 }}>
            <Text style={{ fontSize: 25, color: "grey" }}>
              Rs <Text style={{ fontWeight: "bold" }}>150</Text>
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
