import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { connect } from 'react-redux'

import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../actions/authActions'


const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});



const Login = ({ navigation, loginUser,isLoading }) => {

  const onSubmitHandler = ({ email, password }) => {
    let reqbody = {};
    reqbody.Login = email
    reqbody.Password = password;
    loginUser(reqbody);
  }

  return (
    <View style={styles.container}>
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
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
          onSubmitHandler(values)
          // props.navigation.navigate("Seller")
        }}
        validationSchema={SigninSchema}>
        {
          ({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
            <>
              <View style={[styles.inputContainer, errors.email && { borderColor: "red", borderWidth: 2 }]}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                //onChangeText={(email) => this.setState({email})}
                />
                <Image
                  style={styles.inputIcon}
                  source={{ uri: "https://img.icons8.com/nolan/40/000000/email.png" }}
                />
              </View>

              <View style={[styles.inputContainer, errors.password && { borderColor: "red", borderWidth: 2 }]}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                // onChangeText={(password) => this.setState({password})}
                />
                <Image
                  style={styles.inputIcon}
                  source={{ uri: "https://img.icons8.com/nolan/40/000000/key.png" }}
                />
              </View>
              {
                isLoading
                  ? (<ActivityIndicator size="large" color="#03254c" />)
                  : <>
                    <TouchableOpacity
                      style={styles.btnForgotPassword}
                      onPress={() => { navigation.navigate('ForgetPassword') }}
                    >
                      <Text style={styles.btnText}>Forgot your password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.buttonContainer, styles.loginButton]}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.buttonContainer, styles.signupButton]}
                      onPress={() => { navigation.navigate('Register') }}
                    >
                      <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>

                  </>
              }

            </>
          )
        }


      </Formik>


    </View>
  );
};
const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading
})

export default connect(mapStateToProps, { loginUser })(Login)


const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
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
    backgroundColor: "#333333",

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
    opacity: 0.5,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
