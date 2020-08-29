import React from 'react'
import { ImageBackground, Image, StyleSheet } from 'react-native'
import {
    Container, View, Content, Text, Icon, Button
} from 'native-base'

import ResetPassForm from '../../components/AuthComponents/ResetPassForm'
import styles from '../../styles/AuthStyles'

import DismissKeyboardComponent from '../../components/GeneralComponents/DismissKeyboardComponent'

class ResetPasswordScreen extends React.Component {
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
                            <Button
                                transparent
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Icon 
                                    name="ios-arrow-back" 
                                    style={{
                                        color: 'white',
                                        fontSize: 30,
                                    }}
                                />
                            </Button>
                            <View style={styles.rboxcont}>
                                <DismissKeyboardComponent>
                                    <>
                                        <Image source={require('../../images/logo.png')} style={{ width: 188, height: 144.15 }} />
                                        <ResetPassForm
                                            navigation={this.props.navigation}
                                        />
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


export default ResetPasswordScreen