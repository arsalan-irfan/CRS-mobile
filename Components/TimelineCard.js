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
export const TimelineCard = ({navigateTo, navigation}) => {
    return (
      <TouchableOpacity onPress={()=>{navigation.navigate(`${navigateTo}`)}}>
        <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          height: 100,
          backgroundColor: "#e3e3ed",
          borderColor: "grey",
          borderWidth: 1,
          marginBottom: 100,
          //marginTop:100,
          borderRadius: 10,
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
                "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
            }}
            //activeOpacity={0.7}
          />
        </View>

        <View style={{ width: "50%", height: "100%", paddingTop:10 }}>
          <Text
            style={{
              paddingTop: 5,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Agency Name
          </Text>
          <Text>this is some random description that will appear in card</Text>
        </View>
        <View
          style={{ justifyContent: "center", width: "25%", height: "100%" }}
        >
          {/* <TouchableOpacity onPress={() => {
                        this.props.onSelectedTeacher(this.props.teacher.uid)
                        Actions.teacher_profileSelected()
                    }}
                        style={{ justifyContent: "center", alignItems: "center", borderColor: "steelblue", width: "100%", borderWidth: 1, height: "50%" }}>
                        <Icon
                            name='md-person'
                            size={25}
                            color='steelblue'
                        />
                    </TouchableOpacity> */}
          </View>
      </View>
      </TouchableOpacity>
    )
}
