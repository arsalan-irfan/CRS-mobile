import React, { useEffect } from "react";
// import { Header } from "react-native-elements";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import { Header, SearchBar } from "react-native-elements";
// import { FlatList } from "react-native-gesture-handler";
import { JobCard } from "../Components/JobCard";
import axios from 'axios';
import { apiDomain } from '../config';
import { connect } from 'react-redux';

const Home = ({ navigation, user, route }) => {
  const [search, setSearch] = React.useState("");
  const [agencies, setAgencies] = React.useState([]);
  const [agenciesFiltered, setAgenciesFiltered] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    fetchAgencies();
    
  }, [])
  const onSearch = (text) => {
    setSearch(text)
    if (text.length !== 0) {
      const temp = agencies.filter(obj => {
        return obj.name.includes(text);
      })
      setAgenciesFiltered(temp)
    }
    else {
      setAgenciesFiltered(agencies);
    }

  }

  useEffect(() => {
    if (route && route.params && route.params.updatedJob) {
      const { updatedJob } = route.params
      console.log("Here::", updatedJob)
      if (updatedJob) {
        setIsLoading(true)
        setTimeout(() => {
          let temp = agencies;
          let index = temp.findIndex(obj => {
            return obj.id === updatedJob.id
          })
          temp[index].isAccepted = true;
          setAgencies(temp);
          setIsLoading(false)
        }, 500)

      }

    }
    if (route && route.params && route.params.deleteJob) {
      const { deleteJob } = route.params
      console.log("Here in Delete::", deleteJob)
      if (deleteJob) {
        setIsLoading(true)
        setTimeout(() => {
          let temp = agencies.filter(obj => {
            return obj.id !== deleteJob.id
          });

          setAgencies(temp);
          setIsLoading(false)
        }, 500)

      }

    }

  }, [route])

  const fetchAgencies = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${apiDomain}/JobInvitations/Search?searchbyprofileid=${user.id}`);
      let res = response.data
      setIsLoading(false)
      setAgencies(res);
      setAgenciesFiltered(res);
    } catch (error) {
      setIsLoading(false)
      console.log(error.message);
    }

  }
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
          <Text style={{ fontSize: 18, color: "#fff" }}>ConstructTo</Text>
        }
      //        rightComponent={{ icon: "home", color: "#fff" }}
      />

      <SearchBar
        placeholder="Type Here..."
        lightTheme
        onChangeText={(text) => onSearch(text)}
        autoCorrect={false}
        value={search}
      />
      {isLoading
        ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
            <ActivityIndicator size="large" color="#03254c" />
          </View>
        )
        : (
          <View>
            {
              agenciesFiltered.map((obj, index) => {
                return <JobCard data={obj} navigation={navigation} navigateTo="JobDetail" key={index} />
              })
            }


          </View>
        )
      }

    </View>
  );
};
const styles = StyleSheet.create({
  headerTitleStyle: {
    color: "black",
    //fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
});

const mapStateToProps = (state) => ({
  user: state.authReducer.user
})

export default connect(mapStateToProps)(Home)
