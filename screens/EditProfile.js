import React from "react";
import { View, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { Header, Icon, Input, Text, Button } from "react-native-elements";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";
import Snackbar from '../Components/Snackbar'
import { updateUser } from '../actions/authActions'
import { Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { showSnackbar } from '../actions/snackbarActions'

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  address: Yup.string()
    .required("Required"),

  phoneNumber: Yup.string()
    .required('Required')
    .min(11, "Invalid Number")
    .max(11, "Invalid Number"),

});


const EditProfile = ({ navigation, user, updateUser, updatingUser, showSnackbar }) => {
  const [value, onChangeText] = React.useState("Useless Placeholder");
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [profilePicture, setProfilePicture] = React.useState({ uri: "https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png" })
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        base64: true
      });
      if (!result.cancelled) {
        const imageNames = result.uri.split('/');
        const fileName = imageNames[imageNames.length - 1];
        result.fileName = fileName
        setProfilePicture(result)
      }
      console.log(result.uri)

    } catch (error) {
      console.log("Error While Picking Image", error)
    }
  };

  React.useEffect(() => {
    if (user && user.id) {
      setProfilePicture({
        uri: user.avatar
      })
    }

  }, [user])

  const onSubmitHandler = (values) => {

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
    const { firstName, lastName, address, phoneNumber } = values
    body.id = user.id;
    body.firstName = firstName;
    body.lastName = lastName;
    body.emailAddress = user.emailAddress;
    body.password = user.password;
    body.description = address;
    body.name = phoneNumber;
    body.avatar = user.avatar;
    if (profilePicture.base64) {
      setUploadingImage(true);
      let base64Img = `data:image/jpg;base64,${profilePicture.base64}`;
      let apiUrl = 'https://api.cloudinary.com/v1_1/dfczdwsx4/image/upload';

      let data = {
        "file": base64Img,
        "upload_preset": "ml_default",
      }

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(async r => {
        let data = await r.json()
        console.log("Image Path", data.secure_url);
        body.Avatar = data.secure_url;
        setUploadingImage(false)

        updateUser(body, navigation)

        // return data.secure_url
      }).catch(
        err => {
          setUploadingImage(true)
          showSnackbar("Error While Uploading Image")
          console.log(err)
        })
    }
    else {
      updateUser(body)
    }

  }




  return (
    <>
      {user && user.id
        ? (<ScrollView style={{ flex: 1 }}>
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
              <Text style={{ fontSize: 18, color: "#fff" }}>Edit Profile</Text>
            }

          //        rightComponent={{ icon: "home", color: "#fff" }}
          />

          <View
            style={{
              width: "80%",
              marginTop: 50,
              alignSelf: "center",
              borderWidth: 1,
              borderBottomWidth: 1, borderColor: "grey",
              padding: 20,
            }}
          >
            <Formik
              enableReinitialize
              initialValues={{ firstName: user.firstName, lastName: user.lastName, address: user.description, phoneNumber: user.name, }}
              onSubmit={values => { onSubmitHandler(values) }}
              validationSchema={ProfileSchema}>
              {({ handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue, values }) => (
                <>

                  <Input
                    label="First Name"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    style={{ borderBottomWidth: 1, borderColor: errors.firstName ? "red" : "black" }}
                  />

                  <Input label="Last Name"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    style={{ borderBottomWidth: 1, borderColor: errors.lastName ? "red" : "black" }}
                  />
                  <Input
                    label="Contact Number"
                    keyboardType="numeric"
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    style={{ borderBottomWidth: 1, borderColor: errors.phoneNumber ? "red" : "black" }}
                  />
                  <View style={{ marginLeft: 5 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        marginBottom: 10,
                        color: "grey",
                      }}
                    >
                      Address
                </Text>
                    <TextInput
                      style={{
                        height: 40,
                        borderBottomWidth: 1, borderColor: "grey",
                        borderBottomWidth: 0.5,
                        color: "grey",
                        borderBottomWidth: 1, borderColor: errors.address ? "red" : "black"
                      }}
                      onChangeText={(text) => onChangeText(text)}
                      value={values.address}
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}

                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      marginBottom: 10,
                      color: "grey",
                      marginTop: 20,
                    }}
                  >
                    Avatar
              </Text>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Avatar
                      size="xlarge"
                      rounded
                      source={{
                        uri:
                          profilePicture.uri,
                      }}
                    >
                      <Avatar.Accessory onPress={() => { pickImage() }}
                        iconStyle={{ fontSize: 20 }} style={{ height: 40, width: 40, backgroundColor: '#2A83F7', borderRadius: 50 }} >

                      </Avatar.Accessory>

                    </Avatar>

                  </View>
                  {
                    updatingUser || uploadingImage
                      ? (
                        <ActivityIndicator size="large" color="#03254c" />
                      )
                      : (
                        <>

                          <Button
                            title="Save"
                            buttonStyle={{ marginTop: 20 }}
                            onPress={handleSubmit}
                          />
                        </>
                      )

                  }

                </>
              )}
            </Formik>



          </View>
        </ScrollView>
        )
        : (
          <View></View>
        )
      }
    </>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
  updatingUser: state.authReducer.updatingUser
})
export default connect(mapStateToProps, { updateUser, showSnackbar })(EditProfile)

