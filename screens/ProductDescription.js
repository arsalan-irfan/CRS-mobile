import React from "react";
import { Button, Image } from "react-native";
import { View } from "react-native";
import { Text } from "react-native-elements";

import { connect } from 'react-redux'
import { addProduct, removeProduct } from '../actions/cartActions'



function ProductDescription({ route, addProduct, removeProduct, cartItems }) {

  const [isAddedToCart, setIsAddedToCart] = React.useState(false);
  
  const { data } = route.params;

  console.log("Desc", data)

  const addToCart = (prod) => {
    let obj = {
      productId: prod.id,
      quantity: 1,
      subtotal: prod.price
    }
    addProduct(obj);
  }
  const removeFromCart = (prod) => {
    let obj = {
      productId: prod.id,
      quantity: 1,
      subtotal: prod.price
    }
    removeProduct(obj);
  }

  React.useEffect(() => {
    setIsAddedToCart(isAdded(data))
  }, [])

  const isAdded = () => {
    console.log(data.id)
    let index = cartItems.findIndex(obj => obj.productId == prod.id)
    console.log(index)
    if (index == -1)
      return false
    else
      return true
  }


  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: data.imagePath,
        }}
        style={{
          backgroundColor: "#dbd0d0",
          marginTop: "5%",
          width: "100%",
          height: "50%",
          marginBottom: '5%'
        }}
      />

      <View
        style={{
          flex:1,
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 0,
          marginBottom: 10,
          paddingBottom: 10
        }}
      >

        <Text h3>{data.name}</Text>

        <Text h4 style={{ color: "grey", marginBottom: 10 }}>
          {data.company}
        </Text>

        <Text h4>{data.price} Rs</Text>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          flexDirection: "row",
          paddingTop: 20,
          paddingBottom: 50
        }}
      >
        {/* <Text style={{ marginRight: 150, marginLeft: 30 }} h4>
          Qty
        </Text>
        <Counter
          start={1}
          onChange={onChange(1, 2)}
          buttonTextStyle={{ color: "black", height: 30 }}
          countTextStyle={{ color: "black", height: 30 }}
          buttonStyle={{ backgroundColor: "white", height: 30 }}
        /> */}
        {/* <Button buttonStyle={{ alignSelf:'flex-start'  }} title="Add to Cart" /> */}
      </View>
      {/* <View>
        {
          isAddedToCart ? (
            <Button
              title="- Remove from Cart"
              onPress={() => {
                removeFromCart(data);
                setIsAddedToCart(false);
              }} />
          ) :
            (
              <Button
                title="+ Add to Cart"
                onPress={() => {
                  addToCart(data);
                  setIsAddedToCart(true);
                }}
              />)
        }

      </View> */}
    </View>
  );
}
const mapStateToProps = state => ({
  cartItems: state.cartReducer.products,
  user: state.authReducer.user
})
export default connect(mapStateToProps, { addProduct, removeProduct })(ProductDescription)