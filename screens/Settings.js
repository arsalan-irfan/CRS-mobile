import * as React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header, Icon } from "react-native-elements";
import { EditProfile } from "./EditProfile";
import { EditPassword } from "./EditPassword";
const Tab = createMaterialTopTabNavigator();


export function Settings() {
  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="Edit Profile" component={EditProfile} />
      <Tab.Screen name="Change Password" component={EditPassword} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
