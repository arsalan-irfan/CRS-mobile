import React from "react";
import { Header, Icon } from "react-native-elements";
import {
  Text,
  ScrollView,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import CheckoutItem from "../src/Cards/CheckoutItem";
import { connect } from "react-redux";
import {
  addProduct,
  removeProduct,
  incQuantity,
  decQuantity,
  emptyCart,
} from "../actions/cartActions";
import axios from "axios";
import { apiDomain } from "../config";
import Snackbar from "../Components/Snackbar";
import { showSnackbar } from "../actions/snackbarActions";

const Checkout = ({
  navigation,
  addProduct,
  removeProduct,
  incQuantity,
  decQuantity,
  emptyCart,
  user,
  totalPrice,
  cartItems,
  route,
  showSnackbar,
}) => {
  const { vendorId } = route.params;
  console.log(route);
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmitHandler = async () => {
    try {
      setIsLoading(true);
      let body = {
        InvoicedToId: vendorId,
        InvoiceById: user.id,
        InvoiceType: 1,
        Total: totalPrice,
        InvoiceStatus: false,
        Name: user.firstName,
        Description: "For Construction",
        Sales: cartItems,
      };
      const response = await axios.post(`${apiDomain}/Invoice`, body);
      console.log("Success:::", response);
      emptyCart();
      setIsLoading(false);
      showSnackbar("Order Submitted Successfully");
    } catch (error) {
      console.log("Error:::", error);
      setIsLoading(false);
      showSnackbar("Error while Submitting order");
    }
  };

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
          <Text style={{ fontSize: 18, color: "#fff" }}>Your Basket</Text>
        }
        // rightComponent={<Icon name="cart-plus" type="font-awesome" color='white' onPress={()=>{navigation.navigate('Checkout')}}/>}
        //        rightComponent={{ icon: "home", color: "#fff" }}
      />
      {cartItems.length > 0 ? (
        <ScrollView>
          {cartItems.map((item, key) => (
            <CheckoutItem
              data={item}
              key={key}
              addProduct={addProduct}
              removeProduct={removeProduct}
              incQuantity={incQuantity}
              decQuantity={decQuantity}
              user={user}
              emptyCart={emptyCart}
            />
          ))}

          <View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                margin: 5,
                padding: 20,
                paddingTop: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 10 }}></View>

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Total</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <View style={{ paddingRight: 10 }}>
                  <Text style={{ fontSize: 20, color: "#000" }}>
                    Rs <Text style={{ fontWeight: "bold" }}>{totalPrice}</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ paddingRight: 30, paddingLeft: 30 }}>
              {isLoading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <ActivityIndicator size="large" color="#03254c" />
                </View>
              ) : (
                <>
                  <View>
                    <Button
                      buttonStyle={{
                        borderRadius: 20,
                        marginBottom: 30,
                        backgroundColor: "#2A83F7",
                      }}
                      title="Order Now"
                      onPress={() => {
                        onSubmitHandler();
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Button
                      style={{
                        borderRadius: 20,
                        marginBottom: 30,
                        backgroundColor: "#2A83F7",
                        marginTop: 10,
                      }}
                      color={"red"}
                      title="Empty Cart"
                      onPress={() => {
                        emptyCart();
                      }}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Your Order has been placed successfully</Text>
          <Text>You can track your order from here..</Text>
          <Button
            title="Track Order "
            type="outline"
            style={{ marginTop: "20%" }}
            onPress={() => navigation.navigate("OrderTracking")}
          />
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cartReducer.products,
  user: state.authReducer.user,
  totalPrice: state.cartReducer.totalPrice,
});

export default connect(mapStateToProps, {
  showSnackbar,
  addProduct,
  removeProduct,
  incQuantity,
  decQuantity,
  emptyCart,
})(Checkout);
