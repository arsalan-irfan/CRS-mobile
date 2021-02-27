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
import { formatImageString } from '../helper/helper'


export const AgencyDetail = ({ navigation, route }) => {
  const [agencyData, setAgencyData] = React.useState({});

  React.useEffect(() => {
    const { data } = route.params
    setAgencyData(data);
  }, [route.params])

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
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

      {agencyData && agencyData.id
        ? (
          <>
            <View>
              <View>
                <Image
                  source={{
                    uri:
                      formatImageString(agencyData.avatar),
                  }}
                  style={{
                    width: 100,
                    height: 100,

                    borderRadius: 100,
                  }}
                />
                <Text h4>{agencyData.middleName}</Text>
                {/* <Text>Karachi, Pakistan</Text> */}
              </View>
            </View>

            <Text style={{ marginRight: 10 }}>Address: {agencyData.name}</Text>

            <Text style={{ marginRight: 10 }}>Contact: {agencyData.username}</Text>
            <Card>
              <Card.Title style={{ alignSelf: "flex-start" }}>Description</Card.Title>
              <Card.Divider />
              <Text>
                {agencyData.description}
              </Text>
              <Text style={{ fontWeight: "bold" }}>Specialities</Text>

              <Text style={{ fontWeight: "bold" }}>
                Motivating,asdjasd,asdasdsa, asd asd asd as das d asd{" "}
              </Text>
            </Card>
            <Card>
              <Card.Title style={{ alignSelf: "flex-start" }}>Skills</Card.Title>
              <View style={{ flexDirection: "row" }}>
                {agencyData.agencyProfiles[0].agencySkills.map(obj => {
                  return (
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
                      {obj.skill.name}
                    </Text>
                  )
                })}


              </View>
            </Card>

            <Button buttonStyle={{ borderRadius: 20, marginTop: 50 }} onPress={() => { navigation.navigate('Proposal') }} title="Submit a Proposal" />

          </>
        )
        : (<View></View>)
      }
    </ScrollView>
  );
};
