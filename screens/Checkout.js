
import React from 'react'
import {Header, Icon} from 'react-native-elements'
import {Text, ScrollView, View, Button} from 'react-native'
import CheckoutItem from '../src/Cards/CheckoutItem'
export const Checkout = ({navigation}) => {
    return (
        <View>
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
          <Text style={{ fontSize: 18, color: "#fff" }}>Your Basket</Text>
        }
        // rightComponent={<Icon name="cart-plus" type="font-awesome" color='white' onPress={()=>{navigation.navigate('Checkout')}}/>}
        //        rightComponent={{ icon: "home", color: "#fff" }}
      />
            <ScrollView>
                <CheckoutItem />
                <CheckoutItem />
                <CheckoutItem />
                <View>
                    <View style={{ flex: 1, flexDirection: 'row', margin: 5, padding: 20, paddingTop: 5 }}>
                        <View style={{ flex: 1, }}>
                            <View style={{ marginBottom: 10 }}>
                             
                            </View>

                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Total</Text>
                        </View>

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }} >

                            <View style={{ paddingRight: 10 }}>
                               
                                <Text style={{ fontSize: 20, color: "#000" }}>Rs <Text style={{ fontWeight: "bold" }}>500</Text></Text>

                            </View>

                        </View>
                    </View>
                    <View style={{ paddingRight: 30, paddingLeft: 30 }}>
                        <Button
                            buttonStyle={{ borderRadius: 20, marginBottom: 30, backgroundColor: "#2A83F7" }}
                            title="Order Now"

                         //   onPress={()=>{props.navigation.navigate("CheckoutFinal")}}
                        />

                    </View>
                </View>

            </ScrollView>
        </View>
    )
}
