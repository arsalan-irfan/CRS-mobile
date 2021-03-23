import React, { useState, useEffect } from "react";

import { StyleSheet, View, FlatList, ScrollView, Picker, ActivityIndicator } from "react-native";
import MultiSelect from 'react-native-multiple-select';
import {
  Header,
  Icon,
  SearchBar,
  Button,
  Text,
  Card,
} from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

import { Formik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';
import { apiDomain } from '../config';
import { connect } from 'react-redux'


const ProposalSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),

  budget: Yup.string()
    .required("Required"),


});



const Proposal = ({ navigation, user }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const onSubmitHandler = async (values) => {
    try {
      setIsSubmitting(true);
      const { id, firstName, lastName } = user
      const { description, budget, title } = values
      let reqbody = {
        "clientId": id,
        "title": title,
        "jobCategoryId": 1,
        "typeofProjectId": 3,
        "budget": budget,
        "additionalFiles": [],
        "jobDetails": [],
  
        "jobProposals": [],
  
        "name": `${firstName} ${lastName}`,
        "description": description
      }
      selectedSkills.forEach(sid => {
        let temp = {}
        temp.skillId = sid
        reqbody.jobDetails.push(temp);
      })
      console.log("ReqBody:::", reqbody)
      // const res = await axios.post(`${apiDomain}/`)
      
      setIsSubmitting(false);
      
    } catch (error) {
      setIsSubmitting(false);

    }
  }



  useEffect(() => {
    fetchSkills();
  }, [])

  const fetchSkills = async () => {
    try {
      setIsLoading(false);
      const res = await axios(`${apiDomain}/Skills`);
      setSkills(res.data);
    } catch (error) {
      setIsLoading(false);
      setSkills([]);

    }
  }




  onSelectedItemsChange = selectedItems => {
    // try {

    // } catch (error) {

    // }
    console.log("Items", selectedItems);
    setSelectedSkills(selectedItems);
  };

  return (
    <ScrollView>
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
          <Text style={{ fontSize: 18, color: "#fff" }}> Proposal</Text>
        }
      //        rightComponent={{ icon: "home", color: "#fff" }}
      />

      {isLoading
        ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
            <ActivityIndicator size="large" color="#03254c" />
          </View>
        ) : (
          <View>

            <Card>
              <Card.Title style={{ alignSelf: "flex-start" }}>Job Details</Card.Title>
              <Card.Divider />
              <Text>want to develop 120 sq yards building</Text>
            </Card>
            <Formik
              enableReinitialize
              initialValues={{ title: "", description: "", budget: "" }}
              onSubmit={values => { onSubmitHandler(values) }}
              validationSchema={ProposalSchema}>
              {({ handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue }) => (
                <View>
                  <Card>

                    <Card.Title style={{ alignSelf: "flex-start" }}>
                      Addition Information
                    </Card.Title>
                    <Card.Divider />


                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>Title:</Text>
                    <TextInput
                      style={{ borderWidth: 1, borderColor: errors.title && touched.title ? "red" : "#C0C0C0", marginTop: 5, marginBottom: 10 }}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                    />
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>Description:</Text>
                    <TextInput
                      style={{ borderWidth: 1, borderColor: errors.description && touched.description ? "red" : "#C0C0C0", marginTop: 5, marginBottom: 10 }}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                    />
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>Budget:</Text>
                    <TextInput
                      keyboardType="numeric"
                      style={{ borderWidth: 1, borderColor: errors.budget && touched.budget ? "red" : "#C0C0C0", marginTop: 5, marginBottom: 10 }}
                      onChangeText={handleChange('budget')}
                      onBlur={handleBlur('budget')}
                    />
                    <Text style={{ fontSize: 12, marginBottom: 10 }}>
                      *Select atleast 1 skill .
                    </Text>
                    <MultiSelect
                      hideTags
                      items={skills}
                      uniqueKey="id"
                      onSelectedItemsChange={onSelectedItemsChange}
                      selectedItems={selectedSkills}
                      selectText="Select Skill"
                      searchInputPlaceholderText="Search Items..."
                      onChangeInput={(text) => console.log(text)}
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      displayKey="name"
                      searchInputStyle={{ color: '#CCC' }}
                      submitButtonColor="#48d22b"
                      submitButtonText="Confirm"
                    />
                  </Card>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <Button
                      title="Submit Proposal"
                      disabled={selectedSkills.length === 0}
                      onPress={() => { console.log("Errors", errors); handleSubmit() }}
                    />
                  </View>

                </View>
              )}
            </Formik>
          </View>

        )
      }

    </ScrollView>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user
})

export default connect(mapStateToProps)(Proposal)