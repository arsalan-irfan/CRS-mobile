// In App.js in a new project

import * as React from "react";
import { useEffect } from "react";
import { View, Text, Image, ActivityIndicator, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Login";
import { ForgetPassword } from "./screens/ForgetPassword";
import Register from "./screens/Register";
import { ChangePassword } from "./screens/ChangePassword";
import UserLayout from './screens/UserLayout'

import { connect } from 'react-redux'

import { getCountries } from './actions/generalActions'
import { authenticateUser } from './actions/authActions'
import CustomSplashScreen from './screens/SplashScreen'


const Stack = createStackNavigator();


function App({ getCountries, authenticateUser, isLoggedIn, utilsLoaded }) {
  const checkUser = async () => {
    const token = await AsyncStorage.getItem("token")
    if (token) {
      authenticateUser()
    }
    getCountries();

  }

  useEffect(() => {
    checkUser();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {
          !utilsLoaded
            ? <Stack.Screen name="Splash" component={CustomSplashScreen} />
            : isLoggedIn
              ? <Stack.Screen name="Home" component={UserLayout} />
              : <>
                <Stack.Screen name="Login" component={Login} />

                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />

                <Stack.Screen name="Register" component={Register} />
              </>
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn,
  utilsLoaded: state.generalReducer.utilsLoaded
})
export default connect(mapStateToProps, { getCountries, authenticateUser })(App);
