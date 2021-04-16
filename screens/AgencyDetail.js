import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";

import {
  Header,
  Icon,
  SearchBar,
  Button,
  Text,
  Card,
  Rating,
  AirbnbRating,
} from "react-native-elements";
import { setUserRating } from "../actions/authActions";
import { connect } from "react-redux";
import { formatImageString } from "../helper/helper";
import Snackbar from "../Components/Snackbar";

const AgencyDetail = ({ navigation, route, user, setUserRating }) => {
  const [text, onChangeText] = React.useState("");
  const [agencyData, setAgencyData] = React.useState({});
  const [ratingCounted, setRatingCounted] = React.useState(2);
  const { width } = Dimensions.get("screen");
  React.useEffect(() => {
    const { data } = route.params;
    setAgencyData(data);
  }, [route.params]);
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
    setRatingCounted(rating);
  };

  return (
    <ScrollView contentContainerStyle={{}}>
      <Snackbar />
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

      {agencyData && agencyData.id ? (
        <>
          <View>
            <View
              style={{
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              <Image
                source={{
                  uri: formatImageString(agencyData.avatar),
                }}
                style={{
                  width: 100,
                  height: 100,

                  borderRadius: 100,
                  marginLeft: width / 3,
                }}
              />
              <Text h4>{agencyData.middleName}</Text>
              {/* <Text>Karachi, Pakistan</Text> */}
            </View>
          </View>

          <Text style={{ marginLeft: 20, marginRight: 10, marginBottom: 10 }}>
            Address: {agencyData.name}
          </Text>

          <Text style={{ marginLeft: 20, marginRight: 10, marginBottom: 10 }}>
            Contact: {agencyData.username}
          </Text>
          <Card>
            <Card.Title style={{ alignSelf: "flex-start" }}>
              Description
            </Card.Title>
            <Card.Divider />
            <Text>{agencyData.description}</Text>
            <Text style={{ fontWeight: "bold" }}>Specialities</Text>

            <Text style={{ fontWeight: "bold" }}>
              Motivating,asdjasd,asdasdsa, asd asd asd as das d asd{" "}
            </Text>
          </Card>
          <Card>
            <Card.Title style={{ alignSelf: "flex-start" }}>Skills</Card.Title>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {agencyData.agencyProfiles[0].agencySkills.map((obj) => {
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
                );
              })}
            </View>
          </Card>
          <Card>
            <Card.Title style={{ alignSelf: "flex-start" }}>Rating</Card.Title>
            <View
              style={
                {
                  //flexDirection: "row",flexWrap:"wrap"
                }
              }
            >
              <TextInput
                style={{
                  borderWidth: 1,
                  marginTop: 5,
                  marginBottom: 10,
                }}
                onChangeText={onChangeText}
                value={text}
                placeholder="Description"
              />
              <Rating
                // fractions="{1}"
                startingValue={ratingCounted}
                showRating
                onFinishRating={ratingCompleted}
              />
              <Button
                buttonStyle={{
                  marginTop: 20,
                  width: width / 3,
                  marginLeft: width / 4,
                  marginBottom: 30,
                }}
                onPress={() => {
                  //console.log(agencyData, '\n user:', user)
                  console.log("pressed!");

                  setUserRating(
                    agencyData.id,
                    1,
                    ratingCounted,
                    user.id,
                    user.middleName,
                    text
                  );
                  setRatingCounted(2);
                  onChangeText("");
                }}
                title="Submit Rating"
              />
            </View>
          </Card>

          <Button
            buttonStyle={{
              marginTop: 20,
              width: width / 2,
              marginLeft: width / 4,
              marginBottom: 30,
            }}
            onPress={() => {
              navigation.navigate("Proposal", { agencyId: agencyData.id });
            }}
            title="Submit a Proposal"
          />
        </>
      ) : (
        <View></View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { setUserRating })(AgencyDetail);
