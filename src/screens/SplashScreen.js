import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import {
    View, Text, Image, StyleSheet, ImageBackground
} from 'react-native'
import { loginUserWithId } from '../actions/auth'
import { connect } from 'react-redux'


class SplashScreen extends React.Component {
    constructor(props) {
        super(props)

        this._bootstrapAsync()
    }
    _bootstrapAsync = async () => {
        const onboarding = await AsyncStorage.getItem('onboarding')
        const userID = await AsyncStorage.getItem('userID');
        console.log('userid',userID)
        setTimeout(() => {
            if(!onboarding) {
                this.props.navigation.navigate('Onboarding')
            } else {
            if (userID) {
                this.props.loginUser(JSON.parse(userID))
                this.props.navigation.navigate('Home');
            } else {
                this.props.navigation.navigate('Auth')
            }
            }
        }, 3000)

    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../images/background.png')} style={{ width: '100%', height: '100%' }}>
                    <Image source={require('../images/logo.png')} style={{ marginTop: 66, marginBottom: 56, alignSelf: "center", width: 168, height: 128 }} />
                    <Image source={require('../images/Gif.gif')} style={{ marginTop: -180, resizeMode: 'contain', alignSelf: "center", width: "90%", height: "90%" }} />
                    <Image source={require('../images/logo_bottom.png')} style={{ marginTop: -100, resizeMode: 'cover', alignSelf: "center", width: 212, height: 91 }} />
                </ImageBackground>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    loginUser: (userId) => dispatch(loginUserWithId(userId))
})

export default connect(null, mapDispatchToProps)(SplashScreen)



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#042653'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'contain', // or 'stretch',
        justifyContent: 'center',
        width: '100%',
        padding: 200,
        alignSelf: 'center'
    },
});


