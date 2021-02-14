import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Image,
  TextInput,
} from "react-native";

import {
  Header,
  Icon,
  SearchBar,
  Button,
  Text,
  Card,
} from "react-native-elements";
export const HomeDetail = ({ navigation }) => {
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
          <Text style={{ fontSize: 18, color: "#fff" }}>Profile</Text>
        }
        //        rightComponent={{ icon: "home", color: "#fff" }}
      />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View>
          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
            }}
            style={{
              width: 100,
              height: 100,

              borderRadius: 100,
            }}
          />
          <Text h4>Mathey Doe</Text>
          <Text>Karachi, Pakistan</Text>
        </View>
      </View>

      <Text style={{ marginRight: 10, alignSelf: "center" }}>
        Address: Gulshan e Iqbal
      </Text>

      <Text style={{ marginRight: 10, alignSelf: "center" }}>
        Contact: 0341-12131121
      </Text>
      <Card>
        <Card.Title style={{ alignSelf: "flex-start" }}>Overview</Card.Title>
        <Card.Divider />
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries
        </Text>
        <Text style={{ fontWeight: "bold" }}>Specialities</Text>

        <Text style={{ fontWeight: "bold" }}>
          Motivating,asdjasd,asdasdsa, asd asd asd as das d asd{" "}
        </Text>
      </Card>
      <Card>
        <Card.Title style={{ alignSelf: "flex-start" }}>Budget</Card.Title>
        <Card.Divider />
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 5,
              margin: 5,
              fontWeight: "bold",
              backgroundColor: "#C0C0C0",
            }}
          >
            Some Amount
          </Text>
        </View>
      </Card>

      {/* <Button
        buttonStyle={{ borderRadius: 20, marginTop: 50 }}
        onPress={() => {
          navigation.navigate("Proposal");
        }}
        title="Submit a Proposal"
      /> */}
      <Card>
          <Card.Title style={{alignSelf:'flex-start'}}>Attachments:</Card.Title>
          <Card.Divider/>
          <Text
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 5,
              margin: 5,
              fontWeight: "bold",
              backgroundColor: "#C0C0C0",
            }}
          >
            File 1
          </Text>
      </Card>
    </ScrollView>
  );
};
