import axios from "axios";
import React, { useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";

import {
  Header,
  SearchBar,
  Input,
  Button,
  Icon,
  ActivityIndicator,
} from "react-native-elements";
import { apiDomain } from "../config";
const OrderTrack = ({ navigation }) => {
  const [orderId, setOrderId] = useState("");
  const [approved, setApproved] = useState(false);
  const [status, showStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const trackOrder = async (orderId) => {
    try {
      const res = await axios.get(`${apiDomain}/Invoice/${orderId}`);
      if (res.data) {
        setLoading(false);
        showStatus(true);
        if (res.data.invoiceStatus) {
          console.log(res.data);
          setApproved(true);
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };
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
          <Text style={{ fontSize: 18, color: "#fff" }}>Order Tracking</Text>
        }
        //        rightComponent={{ icon: "home", color: "#fff" }}
      />

      <Input
        style={{ marginTop: "10%" }}
        placeholder="Order ID"
        onChangeText={(id) => setOrderId(id)}
      />
      <Button
        title="Track Order"
        type="outline"
        buttonStyle={{ width: "50%", alignSelf: "center" }}
        onPress={() => {
          console.log("Order Id:", orderId);
          setLoading(true);
          trackOrder(orderId);
          setOrderId("");
        }}
        loading={loading}
      />
      <View style={{ marginTop: "20%" }}></View>
      {status ? (
        approved ? (
          <View
            style={{
              borderWidth: 1,
              margin: "5%",
              padding: "2%",
              borderColor: "green",
              color: "green",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "green",
                alignSelf: "flex-start",
                marginLeft: "5%",
              }}
            >
              Order is Approved
            </Text>
            <Icon
              name="check"
              type="font-awesome"
              color={"green"}
              size={20}
              style={{ marginLeft: "30%", alignSelf: "flex-end" }}
            />
          </View>
        ) : (
          <View
            style={{
              borderWidth: 1,
              margin: "5%",
              padding: "2%",
              borderColor: "red",
              color: "red",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "red",
                alignSelf: "flex-start",
                marginLeft: "5%",
              }}
            >
              Order is Not Approved
            </Text>
            <Icon
              name="times"
              type="font-awesome"
              color={"red"}
              size={20}
              style={{ marginLeft: "30%", alignSelf: "flex-end" }}
            />
          </View>
        )
      ) : null}
    </View>
  );
};

export default OrderTrack;
