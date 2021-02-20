// In App.js in a new project

import * as React from "react";
import { useEffect } from "react";
import { View, Text, Image, ActivityIndicator, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon, SearchBar } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./screens/Login";
import { ForgetPassword } from "./screens/ForgetPassword";
import * as SplashScreen from "expo-splash-screen";
import CustomDrawerContent from "./screens/CustomDrawerContent";
import Register from "./screens/Register";
import { ChangePassword } from "./screens/ChangePassword";
import { Home } from "./screens/Home";
import { Agency } from "./screens/Agency";
import { Proposal } from "./screens/Proposal";
import { Settings } from "./screens/Settings";
import { Vendor } from "./screens/Vendor";
import { ProductMaker } from "./screens/ProductMaker";

import { Products } from "./screens/Products";
import { ProductDescription } from "./screens/ProductDescription";
import { Checkout } from "./screens/Checkout";
import { AgencyDetail } from "./screens/AgencyDetail";
import { HomeDetail } from "./screens/HomeDetail";
import { AgencyList } from "./screens/AgencyList";

import { connect } from 'react-redux'

import { getCountries } from './actions/generalActions'
import { authenticateUser } from './actions/authActions'
import CustomSplashScreen from './screens/SplashScreen'


const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const createDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    drawerContentOptions={{
      activeTintColor: "#fff",
      // itemStyle: {colo/},
      labelStyle: { color: "#fff" },
    }}
    drawerStyle={{ width: 220 }}
  >
    <Drawer.Screen
      name="Home"
      component={Home}
      options={{
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="home"
            type="font-awesome"
            color={"#fff"}
            size={20}
            style={{ marginRight: 0 }}
          />
        ),
      }}
    />
    {/* <Drawer.Screen name="Home" children={} /> */}
    <Drawer.Screen
      name="Agency"
      component={Agency}
      options={{
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="building"
            type="font-awesome"
            color={"#fff"}
            size={20}
            style={{ marginRight: 0 }}
          />
        ),
        header: (
          <View style={{}}>
            <SearchBar lightTheme />
          </View>
        ),
      }}
    />

    <Drawer.Screen
      name="Proposal"
      component={Proposal}
      options={{
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="address-book-o"
            type="font-awesome"
            color={"#fff"}
            size={20}
            style={{ marginRight: 0 }}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="Vendor"
      component={Vendor}
      options={{
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="wrench"
            type="font-awesome"
            color={"#fff"}
            size={20}
            style={{ marginRight: 0 }}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="Settings"
      component={Settings}
      options={{
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="cogs"
            type="font-awesome"
            color={"#fff"}
            size={20}
            style={{ marginRight: 0 }}
          />
        ),
      }}
    />


    <Drawer.Screen
      name="ProductMaker"
      // header
      component={ProductMaker}
    // options={{
    //   drawerLabel: nullComponent,
    // }}
    />

    <Drawer.Screen
      name="Product"
      component={Products}
    // options={{
    //   drawerLabel: nullComponent,
    // }}
    />
    <Drawer.Screen
      name="ProductDescription"
      component={ProductDescription}
    />
    <Drawer.Screen
      name="Checkout"
      component={Checkout}
    />
    <Drawer.Screen
      name="AgencyDetail"
      component={AgencyDetail}
    />

    <Drawer.Screen
      name="AgencyList"
      component={AgencyList}
    />
    <Drawer.Screen
      name="HomeDetail"
      component={HomeDetail}
    />
  </Drawer.Navigator>
);
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
              ? <Stack.Screen name="Home" component={createDrawer} />
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
