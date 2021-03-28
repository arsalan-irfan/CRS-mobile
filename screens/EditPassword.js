import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Header, Icon, Input, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../actions/authActions'
import { showSnackbar } from '../actions/snackbarActions';
import Snackbar from '../Components/Snackbar'


const PasswordSchema = Yup.object().shape({

  oldPassword: Yup.string()
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must be the same!')
    .required('Required'),
});
const EditPassword = ({ navigation, user, updateUser, updatingUser, showSnackbar }) => {
  const onSubmitHandler = (values,resetForm) => {

    let body = {
      id: 1,
      firstName: "",
      lastName: "",
      middleName: "",
      username: "",
      emailAddress: "",
      avatar: "string",
      password: "",
      typeOfUser: 1,
      description: "User",
      name: "",
    }
    const { firstName, lastName, description,name,avatar } = user
    const { password, oldPassword } = values
    if (user.password == oldPassword) {
      body.id = user.id;
      body.firstName = firstName;
      body.lastName = lastName;
      body.emailAddress = user.emailAddress;
      body.password = password;
      body.description = description;
      body.name = name;
      body.avatar=avatar

      updateUser(body)
      resetForm({values:initialValues})
      
    } else {
      showSnackbar("old password is invalid !")
    }


  }
  const initialValues={ oldPassword: "", password: "", confirmPassword: "" };
  return (
    <View style={{ flex: 1 }}>
      <Snackbar />
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
      <View style={{ width: "80%", marginTop: 50, alignSelf: 'center', borderWidth: 1, borderColor: 'grey', padding: 10 }}>
        {
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values,{resetForm}) => { onSubmitHandler(values,resetForm) }}
            validationSchema={PasswordSchema}>
            {({ handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue, values }) => (
              <>

                <Input
                  placeholder="Password"
                  label="Old Password" secureTextEntry={true}
                  onChangeText={handleChange('oldPassword')}
                  onBlur={handleBlur('oldPassword')}
                  style={{ borderBottomWidth: 1, borderColor: errors.oldPassword ? "red" : "black" }}
                />
                <Input
                  placeholder="Password"
                  label="New Password" secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  style={{ borderBottomWidth: 1, borderColor: errors.password ? "red" : "black" }}

                />

                <Input placeholder="Password"
                  label="Confirm Password"
                  secureTextEntry={true}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  style={{ borderBottomWidth: 1, borderColor: errors.confirmPassword ? "red" : "black" }}

                />
                {
                  updatingUser
                    ? (
                      <ActivityIndicator size="large" color="#03254c" />
                    ) : (
                      <Button
                        title="Save"
                        buttonStyle={{ marginBottom: 50 }}
                        onPress={handleSubmit}
                      />
                    )
                }

              </>
            )}
          </Formik>
        }





      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  user: state.authReducer.user,
  updatingUser: state.authReducer.updatingUser
})
export default connect(mapStateToProps, { updateUser, showSnackbar })(EditPassword)