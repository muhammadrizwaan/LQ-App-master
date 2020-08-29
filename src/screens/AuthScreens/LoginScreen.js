import React from 'react'
import { ImageBackground, Image, StyleSheet } from 'react-native'
import {
    Container, View, Content, Text
} from 'native-base'

import LoginForm from '../../components/AuthComponents/LoginForm'
import styles from '../../styles/AuthStyles'

import DismissKeyboardComponent from '../../components/GeneralComponents/DismissKeyboardComponent'

class Login extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Container>
                <DismissKeyboardComponent>
                    <View style={styles.rcontainer}>
                        <ImageBackground source={require('../../images/background.png')} style={styles.rbackgroundImage}>
                        <Content >
                            <View style={styles.rboxcont}>
                                <DismissKeyboardComponent>
                                    <>
                                        <Image source={require('../../images/logo.png')} style={{ width: 188, height: 144.15 }} />
                                        <LoginForm
                                            navigation={this.props.navigation}
                                        />

                                       
                                        <Text style={{ alignSelf: 'center', marginTop: 50, marginLeft: 10, fontSize: 15, color: '#DAAC50',marginRight:10 }}>
                                            Don't have an account?{" "}
                                            <Text
                                                style={{ fontWeight: 'bold', color: '#DAAC50'}}
                                                onPress={() => this.props.navigation.navigate('SignUpScreen')}
                                            > 
                                                 SIGN UP
                                            </Text>
                                        </Text>

                                    </>
                                </DismissKeyboardComponent>
                            </View>
                        </Content>
                        </ImageBackground>
                    </View >
                </DismissKeyboardComponent>
            </Container>
        )
    }
}


export default Login