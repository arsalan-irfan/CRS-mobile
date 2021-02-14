import React from "react";
import { View, TextInput, ScrollView } from "react-native";
import { Header, Icon, Input, Text, Button } from "react-native-elements";
export const EditProfile = ({ navigation }) => {
  const [value, onChangeText] = React.useState("Useless Placeholder");

  return (
    <ScrollView style={{ flex: 1 }}>
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
          <Text style={{ fontSize: 18, color: "#fff" }}>Edit Profile</Text>
        }

        //        rightComponent={{ icon: "home", color: "#fff" }}
      />

      <View
        style={{
          width: "80%",
          marginTop: 50,
          alignSelf: "center",
          borderWidth: 1,
          borderColor: "grey",
          padding: 20,
        }}
      >
        <Input label="Company Name" placeholder="Abc Company" />

        <Input label="First Name" placeholder="john" />

        <Input label="Last Name" placeholder="doe" />
        <Input label="Contact Number" placeholder="123456" />
        <View style={{ marginLeft: 5 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginBottom: 10,
              color: "grey",
            }}
          >
            Description
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "grey",
              borderBottomWidth: 0.5,
              color: "grey",
            }}
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 10,
            color: "grey",
            marginTop: 20,
          }}
        >
          Avatar
        </Text>

        <Button title="+ Upload" />

        <Button title="Save" buttonStyle={{ marginTop: 20 }} />
      </View>
    </ScrollView>
  );
};
