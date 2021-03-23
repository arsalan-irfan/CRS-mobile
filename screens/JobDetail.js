import React from "react";
import {
    StyleSheet,
    View,
    FlatList,
    ScrollView,
    Image,
    TextInput,
    Dimensions,
    ActivityIndicator
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
import axios from 'axios';
import { apiDomain } from '../config'
import Snackbar from '../Components/Snackbar'
import { showSnackbar } from '../actions/snackbarActions'
import { connect } from 'react-redux'




const JobDetail = ({ navigation, route, showSnackbar }) => {
    const [agencyData, setAgencyData] = React.useState({});
    const { width } = Dimensions.get('screen')
    const [isLoading, setIsLoading] = React.useState(true);
    const { data } = route.params
    const [loading, setLoading] = React.useState(false)
    const fetchJobDetails = async (data) => {
        try {
            let res = await axios.get(`${apiDomain}/Agency/Search?search=${data.name}`);

            setIsLoading(false)
            setAgencyData(res.data[0]);
        } catch (error) {
            console.log(error);
            setIsLoading(false)

        }
    }

    React.useEffect(() => {
        console.log("Data:::", data)
        fetchJobDetails(data);
    }, [route.params])

    const onAccept = async () => {
        try {
            setLoading(true)

            let reqBody = data;
            reqBody.isAccepted = true;
            let res = await axios.put(`${apiDomain}/JobInvitations/${data.id}`, reqBody);
            console.log("Success:::", res.data);
            navigation.navigate("Home", { updatedJob: res.data })
            showSnackbar("You have accept the job")
            setLoading(false)
        } catch (error) {
            console.log("Error:::", error.message)
            showSnackbar("Error While Accepting Job")
            setLoading(false)

        }
    }
    const onReject = async () => {
        try {
            setLoading(true)

            let res = await axios.delete(`${apiDomain}/JobInvitations/${data.id}`);
            console.log("Success:::", res.data);
            navigation.navigate("Home", { deleteJob: data })
            showSnackbar("You have accept the job")
            setLoading(false)
        } catch (error) {
            console.log("Error:::", error.message)
            showSnackbar("Error While Accepting Job")
            setLoading(false)

        }
    }


    return (
        <>
            {isLoading
                ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="#03254c" />

                    </View>
                )
                :
                (<ScrollView contentContainerStyle={{}}>
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
                            <Text style={{ fontSize: 18, color: "#fff" }}>Job Description</Text>
                        }
                    //        rightComponent={{ icon: "home", color: "#fff" }}
                    />

                    {agencyData && agencyData.id
                        ? (
                            <>
                                <View>
                                    <View
                                        style={
                                            {
                                                marginLeft: 20,
                                                marginTop: 20
                                            }
                                        }
                                    >
                                        <Image
                                            source={{
                                                uri:
                                                    formatImageString(agencyData.avatar),
                                            }}
                                            style={{
                                                width: 100,
                                                height: 100,

                                                borderRadius: 100,
                                                marginLeft: width / 3
                                            }}
                                        />
                                        <Text h4>{agencyData.middleName}</Text>
                                        {/* <Text>Karachi, Pakistan</Text> */}
                                    </View>
                                </View>

                                <Text style={{ marginLeft: 20, marginRight: 10, marginBottom: 10 }}>Address: {agencyData.name}</Text>

                                <Text style={{ marginLeft: 20, marginRight: 10, marginBottom: 10 }}>Contact: {agencyData.username}</Text>
                                <Card>
                                    <Card.Title style={{ alignSelf: "flex-start" }}>Job Description</Card.Title>
                                    <Card.Divider />
                                    <Text>
                                        {data.description}
                                    </Text>

                                </Card>
                                <Card>
                                    <Card.Title style={{ alignSelf: "flex-start" }}>About Company</Card.Title>
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
                                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                        {agencyData.agencyProfiles[0].agencySkills.map((obj, key) => {
                                            return (
                                                <Text
                                                    key={key}
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
                                {
                                    loading
                                        ? (
                                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                <ActivityIndicator size="large" color="#03254c" />
                                            </View>
                                        )
                                        : (
                                            <View style={{ marginTop: 20, marginBottom: 30, flex: 1, flexDirection: "row", justifyContent: "center" }}>
                                                <Button disabled={data.isAccepted} buttonStyle={{ marginTop: 20, marginRight: 10, width: width / 3, backgroundColor: "green" }} onPress={() => { onAccept(); }} title={data.isAccepted?"Accepted !":"Accept"} />
                                                {
                                                    data.isAccepted ? <></> : (
                                                        <Button buttonStyle={{ marginTop: 20, width: width / 3, backgroundColor: "red" }} color="red" onPress={() => { onReject(); }} title="Reject" />
                                                    )
                                                }
                                            </View>
                                        )

                                }



                            </>
                        )
                        : (<View><Text>Hello World</Text></View>)
                    }
                </ScrollView>
                )
            }
        </>
    );
};

export default connect(null, { showSnackbar })(JobDetail)