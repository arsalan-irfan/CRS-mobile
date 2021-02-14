import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Picker,
  Alert,
  ScrollView
} from "react-native";
//import { ScrollView } from "react-native-gesture-handler";
export const Register = (props) => {
  const [country, setCountry] = React.useState("Pakistan");
  const [city, setCity] = React.useState("Karachi");
  const [state, setState] = React.useState("Sindh");
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.bgImage}
        source={{
          uri:
            "https://mobilehd.blob.core.windows.net/main/2016/03/manhattan-empire-state-building-1080x1920.jpg",
        }}
      />
      <View>
        <Image
          style={styles.logo}
          source={{
            uri:
              "https://cdn.iconscout.com/icon/free/png-512/c-programming-569564.png",
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          //onChangeText={(email) => this.setState({email})}
        />
        <Image
          style={styles.inputIcon}
          source={{ uri: "https://img.icons8.com/nolan/40/000000/email.png" }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="First Name"
          //keyboardType="email-address"
          underlineColorAndroid="transparent"
          //onChangeText={(email) => this.setState({email})}
        />
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://img.icons8.com/metro/26/000000/user-male-circle.png",
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Last Name"
          //keyboardType="email-address"
          underlineColorAndroid="transparent"
          //onChangeText={(email) => this.setState({email})}
        />

        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://img.icons8.com/metro/26/000000/user-male-circle.png",
          }}
        />
      </View>
      <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]}>
        <Text style={styles.btnText}>+ Upload Picture</Text>
      </TouchableOpacity>

      <View style={styles.dropdownContainer}>
        <Text style={{fontSize:18, color:'black', borderBottomWidth:2, borderBottomColor:'grey'}}>Country</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={country}
            style={{ height: 50, width: 300 }}
            prompt="Country"
            onValueChange={(itemValue, itemIndex) =>
              setCountry(itemValue)
            }
          >
            <Picker.Item label="Pakistan" value="Pakistan" />
            <Picker.Item label="India" value="India" />
          </Picker>
        </View>
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={{fontSize:18, color:'black', borderBottomWidth:2, borderBottomColor:'grey'}}>State</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={state}
            style={{ height: 50, width: 300 }}
            prompt="State"
            onValueChange={(itemValue, itemIndex) =>
              setState(itemValue)
            }
          >
            <Picker.Item label="Abc" value="Abc" />
            <Picker.Item label="xyz" value="xyz" />
          </Picker>
        </View>
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={{fontSize:18, color:'black', borderBottomWidth:2, borderBottomColor:'grey'}}>City</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={city}
            style={{ height: 50, width: 300 }}
            prompt="City"
            onValueChange={(itemValue, itemIndex) =>
              setCity(itemValue)
            }
          >
            <Picker.Item label="Karachi" value="karachi" />
            <Picker.Item label="Lahore" value="lahore" />
          </Picker>
        </View>
      </View>
     
     
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Address"
          //keyboardType="email-address"
          underlineColorAndroid="transparent"
          //onChangeText={(email) => this.setState({email})}
        />
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://img.icons8.com/wired/64/000000/address.png",
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Contact Number"
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          //onChangeText={(email) => this.setState({email})}
        />
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://img.icons8.com/wired/64/000000/new-contact.png",
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          // onChangeText={(password) => this.setState({password})}
        />
        <Image
          style={styles.inputIcon}
          source={{ uri: "https://img.icons8.com/nolan/40/000000/key.png" }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Confirm Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          // onChangeText={(password) => this.setState({password})}
        />
        <Image
          style={styles.inputIcon}
          source={{ uri: "https://img.icons8.com/nolan/40/000000/key.png" }}
        />
      </View>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.signupButton]}
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      >
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
      <View style={{marginBottom:"10%"}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  container: {
    marginTop: '7%',
   flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
  },
  picker: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginTop:20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  dropdownConatiner: {
    width: 300,
    height: 45,

    marginBottom: 20,
    flexDirection: "row",
    //    alignItems: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10,
    width: 300,
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },

  signupButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: "white",
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    opacity: 0.3,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
