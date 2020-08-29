import React from 'react'

import { ImageBackground, Image, StyleSheet, SafeAreaView } from 'react-native'

import {
    Container, View, Content, Text, Icon, Button, Body,
    Item, Right, Left, 
} from 'native-base'

import SignUpForm from '../../components/AuthComponents/SignUpForm'
import DismissKeyboardComponent from '../../components/GeneralComponents/DismissKeyboardComponent'

import styles from '../../styles/AuthStyles'



class SignUp extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Container>
            <DismissKeyboardComponent>
                <View style={styles.rcontainer}>
                    <ImageBackground source={require('../../images/background.png')} style={styles.rbackgroundImage}>
                    <SafeAreaView>
							<Item
                                style={{
                                    borderColor: 'transparent'
                                }}
                            >
                                <Left style={{flex: 1}}>
                                <Button
								transparent
								onPress={() => this.props.navigation.goBack()}
							>
								<Icon
									name="ios-arrow-back"
									style={{
										fontSize: 30,
										color: 'white',
										// marginTop: 20,
										marginLeft: 20
									}}
								/>
							</Button>
                                </Left>
                                <Body style={{flex: 1}}>
                                    <Text style={{color: 'white'}}>SIGN UP</Text>
                                </Body>
                                <Right style={{flex: 1}} />
                            </Item>
						</SafeAreaView>
                    <Content >
                        <View style={styles.rboxcont}>
                            <DismissKeyboardComponent>
                                <>
                                    <SignUpForm
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

export default SignUp