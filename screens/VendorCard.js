import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image
  } from "react-native";
  
  import { Card, ListItem, Button, Icon, Header, Avatar } from "react-native-elements";
export const VendorCard = ({category, image, navigation, navigateTo}) => {
    return (
        <TouchableOpacity onPress={()=>{navigation.navigate(`${navigateTo}`)}}>
        <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          height: 30,
          borderColor: "grey",
          borderWidth: 1,
          marginBottom: 100,
          //marginTop:100,
         
        }}
        
      >
        <View style={{ width: "25%", height: "100%", paddingTop: 10 }}>
          <Image
        
            style={{
                height:60,
                width:60,
                borderRadius:50,
                marginTop:10
            }}
            source={{
              uri:
                image,
            }}
            //activeOpacity={0.7}
          />
        </View>

        <View style={{ width: "50%", height: "100%", paddingTop:20 }}>
          <Text
            style={{
              paddingTop: 5,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {category}
          </Text>
         </View>
       
      </View>
      </TouchableOpacity>
    )
}
