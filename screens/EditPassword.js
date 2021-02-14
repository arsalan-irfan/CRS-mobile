import React from "react";
import { View, Text } from "react-native";
import {Header, Icon, Input, Button} from 'react-native-elements'

export const EditPassword = ({navigation}) => {
  return (
    <View style={{flex:1}}>
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
          <Text style={{ fontSize: 18, color: "#fff" }}>Change Password</Text>
        }
        
        //        rightComponent={{ icon: "home", color: "#fff" }}
      />
       <View style={{ width: "80%", marginTop: 50, alignSelf:'center', borderWidth: 1, borderColor:'grey',  padding:10 }}>
       <Input placeholder="Password" label="Old Password" secureTextEntry={true} />
       <Input placeholder="Password" label="New Password" secureTextEntry={true} />

       <Input placeholder="Password" label="Confirm Password" secureTextEntry={true} />
       <Button
          title="Save"
          buttonStyle={{marginBottom:50}}
        />


      
       </View>
    </View>
  );
};
