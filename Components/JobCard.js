import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";


export const JobCard = ({ navigateTo, navigation, data }) => {
  return (
    <TouchableOpacity onPress={() => { navigation.navigate(`${navigateTo}`, { data }) }}>
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
              height: 60,
              width: 60,
              borderRadius: 50,
              marginTop: 10
            }}
            source={{
              uri:"https://icon-library.com/images/icon-job/icon-job-11.jpg"
            }}
          //activeOpacity={0.7}
          />
        </View>

        <View style={{ width: "50%", height: "100%", paddingTop: 10 }}>
          <Text
            style={{
              paddingTop: 5,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {data.name}
          </Text>
          <Text numberOfLines={3}>{data.description}</Text>
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
