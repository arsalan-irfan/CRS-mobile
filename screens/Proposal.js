import React, { useState } from "react";

import { StyleSheet, View, FlatList, ScrollView, Picker } from "react-native";

import {
  Header,
  Icon,
  SearchBar,
  Button,
  Text,
  Card,
} from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

export const Proposal = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState("java");
  return (
    <ScrollView>
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
          <Text style={{ fontSize: 18, color: "#fff" }}> Proposal</Text>
        }
        //        rightComponent={{ icon: "home", color: "#fff" }}
      />
      <Card>
        <Card.Title style={{ alignSelf: "flex-start" }}>Job Details</Card.Title>
        <Card.Divider />
        <Text>want to develop 120 sq yards building</Text>
      </Card>
      <Card>
        <Card.Title style={{ alignSelf: "flex-start" }}>Terms</Card.Title>
        <Card.Divider />
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Bid</Text>
        <View style={{ flexDirection: "row", paddingBottom: 30 }}>
          <Text style={{ flex: 1, alignSelf: "flex-start" }}>
            Total amount client will see on your proposal
          </Text>
          <TextInput
            placeholder="0.0"
            keyboardType="numeric"
            style={{
              borderBottomWidth: 1,
              flex: 1,
              alignSelf: "flex-end",
              marginLeft: 10,
            }}
          />
        </View>
        <Card.Divider />
        <View style={{ flexDirection: "row", paddingBottom: 30 }}>
          <Text
            style={{
              flex: 1,
              alignSelf: "flex-start",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Milestone payment details
          </Text>

          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Option1" value="java" />
            <Picker.Item label="Option 2" value="js" />
          </Picker>
        </View>
        <Card.Divider />
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>You'll Recieve</Text>
        <View style={{ flexDirection: "row", paddingBottom: 30 }}>
          <Text style={{ flex: 1, alignSelf: "flex-start" }}>
            Estimated amount you'll recieve after service fees the
          </Text>
          <TextInput
            keyboardType="numeric"
            style={{
              borderBottomWidth: 1,
              flex: 1,
              alignSelf: "flex-end",
              marginLeft: 10,
            }}
            placeholder="0.0"
          />
        </View>
      </Card>
      <Card>
        <Card.Title style={{ alignSelf: "flex-start" }}>
          Addition Information
        </Card.Title>
        <Card.Divider />
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Description:</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: "#C0C0C0", marginTop: 5 }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Attachments:
        </Text>
        <Button title="+ Add files" />
      </Card>
      <View style={{flexDirection:'row', justifyContent:'center', marginTop:20}}>
        <Button title="Submit Proposal" />
      </View>
    </ScrollView>
  );
};
