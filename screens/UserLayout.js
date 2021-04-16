import React, { useEffect } from 'react'
import { Icon, SearchBar } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, Image, ActivityIndicator, AsyncStorage } from "react-native";
import CustomDrawerContent from "./CustomDrawerContent";


import  Home  from "./Home";
import { Agency } from "./Agency";
import  Proposal from "./Proposal";
import { Settings } from "./Settings";
import { Vendor } from "./Vendor";
import { ProductMaker } from "./ProductMaker";

import Products from "./Products";
import ProductDescription from "./ProductDescription";
import Checkout from "./Checkout";
import  AgencyDetail  from "./AgencyDetail";
import { HomeDetail } from "./HomeDetail";
import { AgencyList } from "./AgencyList";
import JobDetail from './JobDetail'

import { connect } from 'react-redux';
 



const Drawer = createDrawerNavigator();

const UserLayout = ({ user }) => {
    useEffect(() => {
        // getAuthenticatedUser();
    }, [])
    return (
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
                component={ProductMaker}
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
            <Drawer.Screen
                name="JobDetail"
                options={{
                    drawerLabel: () => null,
                    title: null,
                    drawerIcon: () => null
                }}     component={JobDetail}
           
           />
        </Drawer.Navigator>
    )
}
const mapStateToProps = state => ({
    user: state.authReducer.user
})

export default connect(mapStateToProps, {})(UserLayout)