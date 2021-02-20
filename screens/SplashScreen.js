import React from 'react'
import { View, Image, ActivityIndicator,AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

function HomeScreen({ navigation, utilsLoaded }) {
    const checkUser=async()=>{
        const token = await AsyncStorage.getItem("token")
        if(token){
            navigation.navigate("Home");
        }else{
            navigation.navigate("Login");
        }
    }
    React.useEffect(() => {
        if (utilsLoaded) {
            checkUser()      
        }
        console.log(utilsLoaded);
    }, [utilsLoaded]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image
                style={{ width: 100, height: 100, marginBottom: 20 }}
                source={{
                    uri:
                        "https://cdn.iconscout.com/icon/free/png-512/c-programming-569564.png",
                }}
            />
            <ActivityIndicator size="large" color="#03254c" />
        </View>
    );
}

const mapStateToProps = state => ({
    utilsLoaded: state.generalReducer.utilsLoaded
})

export default connect(mapStateToProps)(HomeScreen)